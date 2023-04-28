import { extractExtension } from "../../src/utils/extension"

describe("utils/extension", () => {
  it("Passing /path/to/file.mp4 should return mp4", () => {
    const extension = extractExtension("/path/to/file.mp4")
    expect(extension).toBe("mp4")
  })

  it("Passing ../path/to/file.mp4 should return mp4", () => {
    const extension = extractExtension("../path/to/file.mp4")
    expect(extension).toBe("mp4")
  })

  it("Passing /path/to/file.tar.gz should return tar.gz", () => {
    const extension = extractExtension("/path/to/file.tar.gz")
    expect(extension).toBe("tar.gz")
  })
})
