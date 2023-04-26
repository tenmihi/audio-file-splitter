import { Time } from "../utils/time"

export class Track {
  name: string
  start: Time
  end?: Time

  constructor(name: string, start: Time, end?: Time) {
    this.name = name
    this.start = start
    this.end = end
  }

  get duration() {
    if (!this.end) {
      return undefined
    }

    return this.end.seconds - this.start.seconds
  }
}
