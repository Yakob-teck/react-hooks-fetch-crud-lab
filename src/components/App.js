import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const addQuestion = (newQuestion) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then(() => {
        fetchQuestions();
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchQuestions();
          console.log("Question deleted:", id);
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const updateQuestion = (id, newCorrectIndex) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return {
          ...question,
          correctIndex: newCorrectIndex,
        };
      }
      return question;
    });

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setQuestions(updatedQuestions);
          console.log("Correct answer updated:", id, newCorrectIndex);
        }
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
