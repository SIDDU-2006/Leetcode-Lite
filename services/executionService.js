const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const tempDir = path.join(__dirname, "../temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

//execute java

const executeJava = (code, input) => {
  return new Promise((resolve) => {

    const filePath = path.join(tempDir, "Main.java");
    fs.writeFileSync(filePath, code);

    const start = Date.now();

    const command = `cd ${tempDir} && javac Main.java && echo "${input}" | java Main`;

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {

      const end = Date.now();
      const executionTime = end - start;

      if (error) {
        return resolve({
          error: true,
          output: stderr || error.message,
          executionTime
        });
      }

      resolve({
        error: false,
        output: stdout.trim(),
        executionTime
      });
    });
  });
};

module.exports = { executeJava };


// js support
const executeJS = (code, input) => {
  return new Promise((resolve) => {

    const filePath = path.join(tempDir, "script.js");
    fs.writeFileSync(filePath, code);

    const start = Date.now();

    const command = `cd ${tempDir} && echo "${input}" | node script.js`;

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {

      const end = Date.now();
      const executionTime = end - start;

      if (error) {
        return resolve({
          error: true,
          output: stderr || error.message,
          executionTime
        });
      }

      resolve({
        error: false,
        output: stdout.trim(),
        executionTime
      });
    });
  });
};
module.exports = { executeJava, executeJS };
