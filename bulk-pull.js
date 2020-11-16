require("dotenv").config();
const { readdirSync } = require("fs");
const { exec } = require("child_process");

const currentDir = __dirname;
const dir = process.env.DIR;

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

Promise.all(
  getDirectories(dir).map((name) => {
    return new Promise((resolve) => {
      const command = `cd ${dir}/${name} && git pull`;
      console.log(`Running \`${command}\``);
      exec(command, (error, _, stderr) => {
        if (stderr) {
          console.log(`${name} failed: ${stderr}`);
        }

        if (error) {
          console.log(`${name} failed: ${error}`);
        }

        resolve();
      });
    });
  })
).then(() => {
  exec(`cd ${currentDir}`, (error, _, stderr) => {});
});
