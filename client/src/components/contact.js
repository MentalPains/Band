import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('email123', 'template_d03t6uq', form.current, 'DI1l_1_nxUNVM-Jzg')
      .then(
        (result) => {
          console.log(result.text);
          setMessage('Message sent successfully!');
          setIsSuccess(true);
          // Optionally navigate to another route on success
          // navigate('/success');
          setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
        },
        (error) => {
          console.log(error.text);
          setMessage(`Failed to send message: ${error.text}`);
          setIsSuccess(false);
          setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
        },
      );
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px', margin: 'auto' }}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="message">Suggestions</label>
        <textarea name="message" id="message" required />

        <input type="submit" value="Send" />
      </form>
      {message && (
        <div style={{ color: isSuccess ? 'green' : 'red', marginTop: '10px' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Contact;
