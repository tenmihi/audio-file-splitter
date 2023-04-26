import { AudioSplitter } from "./audio-file-splitter"
import { fromCSV } from "./tracklist"

export type RunOptions = {
  inputPath: string
  tracklistPath: string
  outputPath: string
}

export async function run(options: RunOptions) {
  const tracklist = fromCSV(options.tracklistPath)

  const audioSplitter = new AudioSplitter(options.inputPath, options.outputPath)

  for (const track of tracklist) {
    await audioSplitter.split(track)

    console.info(`[Info] splitted ${track.name}`)
  }

  console.info("done.")
}
