require("dotenv").config();
const { exec } = require("child_process");
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN,
});

async function main() {
  const sshTemplate = (full_name) => `git@github.com:${full_name}.git`;
  const httpsTemplate = (full_name) => `https://github.com/${full_name}.git`;
  const { data } = await octokit.request(`GET /orgs/:org/repos`, {
    org: process.env.ORG_NAME,
    per_page: 100
  });
  
  console.log(`Cloning ${data.length} repos to ${process.env.ORG_DIR}`);

  let command = `cd ${process.env.ORG_DIR}; `;

  await Promise.all(
    data.map((r) => {
      const { full_name } = r;
      command += `git clone ${
        !!process.env.SSH ? sshTemplate(full_name) : httpsTemplate(full_name)
      }; `;
    })
  );

  command += `cd ${__dirname};`;

  await new Promise((resolve) => {
    console.log(`Running: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (stderr) {
        console.log(`${command} failed: ${stderr}`);
      }

      if (error) {
        console.log(`${command} failed: ${error}`);
      }

      if (stdout) {
        console.log(stdout);
      }

      resolve();
    });
  });
}

main().catch(console.error);
