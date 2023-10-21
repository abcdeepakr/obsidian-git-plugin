import { exec } from "child_process";

export const executeShell = (absolutePath, commitMessage) => {
  exec(`cd ${absolutePath} && ./commit.sh ${commitMessage}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error.message)
    }
    if (stderr) {

      console.log(`git error: ${stderr}`)
    }
    console.log(`git message: ${stdout}`)
  });
}

export const setFilePermissions = (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error.message)
    }
    if (stderr) {
      console.log(`git error: ${stderr}`)
    }
    console.log(`git message: ${stdout}`)
  });
}