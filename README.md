# node-gh-scripts

Easily transfer all repositories from one GitHub organization to another.

## Usage

### bulk-transfer-repo.js
- Create .env in root folder (`node-gh-scripts/.env`) with the following variables:
  - ACCESS_TOKEN
    - Github personal access token.
  - OLD_ORG
    - The organization name you want to transfer repos away from.
  - NEW_ORG
    - The organization name you want to transfer repos to.
- Run `npm install` to install dependencies.
- Start with `node .` or `node index.js`.

### change-remote-urls.js

- Create .env in root folder (`node-gh-scripts/.env`) with the following variables:
  - DIRECTORY
    - Where all the repository folders are located.
  - ORG_NAME
    - GitHub organization name for creating .git URL that origin will be changed to.
  - SSH (Optional)
    - Set to TRUE if you would like your links to use SSH.
- Run `npm install` to install dependencies.
- Start with `node change-remote-urls.js`
