#!/usr/bin/env node
import { askChoice, askNumber, askString } from "./utils/ask";
import { flow } from "@comitify/shared";
import { readConfig } from "./utils/config";
import { commit } from "./utils/commit";
import { clipboard } from "./utils/clipboard";

const run = async () => {
  const args = process.argv.slice(2);
  if (args.includes("-v") || args.includes("--version")) {
    const packageJson = require("../package.json");
    console.log(`Version: ${packageJson.version}`);
  } else {
    const conf = await readConfig(process.cwd());
    console.log(conf.name);
    const answers = await flow({
      askChoice,
      askNumber,
      askString,
    })(conf.questions);

    const message = conf.templating(answers);

    if (conf.autoCommit) {
      await commit(message);
    } else {
      console.log(message);
    }
  }

  process.exit(0);
};

try {
  run();
} catch (error) {
  console.error((error as Error).message);
}
