import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      const res = await fetch(`/api/problems/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setProblem(data);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        problemId: id,
        code,
        language: "javascript"
      })
    });

    const data = await res.json();

    if (res.ok) {
      setResult(data.status);
    } else {
      setResult("Submission failed");
    }
  };

  if (!problem) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <p><strong>Difficulty:</strong> {problem.difficulty}</p>

      <h3>Write Your Code:</h3>

      <textarea
        rows="10"
        cols="60"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your solution here..."
      />

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>

      {result && (
  <div style={{ marginTop: "20px" }}>
    <h3>
      Result:{" "}
      <span style={{
        color: result === "Accepted" ? "green" : "red"
      }}>
        {result}
      </span>
    </h3>
  </div>
)}
    </div>
  );
}

export default ProblemDetail;