require("dotenv").config();
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
  auth: process.env.ACCESS_TOKEN,
});

async function main() {
  console.log(
    `Starting transfer:\n- Access Token: ${process.env.ACCESS_TOKEN}\n- Old Org: ${process.env.OLD_ORG}\n- New Org: ${process.env.NEW_ORG}`
  );
  const { data } = await octokit.request(`GET /orgs/:org/repos`, {
    org: process.env.OLD_ORG,
  });
  console.log(`Transferring ${data.length} repos to ${process.env.NEW_ORG}`);
  let delay = 0;
  const success = [];
  const fail = [];
  Promise.all(
    data.map((r) => {
      d = delay;
      delay += 1000;
      return new Promise((resolve) => {
        setTimeout(async () => {
          process.stdout.write(
            `Transferring ${r.full_name} to ${process.env.NEW_ORG}`
          );
          try {
            await octokit.request(`POST /repos/${r.full_name}/transfer`, {
              new_owner: process.env.NEW_ORG,
            });
            process.stdout.write(" > done\n");
          } catch (err) {
            process.stdout.write("\n");
            fail.push(r.name);
          }
          resolve();
        }, d);
      });
    })
  ).then(() => {
    console.log(`Successfully transferred ${success.length} repos.`);
    if (fail.length) {
      console.log(`Failed to transfer ${fail.length} repos: ${fail}.`);
    }
  });
}

main().catch(console.error);
