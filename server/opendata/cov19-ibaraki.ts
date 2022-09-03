import { readFile, readFileSync } from 'fs'
import { join, resolve } from 'path'
import csv2json from './functions/csv2json'
import { PaginationFn } from './functions/pagination'
import str2date from './functions/str2date'
import type DataTypes from './types/cov19-ibaraki'
import type Csv2jsonTypes from './types/csv2json'

const __dirname = resolve(...(process.env.development ? ['static'] : ['']))

const opendataBasepath = join(
  __dirname,
  'opendata',
  'api',
  'raw',
  'covid19_ibaraki'
)

const getData = (): Promise<DataTypes.all_data> => {
  const LastUpdate: DataTypes.last_update = JSON.parse(
    readFileSync(resolve(opendataBasepath, 'last_update.json')).toString()
  )

  const ret: DataTypes.all_data = {
    call_center: () => {
      throw new Error('Function not implemented.')
    },
    corona_next: {
      last_update: '',
      stage: 0,
      move_date: '',
      severe: 0,
      sickbed: 0,
      new_patients: 0,
      severe_lastweek: 0,
      sickbed_lastweek: 0,
      new_patients_lastweek: 0,

      care_rate: 0,
      non_closecontact: 0,
      care: 0,
      positive_rate: 0,
      care_rate_lastweek: 0,
      non_closecontact_lastweek: 0,
      care_lastweek: 0,
      positive_rate_lastweek: 0,
    },
    death_attributes: () => {
      throw new Error('Function not implemented.')
    },
    death_number: () => {
      throw new Error('Function not implemented.')
    },
    inspections_summary: {
      last_update: '',
      data_date: '',
      datasets: [],
    },
    mutant_positive_number: () => {
      throw new Error('Function not implemented.')
    },
    mutant_test_people: () => {
      throw new Error('Function not implemented.')
    },
    patients: () => {
      throw new Error('Function not implemented.')
    },
    positive_number: () => {
      throw new Error('Function not implemented.')
    },
    recovered_number: () => {
      throw new Error('Function not implemented.')
    },
    summary: {
      last_update: '',
      total: 0,
      care: 0,
      hospitalized: 0,
      severe: 0,
      moderate: 0,
      light: 0,
      home: 0,
      hotel: 0,
      recovered: 0,
      death: 0,
      other: 0,
    },
    test_people: () => {
      throw new Error('Function not implemented.')
    },
    vaccination: () => {
      throw new Error('Function not implemented.')
    },
  }

  const call_center = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_call_center.csv'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const overridesMap: Csv2jsonTypes.overrides_map = {
          受付_年月日: { header: 'date', type: 'date' },
          全国地方公共団体コード: { header: 'government_code', type: 'string' },
          都道府県名: { header: 'prefecture', type: 'string' },
          市区町村名: { header: 'city', type: 'string' },
          相談件数: { header: 'value', type: 'number' },
        }

        const jsonData: DataTypes.call_center[] = JSON.parse(
          csv2json(filecontent, overridesMap)
        )

        ret.call_center = ({ before, after, first, last }) =>
          PaginationFn(
            jsonData,
            str2date(LastUpdate.call_center),
            before,
            after,
            first,
            last
          )

        return res('call_center')
      }
    )
  })

  const corona_next = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_corona_next.json'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const jsonData: DataTypes.corona_next_raw = JSON.parse(filecontent)
        const move_date = str2date(jsonData.moveDate)
        delete jsonData.moveDate

        ret.corona_next = {
          last_update: str2date(LastUpdate.corona_next),
          move_date,
          ...jsonData,

          care_rate: 0,
          non_closecontact: 0,
          care: 0,
          positive_rate: 0,
          care_rate_lastweek: 0,
          non_closecontact_lastweek: 0,
          care_lastweek: 0,
          positive_rate_lastweek: 0,
        }

        return res('corona_next')
      }
    )
  })

  const death_attributes = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_death_attributes.csv'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const overridesMap: Csv2jsonTypes.overrides_map = {
          No: { header: 'no', type: 'number' },
          全国地方公共団体コード: { header: 'government_code', type: 'string' },
          都道府県名: { header: 'prefecture', type: 'string' },
          市区町村名: { header: 'city', type: 'string' },
          公表_年月日: { header: 'date', type: 'date' },
          年代: { header: 'age', type: 'string' },
          性別: { header: 'gender', type: 'string' },
        }

        const jsonData: DataTypes.death_attributes[] = JSON.parse(
          csv2json(filecontent, overridesMap)
        )

        ret.death_attributes = ({ before, after, first, last }) =>
          PaginationFn(
            jsonData,
            str2date(LastUpdate.death_attr),
            before,
            after,
            first,
            last
          )

        return res('death_attributes')
      }
    )
  })

  const death_number = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_death_number.csv'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const overridesMap: Csv2jsonTypes.overrides_map = {
          公表_年月日: { header: 'date', type: 'date' },
          全国地方公共団体コード: { header: 'government_code', type: 'string' },
          都道府県名: { header: 'prefecture', type: 'string' },
          市区町村名: { header: 'city', type: 'string' },
          死亡者数: { header: 'value', type: 'number' },
        }

        const jsonData: DataTypes.death_number[] = JSON.parse(
          csv2json(filecontent, overridesMap)
        )

        ret.death_number = ({ before, after, first, last }) =>
          PaginationFn(
            jsonData,
            str2date(LastUpdate.death_number),
            before,
            after,
            first,
            last
          )

        return res('death_number')
      }
    )
  })

  const inspections_summary = new Promise((res, rej) => {
    readFile(
      resolve(
        opendataBasepath,
        '080004_ibaraki_covid19_inspections_summary.json'
      ),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const jsonData: DataTypes.inspections_summary_raw =
          JSON.parse(filecontent)

        const data_date = str2date(jsonData.updDate)
        delete jsonData.updDate

        ret.inspections_summary = {
          last_update: str2date(LastUpdate.inspections_summary),
          data_date,
          ...jsonData,
        }

        return res('inspections_summary')
      }
    )
  })

  const mutant_positive_number = new Promise((res, rej) => {
    readFile(
      resolve(
        opendataBasepath,
        '080004_ibaraki_covid19_mutant_positive_number.json'
      ),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const jsonData: DataTypes.mutant_positive_number_raw[] =
          JSON.parse(filecontent)

        const resData: DataTypes.mutant_positive_number[] = jsonData.map(
          (item) => ({
            date: str2date(item['公表_年月日']),
            government_code: item['全国地方公共団体コード'],
            prefecture: item['都道府県名'],
            city: item['市区町村名'],
            total: item['変異株陽性者数'],
            strain_name: item['変異株名'],
            by_age: {
              under_twenties: item['年代別']['20代以下'],
              thirties: item['年代別']['30代'],
              fourties: item['年代別']['40代'],
              fifties: item['年代別']['50代'],
              sixties: item['年代別']['60代'],
              seventies: item['年代別']['70代'],
              eighties: item['年代別']['80代'],
              nineties: item['年代別']['90代'],
              over_hundred: item['年代別']['100歳以上'],
              unknown: item['年代別']['不明'],
            },
            by_gender: {
              male: item['性別']['男性'],
              female: item['性別']['女性'],
              unknown: item['性別']['不明'],
            },
          })
        )

        ret.mutant_positive_number = ({ before, after, first, last }) =>
          PaginationFn(
            resData,
            str2date(LastUpdate.mutant_positive),
            before,
            after,
            first,
            last
          )

        return res('mutant_positive_number')
      }
    )
  })

  const mutant_test_people = new Promise((res, rej) => {
    readFile(
      resolve(
        opendataBasepath,
        '080004_ibaraki_covid19_mutant_test_people.csv'
      ),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const overridesMap: Csv2jsonTypes.overrides_map = {
          '実施_年月日 FROM': { header: 'date_from', type: 'date' },
          '実施_年月日 TO': { header: 'date_to', type: 'date' },
          全国地方公共団体コード: { header: 'government_code', type: 'string' },
          都道府県名: { header: 'prefecture', type: 'string' },
          市区町村名: { header: 'city', type: 'string' },
          検査実施_人数: { header: 'tested', type: 'number' },
          陽性者数: { header: 'positive', type: 'number' },
          変異株名: { header: 'strain_name', type: 'string' },
        }

        const jsonData: DataTypes.mutant_test_people[] = JSON.parse(
          csv2json(filecontent, overridesMap)
        )

        ret.mutant_test_people = ({ before, after, first, last }) =>
          PaginationFn(
            jsonData,
            str2date(LastUpdate.mutant_test_people),
            before,
            after,
            first,
            last
          )

        return res('mutant_test_people')
      }
    )
  })

  const patients = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_patients.csv'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const overridesMap: Csv2jsonTypes.overrides_map = {
          No: { header: 'no', type: 'number' },
          全国地方公共団体コード: { header: 'government_code', type: 'string' },
          都道府県名: { header: 'prefecture', type: 'string' },
          市区町村名: { header: 'city', type: 'string' },
          公表_年月日: { header: 'publish_date', type: 'date' },
          発症_年月日: { header: 'onset_date', type: 'date' },
          患者_居住地: { header: 'address', type: 'string' },
          患者_年代: { header: 'age', type: 'string' },
          患者_性別: { header: 'gender', type: 'string' },
          患者_職業: { header: 'occupation', type: 'string' },
          患者_状態: { header: 'status', type: 'string' },
          患者_症状: { header: 'symptoms', type: 'string' },
          患者_渡航歴の有無フラグ: {
            header: 'travel_abroad_history',
            type: 'boolean',
          },
          患者_濃厚接触者フラグ: { header: 'close_contact', type: 'boolean' },
          検査方法: { header: 'test_method', type: 'string' },
          備考: { header: 'note', type: 'string' },
        }

        const jsonData: DataTypes.patients[] = JSON.parse(
          csv2json(filecontent, overridesMap)
        )

        ret.patients = ({ before, after, first, last }) =>
          PaginationFn(
            jsonData,
            str2date(LastUpdate.patients),
            before,
            after,
            first,
            last
          )

        return res('patients')
      }
    )
  })

  const positive_number = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_positive_number.csv'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const overridesMap: Csv2jsonTypes.overrides_map = {
          公表_年月日: { header: 'date', type: 'date' },
          全国地方公共団体コード: { header: 'government_code', type: 'string' },
          都道府県名: { header: 'prefecture', type: 'string' },
          市区町村名: { header: 'city', type: 'string' },
          陽性者数: { header: 'positive', type: 'number' },
          うち濃厚接触者: { header: 'close_contact', type: 'number' },
        }

        const jsonData: DataTypes.positive_number[] = JSON.parse(
          csv2json(filecontent, overridesMap)
        )

        ret.positive_number = ({ before, after, first, last }) =>
          PaginationFn(
            jsonData,
            str2date(LastUpdate.positive_number),
            before,
            after,
            first,
            last
          )

        return res('positive_number')
      }
    )
  })

  const recovered_number = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_recovered_number.csv'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const overridesMap: Csv2jsonTypes.overrides_map = {
          公表_年月日: { header: 'date', type: 'date' },
          全国地方公共団体コード: { header: 'government_code', type: 'string' },
          都道府県名: { header: 'prefecture', type: 'string' },
          市区町村名: { header: 'city', type: 'string' },
          回復者数: { header: 'value', type: 'number' },
        }

        const jsonData: DataTypes.recovered_number[] = JSON.parse(
          csv2json(filecontent, overridesMap)
        )

        ret.recovered_number = ({ before, after, first, last }) =>
          PaginationFn(
            jsonData,
            str2date(LastUpdate.recovered_number),
            before,
            after,
            first,
            last
          )

        return res('recovered_number')
      }
    )
  })

  const summary = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_summary.json'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const jsonData: DataTypes.summary_raw = JSON.parse(filecontent)

        ret.summary = {
          last_update: str2date(LastUpdate.lastUpdate),
          total: jsonData.children[0].value,
          // care: jsonData.children[0].children[0].value,
          care: 0,
          hospitalized:
            jsonData.children[0].children[0].children[0].value +
            jsonData.children[0].children[0].children[1].value +
            jsonData.children[0].children[0].children[2].value,
          severe: jsonData.children[0].children[0].children[0].value,
          moderate: jsonData.children[0].children[0].children[1].value,
          light: jsonData.children[0].children[0].children[2].value,
          // home: jsonData.children[0].children[0].children[3].value,
          home: 0,
          hotel: jsonData.children[0].children[0].children[4].value,
          // recovered: jsonData.children[0].children[1].value,
          recovered: 0,
          death: jsonData.children[0].children[2].value,
          // other: jsonData.children[0].children[3].value,
          other: 0,
        }

        return res('summary')
      }
    )
  })

  const test_people = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_test_people.csv'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const overridesMap: Csv2jsonTypes.overrides_map = {
          実施_年月日: { header: 'date', type: 'date' },
          全国地方公共団体コード: { header: 'government_code', type: 'string' },
          都道府県名: { header: 'prefecture', type: 'string' },
          市区町村名: { header: 'city', type: 'string' },
          検査実施_人数: { header: 'value', type: 'number' },
        }

        const jsonData: DataTypes.test_people[] = JSON.parse(
          csv2json(filecontent, overridesMap)
        )

        ret.test_people = ({ before, after, first, last }) =>
          PaginationFn(
            jsonData,
            str2date(LastUpdate.test_people),
            before,
            after,
            first,
            last
          )

        return res('test_people')
      }
    )
  })

  const vaccination = new Promise((res, rej) => {
    readFile(
      resolve(opendataBasepath, '080004_ibaraki_covid19_vaccination.json'),
      (err, data) => {
        if (err) return rej(err)

        const filecontent = data.toString()
        const jsonData: DataTypes.vaccination_raw[] = JSON.parse(filecontent)

        const resData: DataTypes.vaccination[] = jsonData.map((item) => ({
          date: str2date(item.date),
          government_code: '080004',
          prefecture: '茨城県',
          city: '',
          total: item.count,
          first: item.status_1,
          second: item.status_2,
          third: item.status_3,
          fourth: item.status_4,
        }))

        ret.vaccination = ({ before, after, first, last }) =>
          PaginationFn(
            resData,
            str2date(LastUpdate.lastUpdate),
            before,
            after,
            first,
            last
          )

        return res('vaccination')
      }
    )
  })

  return Promise.all([
    call_center,
    corona_next,
    death_attributes,
    death_number,
    inspections_summary,
    mutant_positive_number,
    mutant_test_people,
    patients,
    positive_number,
    recovered_number,
    summary,
    test_people,
    vaccination,
  ]).then(() => ret)
}

export default { getData }
