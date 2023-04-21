import yargs from "yargs"
import { run } from "./core"

const args = yargs
  .command("* <input> <playlist>", "split input audio along with playlist")
  .options({
    output: {
      type: "string",
    },
  })
  .parseSync()

const options = {
  outputPath: args.output || "./out/",
  inputPath: args.input as string,
  playlistPath: args.playlist as string,
}

run(options)
