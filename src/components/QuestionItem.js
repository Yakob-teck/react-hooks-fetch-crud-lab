import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleCorrectIndexChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    onUpdate(id, newCorrectIndex);
  };

  const answerOptions = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectIndexChange}>
          {answerOptions}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
