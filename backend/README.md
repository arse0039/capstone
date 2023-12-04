# Audio Processing Backend

This directory contains the backend code for processing audio files, creating spectrograms, training a Convolutional Neural Network (CNN) model, and setting up a Flask server for prediction.

## Overview

The backend performs the following tasks:

1. Audio File Processing:

   - Slices 30-second audio files into 1.4-second clips.
   - Converts the clips into mel-spectrograms.

2. Dataset Creation:
   - Generates a dataset using NumPy arrays of the spectrograms.
3. Model Training:
   - Utilizes the dataset to train a CNN model.
4. Flask Server Setup:
   - Receives a POST request from a web application with a YouTube URL.
   - Validates the URL to ensure it's a YouTube link and is no longer than 10 minutes.
   - Downloads the video, isolates the audio, and slices it into 1.4-second clips.
   - Converts each clip into a spectrogram and feeds it into the trained model for prediction.
5. Results Aggregation:
   - Aggregates the predictions and sends the results back to the front end as a JSON object.

## Setup

To set up and run the backend, navigate to the `backend` directory and follow these steps:

1. Dependencies:

   - Ensure you have Python installed.
   - Install the required Python packages listed in requirements.txt using:

     `pip install -r requirements.txt`

2. Data Preparation and Model Training:

   - Download the GZTAN dataset at `https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification` into backend/Data.
   - Prepare the audio dataset by running the `cnn_train_model.ipynb` file.
   - The trained model will be saved in `backend/genre_categorization`.

3. Server Launch:

   - Start the Flask server by navigating to backend/src and running the following command in the terminal:

     `python server.py`

## Directory Structure

- Data/: Contains audio files once downloaded from the kaggle link above.
- model/: Stores the notebook for processing the data and training the CNN models.
- src/: Helper functions for audio processing, validation, and prediction.
- server.py: Flask application for handling incoming requests.
- testing_notebooks/: Stores testing notebooks used throughout the learning process for this project.

## Usage

- Server Requests:
  - Send a POST request from the frontend containing a YouTube URL to /predict.
  - Handle the received JSON response for predictions in the frontend application.

## Contributors

- Tina Rosace
- David Claphan
- Brandon Arsenault
