require("dotenv").config();
const { readdirSync } = require("fs");
const { exec } = require("child_process");

const currentDir = __dirname;
const dir = process.env.DIRECTORY;
const ssh = !!process.env.SSH;
const org = process.env.ORG_NAME;

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const sshTemplate = (full_name) => `git@github.com:${full_name}.git`;
const httpsTemplate = (full_name) => `https://github.com/${full_name}.git`;

Promise.all(
  getDirectories(dir).map((name) => {
    return new Promise((resolve) => {
      const full_name = `${org}/${name}`;
      const command = `cd ${dir}/${name} && git remote set-url origin ${
        ssh ? sshTemplate(full_name) : httpsTemplate(full_name)
      }`;
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
