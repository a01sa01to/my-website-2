/**
 * 「***YYYY***-***MM***-***DD***T***HH***:***MM***:***SS***.***SSS***+09:00」の形式に変換する。
 * @param str - 日付に変換する文字列
 * @returns 変換された日付の文字列、変換できなければnull
 */
const str2date = (str: string): string | null => {
  const date = new Date(str)
  if (isNaN(date.getTime())) {
    return null
  }
  return (
    String(date.getFullYear()) +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0') +
    'T' +
    String(date.getHours()).padStart(2, '0') +
    ':' +
    String(date.getMinutes()).padStart(2, '0') +
    ':' +
    String(date.getSeconds()).padStart(2, '0') +
    '.' +
    (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
    '+09:00'
  )
}

export default str2date
