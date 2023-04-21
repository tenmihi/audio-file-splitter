import ffmpeg from "fluent-ffmpeg"
import { ReadStream } from "fs"
import { Time } from "./utils/time"

export class AudioSplitter {
  audio: ReadStream

  constructor(audio: ReadStream) {
    this.audio = audio
  }

  split(start: Time, end?: Time): Promise<any> {
    return new Promise((resolve, reject) => {
      const command = ffmpeg(this.audio)
        .setStartTime(start.seconds)
        .audioChannels(2)
        .audioFrequency(44100)
        .audioCodec("flac")
        .outputFormat("flac")

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
        .run()
    })
  }
}
