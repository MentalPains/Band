import { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

// Styled components for form styling
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const StyledTextarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Contact = () => {
  const form = useRef();
  const [submitMessage, setSubmitMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(
        (result) => {
          console.log(result.text);
          setSubmitMessage('Email successfully sent!');
        },
        (error) => {
          console.log(error.text);
          setSubmitMessage('Failed to send email. Please try again later.');
        }
      );
  };

  return (
    <div>
      <StyledForm ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <StyledInput type="text" name="name" required />
        <label>Email</label>
        <StyledInput type="email" name="email" required />
        <label>Message</label>
        <StyledTextarea name="message" required />
        <StyledButton type="submit">Send</StyledButton>
      </StyledForm>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
};

export default Contact;
