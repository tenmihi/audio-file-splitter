import yargs from "yargs"
import { run } from "./client"

const args = yargs
  .command("* <input> <tracklistPath>", "split input audio along with playlist")
  .options({
    output: {
      type: "string",
    },
  })
  .parseSync()

const options = {
  outputPath: args.output || "./out/",
  inputPath: args.input as string,
  tracklistPath: args.tracklistPath as string,
}

run(options)
