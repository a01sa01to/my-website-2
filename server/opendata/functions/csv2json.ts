import type Types from '../types/csv2json'
import str2date from './str2date'

const csv2json = (
  csvContent: string,
  overridesMap: Types.overrides_map
): string => {
  csvContent = csvContent.replace(/\r\n/g, '\n')
  const csvLines = csvContent.split('\n')
  const csvHeaders = csvLines[0].split(',')
  const csvData = csvLines.slice(1)
  const jsonData = csvData
    .filter((line) => {
      return line.split(',').length === csvHeaders.length
    })
    .map((line) => {
      const lineData = line.split(',')
      const jsonLine: { [key: string]: number | boolean | string } = {}

      lineData.forEach((data, i) => {
        const overrideMap = overridesMap[csvHeaders[i]]
        if (!overrideMap) {
          throw new Error(`${csvHeaders[i]} is not defined in overridesMap`)
        }
        if (overrideMap.type === 'number') {
          jsonLine[overrideMap.header] = Number(data)
        } else if (overrideMap.type === 'date') {
          jsonLine[overrideMap.header] = str2date(data)
        } else if (overrideMap.type === 'boolean') {
          const falsy = ['false', '0', 'undefined', 'NaN', '-0']
          if (data.toLowerCase() === 'null' || data === '') {
            jsonLine[overrideMap.header] = null
          } else if (falsy.includes(data.toLowerCase())) {
            jsonLine[overrideMap.header] = false
          } else {
            jsonLine[overrideMap.header] = true
          }
        } else {
          jsonLine[overrideMap.header] = data || null
        }
      })
      return jsonLine
    })
  return JSON.stringify(jsonData)
}

export default csv2json
