import matplotlib.pyplot as plt
import librosa

def plot_melspectrogram(mel_db_spect, audio_name):
    """ Function to a visual plot of a melspectrogram using pyplot."""
    figure, axes_array = plt.subplots()
    img = librosa.display.specshow(
        mel_db_spect,
        x_axis='time',
        y_axis='mel',
        ax=axes_array,
        fmax=8000 )
    axes_array.set(title=audio_name)
    figure.colorbar(img, ax=axes_array, format="%+2.f dB")

    return figure
