import path from "path"

export function extractExtension(filePath: string) {
  const fileName = path.resolve(filePath).split("/").pop()
  const extension = fileName?.split(".").pop()
  return extension
}
