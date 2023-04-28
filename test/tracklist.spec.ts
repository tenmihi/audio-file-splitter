import { writeFileSync } from "fs"
import { fromCSV } from "../src/tracklist"
import { Track } from "../src/entities/track"
import { Time } from "../src/utils/time"

const tracklistCsv = `
one,00:00
two,01:34
three,08:12
four,28:32
five,01:02:20
`

describe("tracklist", () => {
  it("should return an array of tracks", () => {
    expect(fromCSV(tracklistCsv)).toStrictEqual([
      new Track("one", new Time(0), new Time(94)),
      new Track("two", new Time(94), new Time(492)),
      new Track("three", new Time(492), new Time(1712)),
      new Track("four", new Time(1712), new Time(3740)),
      new Track("five", new Time(3740)),
    ])
  })
})
