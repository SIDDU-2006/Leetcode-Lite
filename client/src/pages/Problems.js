import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Problems() {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await fetch("/api/problems", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setProblems(data);
      } else {
        alert("Unauthorized");
      }
    };

    fetchProblems();
  }, []);

  return (
    <div>
      <h2>Problems</h2>

      {problems.map((problem) => (
        <div
          key={problem._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate(`/problem/${problem._id}`)}
        >
          <h3>{problem.title}</h3>
          <p>Difficulty: {problem.difficulty}</p>
        </div>
      ))}
    </div>
  );
}

export default Problems;