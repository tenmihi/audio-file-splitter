import ffmpeg from "fluent-ffmpeg"
import { ReadStream, createReadStream, createWriteStream } from "fs"
import { Time } from "./utils/time"

export class AudioSplitter {
  input: string

  constructor(input: string) {
    this.input = input
  }

  split(outputFilePath: string, start: Time, end?: Time): Promise<void> {
    return new Promise((resolve, reject) => {
      const command = ffmpeg(createReadStream(this.input))
        .setStartTime(start.seconds)
        .audioChannels(2)
        .audioFrequency(44100)
        .audioCodec("copy")

      if (end) {
        const duration = end.seconds - start.seconds
        command.duration(duration)
      }

      command
        .on("end", (stdout) => {
          resolve(stdout)
        })
        .on("error", (error: Error) => {
          reject(error)
        })
        .output(outputFilePath)
        .run()
    })
  }
}
