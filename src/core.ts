import { createReadStream, readFileSync, writeFileSync } from "fs"
import { parse } from "csv-parse/sync"
import { AudioSplitter } from "./audio-file-splitter"
import path from "path"
import { Time } from "./utils/time"
import { extractExtension } from "./utils/extension"
import { option } from "yargs"

export type RunOptions = {
  inputPath: string
  playlistPath: string
  outputPath: string
}

export async function run(options: RunOptions) {
  const playlist = readFileSync(options.playlistPath)

  const recordList = parse(playlist, {
    skip_empty_lines: true,
  })

  const audio = createReadStream(options.inputPath)

  const audioSplitter = new AudioSplitter(options.inputPath)
  for (let i = 0; i < recordList.length; i++) {
    const currentTrack = recordList[i]
    const startSec = Time.parse(currentTrack[1])

    let endSec
    if (i + 1 < recordList.length) {
      const nextTrack = recordList[i + 1]
      endSec = Time.parse(nextTrack[1])
    }

    const extension = extractExtension(options.inputPath)
    const filename = extension
      ? `${currentTrack[0]}.${extension}`
      : currentTrack[0]

    const outputPath = path.join(options.outputPath, filename)

    await audioSplitter.split(outputPath, startSec, endSec)

    console.info(`[Info] splitted to ${outputPath}`)
  }

  console.info("complete")
}
