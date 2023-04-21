import { createReadStream, readFileSync, writeFileSync } from "fs"
import { parse } from "csv-parse/sync"
import { AudioSplitter } from "./audio-file-splitter"
import path from "path"
import { Time } from "./utils/time"

export type RunOptions = {
  inputPath: string
  playlistPath: string
  outputPath: string
  inputCodec: string
  outputCodec: string
}

export async function run(options: RunOptions) {
  const playlist = readFileSync(options.playlistPath)

  const recordList = parse(playlist, {
    skip_empty_lines: true,
  })

  const audio = createReadStream(options.inputPath)

  for (let i = 0; i < recordList.length; i++) {
    const currentTrack = recordList[i]
    const startSec = Time.parse(currentTrack[1])

    console.log("pow")

    let endSec
    if (i + 1 < recordList.length) {
      const nextTrack = recordList[i + 1]
      endSec = Time.parse(nextTrack[1])
    }

    const audioSplitter = new AudioSplitter(audio)
    const splittedAudio = await audioSplitter.split(startSec, endSec)

    const outputPath = path.join(options.outputPath, currentTrack[0])
    writeFileSync(splittedAudio, outputPath)
  }

  console.info("complete")
}
