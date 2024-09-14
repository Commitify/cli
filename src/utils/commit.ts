import { exec } from "child_process";

export const commit = async (message: string) => {
  return new Promise((resolve, reject) => {
    exec(`git commit -m "${message}"`, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
      return;
    });
  });
};
