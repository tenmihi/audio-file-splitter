export class Time {
  seconds: number

  constructor(seconds: number) {
    this.seconds = seconds
  }

  static parse(str: string): Time {
    if (str.match(/^d+$/)) {
      return new Time(Number(str))
    }

    const nums = str.trim().match(/[0-9]{2}/g)
    if (nums !== null && nums.length < 4) {
      let totalSeconds = 0
      for (let i = 1; i <= nums.length; i++) {
        totalSeconds += Math.pow(60, i) * Number(nums[nums.length - i])
      }
      return new Time(totalSeconds)
    }

    throw new Error("Invalid time")
  }
}
