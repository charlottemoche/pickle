import React, { useState } from "react";
import Form from "./Form";
import Message from "./Message";
import Card from "./Card";
import FormMessage from "./FormMessage";

function ModalContent({ sender }) {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFormSubmit = (messageData) => {
    setSubmitted(true);
    setMessage(messageData);
  };

  return (
    <>
      <Card
        image="../src/img/maxi.png"
        name="Silk Maxi Dress"
        subtitle="Elegant evening wear"
        price="$75"
        size="L"
      />

      {submitted ? (
        <FormMessage message={message} />
      ) : (
        <>
          <Message sender={sender} />
          <Form onSubmitSuccess={handleFormSubmit} sender={sender} />
        </>
      )}
    </>
  );
}

export default ModalContent;
