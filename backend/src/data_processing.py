import librosa
import os
import numpy as np
from tqdm import tqdm

## THIS FILE TO BE REMOVED ONCE cnn_train_model.ipynb IS REVIEWED !

def get_audio_data(path_name):
    """Function to create paths/genre arrays to allow for
    future conversion of audio files to mel_spectrograms."""
    paths, genres = [], []
    for root, _, files in os.walk(path_name):
        for name in files:
            filename = os.path.join(root, name)
            genre = os.path.split(root)[-1]
            paths.append(filename)
            genres.append(genre)
    return paths, genres

def create_melspectrogram(audio_file, sample_rate):
    """ Function to create a mel_spectrogram from a received audio_file"""
    mel_spectrogram = librosa.feature.melspectrogram(
          y=audio_file,
          sr=sample_rate,
          n_fft=2048,
          hop_length=512,
          n_mels=128)
    # db = decibel units
    mel_spectrogram_db = librosa.power_to_db(mel_spectrogram, ref=np.max)
    return mel_spectrogram_db

def pad_audio(mel_db_spect, max_length):
    """ Pads mel_spectrogram files to ensure that they are homogeneous
    in shape. """
    if mel_db_spect.shape[1] < max_length:
        padding = max_length - mel_db_spect.shape[1]
        mel_db_spect = np.pad(mel_db_spect, pad_width=((0,0), (0, padding)), mode='constant')
    else:
        mel_db_spect = mel_db_spect[:, :max_length]
    return mel_db_spect

def split_songs(audio_paths, genres, max_length=78):
    """ Function that splits received songs into smaller audio clips and
    converts them into mel-spectrograms to be used for training/prediction."""
    split_spects_mel_db = []
    split_genres = []
    window = 0.06
    overlap = 0.3

    for path, genre in tqdm(zip(audio_paths, genres), total=len(audio_paths),desc='Processing'):
        audio, sample_rate = librosa.load(path)
        audio_shape = audio.shape[0]
        chunk = int(audio_shape * window)
        offset = int(chunk*(1 - overlap))
        individual_split_song = []

        # create array of smaller audio clips
        for i in range(0, audio_shape - chunk + offset, offset):
            individual_split_song.append(audio[i:i+chunk])

        # convert small clips into mel_spectrograms
        for sample in individual_split_song:
            if sample.shape[0] != chunk:
                continue
            mel_spec_db = create_melspectrogram(audio, sample_rate)
            # Pad outputs to ensure uniformity
            mel_spec_db = pad_audio(mel_spec_db, max_length)

            split_spects_mel_db.append(mel_spec_db)
            split_genres.append(genre)

    return split_spects_mel_db, split_genres

def process_data(path):
    paths_arr, genres_arr = get_audio_data(path)
    mel_spects, genres = split_songs(paths_arr, genres_arr)
    return mel_spects, genres

