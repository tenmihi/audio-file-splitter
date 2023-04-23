import { match } from "assert"

export class Time {
  seconds: number

  constructor(seconds: number) {
    this.seconds = seconds
  }

  static parse(str: string): Time {
    if (str.match(/^[0-9]+$/)) {
      return new Time(Number(str))
    }

    const matches = str
      .trim()
      .match(/^(?:(?:([0-9]{2,}):([0-5][0-9]))|([0-9]{2})):([0-5][0-9])$/)
    if (matches !== null) {
      const nums = matches.slice(1).filter((n) => typeof n !== "undefined")
      let totalSeconds = 0
      for (let i = 0; i < nums.length; i++) {
        totalSeconds += Math.pow(60, i) * Number(nums[nums.length - i - 1])
      }
      return new Time(totalSeconds)
    }

    throw new Error("Invalid time")
  }
}
