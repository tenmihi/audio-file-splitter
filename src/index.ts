import yargs from "yargs"
import { run } from "./core"

const args = yargs
  .command("* <input> <playlist>", "split input audio along with playlist")
  .options({
    output: {
      type: "string",
    },
    inputCodec: {
      type: "string",
    },
    outputCodec: {
      type: "string",
    },
  })
  .parseSync()

const options = {
  outputPath: args.output || "./out/",
  inputPath: args.input as string,
  inputCodec: args.inputCodec || "mp3",
  outputCodec: args.outputCodec || "mp3",
  playlistPath: args.playlist as string,
}

run(options)
