# Audio Prediction Frontend

This directory contains a basic web application developed using React and TypeScript. The application allows users to input a YouTube link and sends a POST request to the /predict endpoint of the backend server. It waits for the server's response and displays the prediction data in the form of a pie chart.

## Overview

The frontend application performs the following tasks:

1. User Input:

   - Accepts a YouTube URL input from the user.

2. Server Request:

   - Sends a POST request to the backend /predict endpoint with the provided YouTube link.

3. Response Handling:
   - Waits for the server to process the link and retrieve prediction data and displays a circular loading visual to alert the user that the prediction is taking place.
4. Data Visualization:
   - Displays the prediction data using a pie chart.

## Setup

To set up and run the frontend application, first cd into the frontend directory and follow these steps:

1. Dependencies:
   - Ensure you have Node.js and npm (Node Package Manager) installed.
2. Installation:

   - Install necessary dependencies using:

     `npm install`

3. Starting the Application:
   - Start the application locally by executing the following command in the terminal:
     `npm start`

## Directory Structure

- src/: Contains the main source code for the React application.
- public/: Holds the HTML file and other static assets.
- package.json: Configuration file containing project dependencies and scripts.
- tsconfig.json: TypeScript configuration settings.

## Usage

1. Input YouTube URL:
   - Enter the YouTube URL in the provided input field.
2. Sending Requests:
   - Click on the button to send a POST request to the backend /predict endpoint.
3. Data Visualization:
   - Visualize the received prediction data.

## Contributors

- Tina Rosace
- David Claphan
- Brandon Arsenault
