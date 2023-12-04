import styled from 'styled-components'
import React, {useState} from 'react'
import { FlexColumn } from './FlexColumn'
import CardBody from './Card'

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const ModalContent = styled.div`
  background-color: rgba(235, 235, 235, 0.9);
  width: 500px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  padding: 20px;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
`

const LoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const LoadingSpinner = styled.div`
  border: 5px solid transparent;
  border-top: 5px solid #3498db; 
  border-radius: 50%;
  width: 40px; 
  height: 40px; 
  animation: spin 1s linear infinite, changeColor 3s linear infinite; 
  
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
  
  @keyframes changeColor {
    0% { border-top-color: #3498db; } /* Initial color */
    50% { border-top-color: #e74c3c; } /* Color change */
    100% { border-top-color: #3498db; } /* Back to initial color */
  }
`

export const InputBar = () => {
    const [receivedLink, setLink] = useState<string>('');
    const [predictResponse, setPredictResponse] = useState<any>({});
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [error, setError] = useState<string | null>(null); 



    const sendAudioLink = async () => {
        setShowModal(true);
        setPredictResponse({});
        setError(null);

        try{
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: JSON.stringify( {url: receivedLink} ),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPredictResponse(data);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to fetch response from server.');
            } 
        } catch (error){
            console.error('Error fetching prediction response', error);
            setError('An unexpected error occurred.');

        } finally {
            setShowModal(false)
        }
    }

    const processLink = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event?.target.value)
    }


    return (
        <FlexColumn>
            <div><br/></div>
            <CardBody sendAudioLink={sendAudioLink} processLink={processLink} predictResponse={predictResponse} error={error}/>
            <div>
            </div>
            {showModal && (
                <ModalWrapper>
                    <ModalContent>
                        <p> Processing audio... </p>
                        <LoadingSpinnerWrapper>
                            <LoadingSpinner />
                        </LoadingSpinnerWrapper>
                    </ModalContent>
                </ModalWrapper>
            )}
        </FlexColumn>
    )
}