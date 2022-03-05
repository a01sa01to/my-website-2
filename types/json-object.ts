type JsonVal = string | number | boolean | JsonObject | JsonObject[] | null

interface JsonObject {
  [key: string]: JsonVal | JsonVal[]
}

export default JsonObject
