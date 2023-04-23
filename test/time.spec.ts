import { Time } from "../src/utils/time"

describe("utils/time", () => {
  describe("parse", () => {
    it("Passing 382 should return 382", () => {
      const time = Time.parse("382")
      expect(time.seconds).toBe(382)
    })

    it("Passing 00:00 should return 0", () => {
      const time = Time.parse("00:00")
      expect(time.seconds).toBe(0)
    })

    it("Passing 02:34 should return 154", () => {
      const time = Time.parse("02:34")
      expect(time.seconds).toBe(154)
    })

    it("Passing 92:23 should return 5543", () => {
      const time = Time.parse("92:23")
      expect(time.seconds).toBe(5543)
    })

    it("Passing 01:33:00 should return 5580", () => {
      const time = Time.parse("01:33:00")
      expect(time.seconds).toBe(5580)
    })

    it("Passing 238:12:05 should return 857525", () => {
      const time = Time.parse("238:12:05")
      expect(time.seconds).toBe(857525)
    })
  })
})
