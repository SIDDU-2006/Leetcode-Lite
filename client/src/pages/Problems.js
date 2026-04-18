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
      {/* ✅ HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h2>Problems</h2>

        <div>
          {/* 🔥 NEW BUTTON */}
          <button
            onClick={() => navigate("/submissions")}
            style={{ marginRight: "10px" }}
          >
            View Submissions
          </button>

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* PROBLEM LIST */}
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

//Now your app flow becomes:

// Problems page
// → View Submissions button
// → Navigate to history
// Clean top-right controls:
// Submissions
// Logout