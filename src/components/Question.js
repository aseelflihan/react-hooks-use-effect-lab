import React, { useState, useRef, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timerIdRef = useRef();
  const onAnsweredRef = useRef(onAnswered);

  useEffect(() => {
    onAnsweredRef.current = onAnswered;
  }, [onAnswered]);

  useEffect(() => {
    if (timeRemaining > 0) {
      timerIdRef.current = setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else {
      onAnsweredRef.current(false);
    }

    return () => {
      clearTimeout(timerIdRef.current);
    };
  }, [timeRemaining]);

  function handleAnswer(isCorrect) {
    clearTimeout(timerIdRef.current);
    setTimeRemaining(10);
    if (onAnsweredRef.current) {
      onAnsweredRef.current(isCorrect);
      onAnsweredRef.current = null;
    }
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
