
import React, {FC, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface ButtonFormProps {
  onClick: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const ButtonForm: FC<ButtonFormProps> = ({ onClick, onInputChange }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onInputChange(event); 
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="YouTube URL"
          aria-label="User YouTube input"
          value={inputValue}
          onChange={handleInputChange}
          className="ml-auto"
        />
        <Button
          variant="primary"
          id="button-addon2"
          onClick={onClick}
        >
          Submit
        </Button>
      </InputGroup>
    </>
  );
};

export default ButtonForm;
