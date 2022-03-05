import crypto from 'crypto'

const generateHash = (data: string) => {
  const hash = crypto.createHash('sha256')
  hash.update(data, 'utf-8')
  return hash.digest('base64').toString()
}

export default generateHash
