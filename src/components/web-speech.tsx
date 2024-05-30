import React from "react";
import { SpeakAndSpeech } from "./record-and-speech";

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
    <div className="px-20 py-10">
      <div className="space-y-1">
        <button onClick={handleRecord}>Record</button>
        <p>{text}</p>
        <button onClick={() => speak("const tan tine")}>say my name</button>
      </div>

      <SpeakAndSpeech />
    </div>
  );
};

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);

  window.speechSynthesis.speak(utterance);
};
