import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

function ProblemDetail() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
const [failedCase, setFailedCase] = useState(null); // ✅ NEW
  const [language, setLanguage] = useState("javascript");
const [runOutput, setRunOutput] = useState("");

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
setFailedCase(data.failedTestCase || null);
    } else {
      setResult("Error");
    }
  };

  if (!problem) return <h3>Loading...</h3>;


  //
  
// add Run button
const handleRun = async () => {
  setRunOutput("Running...");

  const res = await fetch("/api/submissions/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      code,
      language,
      input: problem.testCases[0]?.input || ""
    })
  });

  const data = await res.json();

  if (res.ok) {
    setRunOutput(data.output || data.status);
  } else {
    setRunOutput("Error running code");
  }
};

// Return part 
return (
  <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

    {/* MAIN SPLIT */}
    <div style={{ display: "flex", flex: 1 }}>

      {/* LEFT PANEL */}
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
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        flex: 1,
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>

        {/* Language */}
        <div style={{ marginBottom: "10px" }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>
        </div>

        {/* Monaco Editor */}
        <Editor
          height="100%"
          theme="vs-dark"
          language={language === "java" ? "java" : "javascript"}
          value={code}
          onChange={(value) => setCode(value || "")}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={handleRun}
            style={{
              padding: "10px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Run
          </button>

          <button
            onClick={handleSubmit}
            style={{
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

      </div> {/* ✅ CLOSE RIGHT PANEL */}

    </div> {/* ✅ CLOSE MAIN SPLIT */}

    {/* BOTTOM PANEL */}
    <div style={{
      height: "200px",
      borderTop: "1px solid #ccc",
      padding: "10px",
      background: "#111",
      color: "#fff",
      overflowY: "auto"
    }}>
      <b>Result:</b>{" "}
      <span style={{
        color: result === "Accepted" ? "lime" : "red"
      }}>
        {result}
      </span>

      {/* FAILED CASE */}
      {failedCase && (
        <div style={{
          marginTop: "10px",
          padding: "10px",
          background: "#222",
          borderRadius: "5px"
        }}>
          <p><b>Input:</b> {failedCase.input}</p>
          <p><b>Expected:</b> {failedCase.expected}</p>
          <p><b>Your Output:</b> {failedCase.got}</p>
        </div>
      )}

      {/* RUN OUTPUT */}
      {runOutput && (
        <div style={{ marginTop: "10px" }}>
          <b>Run Output:</b>
          <pre style={{ color: "#0f0" }}>{runOutput}</pre>
        </div>
      )}
    </div>

  </div>
);

export default ProblemDetail;