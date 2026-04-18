const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const tempDir = path.join(__dirname, "../temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// 🔥 generate unique filename
const generateFileName = (ext) => {
  return `file_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
};

// ---------------- JAVA EXECUTION ----------------
const executeJava = (code, input) => {
  return new Promise((resolve) => {

    const fileName = generateFileName("java");
    const className = fileName.replace(".java", "");
    const filePath = path.join(tempDir, fileName);

    // Replace class name dynamically
    code = code.replace(/public class Main/g, `public class ${className}`);

    fs.writeFileSync(filePath, code);

    const start = Date.now();

    const command = `cd ${tempDir} && javac ${fileName} && echo "${input}" | java ${className}`;

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {

      const end = Date.now();
      const executionTime = end - start;

      // 🔥 cleanup
      try {
        fs.unlinkSync(filePath);
        fs.unlinkSync(path.join(tempDir, `${className}.class`));
      } catch {}

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

// ---------------- JS EXECUTION ----------------
const executeJS = (code, input) => {
  return new Promise((resolve) => {

    const fileName = generateFileName("js");
    const filePath = path.join(tempDir, fileName);

    fs.writeFileSync(filePath, code);

    const start = Date.now();

    const command = `cd ${tempDir} && echo "${input}" | node ${fileName}`;

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {

      const end = Date.now();
      const executionTime = end - start;

      // 🔥 cleanup
      try {
        fs.unlinkSync(filePath);
      } catch {}

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