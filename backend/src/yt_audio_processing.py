import yt_dlp
import librosa
from moviepy.editor import VideoFileClip
import tempfile
import os
import numpy as np


class InvalidDurationError(Exception):
    pass


class InvalidUrlError(Exception):
    pass


def download_video(url: str, temp_dir_name) -> dict:
    """Receives a youTube url as a parameter, saves the video as 'audiofile.mp4'
    and return a dictionary that stores data related to the downloaded file.
    """

    # result stores a dict with information related to the file.
    ydl_opts = {
        "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "merge_output_format": "mp4",
        "outtmpl": f"{temp_dir_name}/%(id)s.%(ext)s",
        "noplaylist": True,
    }
    ydl = yt_dlp.YoutubeDL(ydl_opts)

    # check duration
    meta = ydl.extract_info(url, download=False)
    duration = meta.get("duration", 0)
    extractor = meta.get("extractor")

    if duration > 600:  # 600 secs = 10 min
        raise InvalidDurationError(
            f"Video duration is too long. Please choose a video shorter than 10 minutes."
        )

    if extractor != "youtube":
        raise InvalidUrlError(
            f"Website is not supported. Please choose a video from YouTube."
        )

    # Download the video if it passes the duration check
    meta = ydl.extract_info(url, download=True)
    video_file_path = os.path.join(temp_dir_name, f"{meta['id']}.mp4")

    return meta, video_file_path


def convert_video_to_wav(video_file_path, temp_dir_name: str) -> None:
    """Receives a filename of a video file, isolates the audio portion, and saves said audio
    as a .wav file."""
    video = VideoFileClip(video_file_path)
    audio = video.audio
    wav_path = os.path.join(temp_dir_name, "output.wav")
    audio.write_audiofile(wav_path)
    return wav_path


def slice_audio(input_audio_file: str) -> list:
    """Receives a .wav audio file name and a duration length. Slices the received audio
    file in a number of  .wav files equal to the section_duration * the sample rate and
    stores them in an array."""
    window = 0.06
    overlap = 0.3

    audio, sr = librosa.load(input_audio_file)  # Load the .wav audio
    audio_shape = audio.shape[0]
    chunk = int(audio_shape * window)
    offset = int(chunk * (1 - overlap))
    individual_split_song = []

    for i in range(0, audio_shape - chunk + offset, offset):
        individual_split_song.append(audio[i : i + chunk])

    return individual_split_song, chunk, sr


def create_spectrograms(individual_split_song, chunk, sr, max_length=78):
    split_spects_mel_db = []
    for sample in individual_split_song:
        if sample.shape[0] != chunk:
            continue
        mel_spec = librosa.feature.melspectrogram(
            y=sample, sr=sr, n_fft=2048, hop_length=512, n_mels=128
        )
        mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

        # Pad outputs to ensure uniformity
        if mel_spec_db.shape[1] < max_length:
            padding = max_length - mel_spec_db.shape[1]
            mel_spec_db = np.pad(
                mel_spec_db, pad_width=((0, 0), (0, padding)), mode="constant"
            )
        else:
            mel_spec_db = mel_spec_db[:, :max_length]

        # split_spects_mel_only.append(mel_spec)
        split_spects_mel_db.append(mel_spec_db)

    return split_spects_mel_db


def process_youtube_link(url: str) -> list:
    """Runs necessary functions to fully process a received youTube URL."""

    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as temp_dir_name:
        meta, video_file_path = download_video(url, temp_dir_name)
        wav_path = convert_video_to_wav(video_file_path, temp_dir_name)
        individual_split_song, chunk, sr = slice_audio(wav_path)
        split_specs_mel_db = create_spectrograms(individual_split_song, chunk, sr)
        video_title = meta.get("title")
    return {"split_specs": np.array(split_specs_mel_db), "video_title": video_title}
