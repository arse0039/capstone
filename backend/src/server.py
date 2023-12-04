import tensorflow as tf
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from yt_audio_processing import (
    process_youtube_link,
    InvalidDurationError,
    InvalidUrlError,
)
from model_prediction_output import model_prediction

app = Flask(__name__)
CORS(app)

model_path = os.path.abspath("backend/genre_categorization")
loaded_model = tf.keras.models.load_model(model_path)


@app.route("/predict", methods={"POST"})
def get_predictions():
    """Predicts genre for the provided YouTube clip.

    Request Body: JSON, key == "url"
    Response Body: JSON, keys == "top_prediction", "results"
    """
    if request.method == "POST":
        data = request.json
        url = data["url"]

        try:
            result = process_youtube_link(url)
        except InvalidDurationError as e:
            return jsonify({"error": str(e)}), 400
        except InvalidUrlError as e:
            return jsonify({"error": str(e)}), 400

        split_mel_spects, video_title = result["split_specs"], result["video_title"]
        prediction = loaded_model.predict(split_mel_spects)
        output = model_prediction(prediction)

        response_data = {
            "video_title": video_title,
            "top_prediction": output["top_prediction"],
            "results": output["results"],
        }

        return jsonify(response_data), 200


if __name__ == "__main__":
    app.run()
