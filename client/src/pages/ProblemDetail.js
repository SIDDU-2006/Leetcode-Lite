import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

function ProblemDetail() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("javascript");

  //1st use effect
  useEffect(() => {
    const fetchProblem = async () => {
      const res = await fetch(`/api/problems/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      if (res.ok) setProblem(data);
    };

    fetchProblem();
  }, [id]);
// added newly use effect
useEffect(() => {
  if (language === "javascript") {
    setCode(`function solve() {
  // write your code here
}`);
  } else if (language === "java") {
    setCode(`import java.util.*;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

  }
}`);
  }
}, [language]);
//
  const handleSubmit = async () => {
    setResult("Running...");

    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        problemId: id,
        code,
        language
      })
    });

    const data = await res.json();

    if (res.ok) {
      setResult(data.submission.status);
    } else {
      setResult("Error");
    }
  };

  if (!problem) return <h3>Loading...</h3>;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* MAIN SPLIT */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* LEFT PANEL (Problem) */}
        <div style={{
          flex: 1,
          padding: "20px",
          borderRight: "1px solid #ccc",
          overflowY: "auto"
        }}>
          <h2>{problem.title}</h2>
          <p><b>Difficulty:</b> {problem.difficulty}</p>

          <hr />

          <p>{problem.description}</p>

          {/* Optional examples */}
          {problem.examples && (
            <>
              <h4>Examples:</h4>
              <pre>{JSON.stringify(problem.examples, null, 2)}</pre>
            </>
          )}
        </div>

        {/* RIGHT PANEL (Editor) */}
        <div style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column"
        }}>

          {/* Top controls */}
          <div style={{ marginBottom: "10px" }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
            </select>
          </div>

          {/* Code Editor */}

          {/* //replacing placeholder with Monaco text editor like in VS code
          <textarea
            style={{
              flex: 1,
              width: "100%",
              background: "#1e1e1e",
              color: "#fff",
              padding: "10px",
              fontFamily: "monospace",
              fontSize: "14px"
            }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your code here..."
          /> */}
          <Editor
  height="100%"
  theme="vs-dark"
  language={language === "java" ? "java" : "javascript"}
  value={code}
  onChange={(value) => setCode(value || "")}
/>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </div>
      </div>

      {/* BOTTOM RESULT PANEL */}
      <div style={{
        height: "120px",
        borderTop: "1px solid #ccc",
        padding: "10px",
        background: "#111",
        color: "#fff"
      }}>
        <b>Result:</b>{" "}
        <span style={{
          color: result === "Accepted" ? "lime" : "red"
        }}>
          {result}
        </span>
      </div>

    </div>
  );
}

export default ProblemDetail;