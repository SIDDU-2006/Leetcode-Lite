import React, { useEffect, useState } from "react";

function Submissions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch("/api/submissions/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setSubs(data);
      } else {
        alert("Failed to load submissions");
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div>
      <h2>My Submissions</h2>

      {subs.length === 0 && <p>No submissions yet</p>}

      {subs.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p><b>Problem:</b> {s.problem?.title}</p>
          <p><b>Difficulty:</b> {s.problem?.difficulty}</p>

          <p>
            <b>Status:</b>{" "}
            <span style={{
              color: s.status === "Accepted" ? "green" : "red"
            }}>
              {s.status}
            </span>
          </p>

          <p><b>Execution Time:</b> {s.executionTime} ms</p>

          <p><b>Language:</b> {s.language}</p>

          <p style={{ fontSize: "12px", color: "gray" }}>
            Submitted at: {new Date(s.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Submissions;