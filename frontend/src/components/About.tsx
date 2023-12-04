import styled from "styled-components"
import { FlexRow } from "./FlexRow";

const AboutDiv = styled.div`
    position:relative;    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px;
    padding: 10px;
`;

const StyledText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  max-width: 90%;
  min-width: 40%;
  text-align: left;
`;

const StyledHeader = styled.h1`
    font-family: 'Open Sans', sans-serif;
    font-size: 46px;
    padding-top: 20px;
    padding-bottom: 20px;
`;

interface ImageProps {
    imageUrl: string;
  }

const TechStackImage = styled.div<ImageProps>`
  width: 200px; 
  height: 150px;
  background-image: url('${props => props.imageUrl}');
  background-size: contain;
  background-repeat: no-repeat;
`;


export const About = () => {
    const techStackSvgs = [
        "https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png",
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg",
        "https://librosa.org/images/librosa_logo_text.png",
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        "https://www.svgrepo.com/show/374146/typescript-official.svg",
        "https://raw.githubusercontent.com/yt-dlp/yt-dlp/master/.github/banner.svg"
      ];

    return (
            <AboutDiv>
                <StyledHeader>
                    About the Project
                </StyledHeader>
                <StyledText>
                    Our web application is your key to unveiling the mystery behind your favorite tunes. 
                    With a simple YouTube link, our specially trained convolutional neural network dives 
                    into the heart of the audio, extracting the essence of the song to predict its genre. <br/>
                    Behind the scenes, our CNN has been meticulously trained on a repository of 23,000 diverse 
                    audio clips, each labeled with its genre. This powerful foundation allows our 
                    model to discern the distinct characteristics of different music genres with impressive accuracy.
                </StyledText>
                <StyledHeader>
                    How It Works
                </StyledHeader>
                <StyledText>
                    When you provide a YouTube link through our user-friendly web application, 
                    our system isolates the audio, converting it into a usable spectrogram image. This transformed data 
                    is then fed into our trained model, triggering the prediction process. Once complete, 
                    the server returns valuable insights about the song's genre, beautifully displayed in your browser 
                    via an intuitive pie chart.
                </StyledText>
                <StyledHeader>
                    Tech Stack
                </StyledHeader>
                <FlexRow>     
                    {techStackSvgs.map((url, index) => (
                        <TechStackImage key={index} imageUrl={url} />
                    ))}
                </FlexRow>
            </AboutDiv>

    )
}