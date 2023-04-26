import { parse } from "csv-parse/sync"
import { readFileSync } from "fs"
import { Time } from "./utils/time"
import { Track } from "./entities/track"

export function fromCSV(csvPath: string) {
  const tracklistCsv = readFileSync(csvPath)

  const tracklist = parse(tracklistCsv, {
    skip_empty_lines: true,
    columns: ["name", "start"],
  }) as { name: string; start: string }[]

  const tracks = []

  for (let i = 0; i < tracklist.length; i++) {
    const currentTrack = tracklist[i]
    const startSec = Time.parse(currentTrack.start)

    let endSec
    if (i + 1 < tracklist.length) {
      const nextTrack = tracklist[i + 1]
      endSec = Time.parse(nextTrack.start)
    }

    tracks.push(new Track(currentTrack.name, startSec, endSec))
  }

  return tracks
}
