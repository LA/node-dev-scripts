require('dotenv').config()
const fs = require('fs')

const getDirectories = (source) =>
 fs.readdirSync(source, { withFileTypes: true })
 .filter((dirent) => dirent.isDirectory())
 .map((dirent) => dirent.name);

const workspaceFileContents = { folders: [] }

 getDirectories(process.env.WORKSPACE_PATH).forEach((name) => {
   workspaceFileContents.folders.push({ path: name })
 })

fs.writeFile(`${process.env.WORKSPACE_PATH}/${process.env.WORKSPACE_NAME}.code-workspace`, JSON.stringify(workspaceFileContents), console.error)
