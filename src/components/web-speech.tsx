import React from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const Speech = () => {
  const [text, setText] = React.useState<string>();

  function handleRecord() {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;

    recognition.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      console.log("event", event);
    };

    recognition.onerror = function (event) {
      console.error("Speech recognition error", event.error);
    };

    recognition.start();
  }
  return (
    <div className="">
      <button onClick={handleRecord}>Record</button>

      <p>{text}</p>
    </div>
  );
};
