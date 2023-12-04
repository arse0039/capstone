// CardBody.tsx
import React, { CSSProperties } from 'react';
import Card from 'react-bootstrap/Card';
import { PieChart } from './PieChart';
import { TextBox } from './TextBox';
import ButtonForm from './Form';
import { capitalizeFirstLetter } from '../utils/UtilityFuncts';

interface CardBodyProps {
  headerStyle?: CSSProperties;
  textStyle?: CSSProperties;
  sendAudioLink: () => void;
  processLink: (event: React.ChangeEvent<HTMLInputElement>) => void;
  predictResponse: any; 
  error: string | null;
}

const CardBody: React.FC<CardBodyProps> = ({ headerStyle, textStyle, sendAudioLink, processLink, predictResponse, error }) => {
  const defaultTextStyle: CSSProperties = {
    color: 'black',
    fontSize: '1rem',
  };

  const defaultHeaderStyle: CSSProperties = {
    color: 'black',
    fontWeight: 'bold',
  };

  return (
    <Card style={{ marginBottom: '40px'}}>
        <Card.Header style={{ ...defaultHeaderStyle, ...headerStyle }}>
        Welcome to Top-N Music Genre Prediction
        </Card.Header>
        
        <Card.Body>
        <Card.Text style={{ ...defaultTextStyle, ...textStyle }}>
          Please enter a valid YouTube URL of the song you wish to get the AI-powered genre prediction of.
        </Card.Text>

        <ButtonForm onClick={sendAudioLink} onInputChange={processLink} />
        <div></div>

        {error && (
          <div>
              <TextBox style={{ ...defaultTextStyle, ...textStyle, color: 'red' }}>{error}</TextBox>
          </div>
          )}

        {predictResponse.video_title && (
        <div>
            <TextBox>
                Genre Predictions for <br/>"{predictResponse.video_title}"
            </TextBox>
        </div>
        )}

        {predictResponse.results && (
          <div style={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
            <PieChart data={predictResponse.results} />
          </div>
        )}

        {predictResponse.top_prediction && (
          <div style={{ textAlign: 'left' }}>
            <Card.Text style={{ ...defaultTextStyle, ...textStyle }}>
            <span style={{ marginRight: '8px' }}>Top Prediction:</span>
            <span style={{ fontWeight: 'bold' }}>
                {capitalizeFirstLetter(predictResponse.top_prediction)}
           </span>
</Card.Text>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardBody;
