# bulk-transfer-repo

Easily transfer all repositories from one GitHub organization to another.

## Usage

- Create .env in root folder (`bulk-transfer-repo/.env`) with the following variables:
  - ACCESS_TOKEN
    - Github personal access token.
  - OLD_ORG
    - The organization name you want to transfer repos away from.
  - NEW_ORG
    - The organization name you want to transfer repos to.
- Run `npm install` to install dependencies.
- Run `node .` or `node index.js` to start the script.
