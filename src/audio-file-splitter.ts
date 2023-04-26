import ffmpeg from "fluent-ffmpeg"
import { createReadStream } from "fs"
import { Time } from "./utils/time"
import { extractExtension } from "./utils/extension"
import path from "path"
import { Track } from "./entities/track"

export class AudioSplitter {
  inputPath: string
  outputPath: string
  extension?: string

  constructor(inputPath: string, outputPath: string) {
    this.inputPath = inputPath
    this.outputPath = outputPath

    this.extension = extractExtension(inputPath)
  }

  split(track: Track): Promise<void> {
    return new Promise((resolve, reject) => {
      const command = ffmpeg(createReadStream(this.inputPath))
        .setStartTime(track.start.seconds)
        .audioCodec("copy")
        .on("end", () => {
          resolve()
        })
        .on("error", (error: Error) => {
          reject(error)
        })

      if (track.duration) {
        command.duration(track.duration)
      }

      const filename = this.extension
        ? `${track.name}.${this.extension}`
        : track.name

      command.output(path.join(this.outputPath, filename)).run()
    })
  }
}
