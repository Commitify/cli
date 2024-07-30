#!/usr/bin/env node
import { config } from "@comitter/shared/utils"
import { process } from "./utils/process"
import { outputTemplate, outputTitle } from "./utils/output";

const run = async () => {
  const conf = await config.read(import.meta.dir)

  await outputTitle(conf.name)
  const answers = await process(conf.questions)
  await outputTemplate(conf.templating(answers));
}

run();

