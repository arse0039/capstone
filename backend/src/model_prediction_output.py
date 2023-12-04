import numpy as np

def model_prediction(prediction: list) -> dict:
    """Function takes a numpy array of data from the model prediction and returns the
    prediction results for each genre and the highest valued genre in a dictionary/JSON format.
    """

    class_names = ['blues', 'classical', 'country', 'disco', 'hiphop', 'jazz', 'metal', 'pop', 'reggae', 'rock']

    summed_probabilities = np.sum(prediction, axis=0)

    top_n = 10

    # Get the top prediction and top_n most likely options
    top_prediction = class_names[np.argmax(summed_probabilities)]
    top_n_indices = np.argsort(-summed_probabilities)[:top_n]
    top_n_classes = [class_names[idx] for idx in top_n_indices]
    top_n_probabilities = [summed_probabilities[idx] * 100 for idx in top_n_indices]

    # Print and store the top prediction and top_n most likely options
    prediction_results = {}
    for i, (predicted_class, probability) in enumerate(zip(top_n_classes, top_n_probabilities), start=1):
        prediction_results[predicted_class] = probability / 24

    # format for front end use with graphs/charts/etc.
    output = {}
    output['top_prediction'] = top_prediction
    output['results'] = prediction_results

    return output