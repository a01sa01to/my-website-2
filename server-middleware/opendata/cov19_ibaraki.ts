import fs from 'fs'
import path from 'path'
import csv2json from './functions/csv2json'
import { PaginationArg, PaginationFn } from './functions/pagination'
import str2date from './functions/str2date'

const opendataBasepath = path.join(
  __dirname,
  '..',
  '..',
  'static',
  'opendata',
  'api',
  'raw',
  'covid19_ibaraki'
)

type LastUpdateType = {
  lastUpdate: string
  patients: string
  test_people: string
  mutant_test_people: string
  call_center: string
  mutant_positive: string
  positive_number: string
  recovered_number: string
  death_number: string
  death_attr: string
  inspections_summary: string
  main_summary: string
  corona_next: string
}

const getData = () => {
  const LastUpdate: LastUpdateType = JSON.parse(
    fs
      .readFileSync(path.resolve(opendataBasepath, 'last_update.json'))
      .toString()
  )

  const ret: { [key: string]: any } = {}
  {
    // call_center
    const filecontent = fs
      .readFileSync(
        path.resolve(opendataBasepath, '080004_ibaraki_covid19_call_center.csv')
      )
      .toString()
    const overridesMap = {
      受付_年月日: { header: 'date', type: 'date' },
      全国地方公共団体コード: { header: 'government_code', type: 'string' },
      都道府県名: { header: 'prefecture', type: 'string' },
      市区町村名: { header: 'city', type: 'string' },
      相談件数: { header: 'value', type: 'number' },
    }

    const jsonData = JSON.parse(csv2json(filecontent, overridesMap))
    ret.call_center = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.call_center),
        before,
        after,
        first,
        last
      )
  }
  {
    // corona_next
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_corona_next.json'
        )
      )
      .toString()
    const jsonData: { [key: string]: string | number | null } =
      JSON.parse(filecontent)
    jsonData.move_date = str2date(jsonData.moveDate as string)
    delete jsonData.moveDate

    jsonData.last_update = str2date(LastUpdate.corona_next)
    ret.corona_next = jsonData
  }
  {
    // death_attributes
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_death_attributes.csv'
        )
      )
      .toString()
    const overridesMap = {
      No: { header: 'no', type: 'number' },
      全国地方公共団体コード: { header: 'government_code', type: 'string' },
      都道府県名: { header: 'prefecture', type: 'string' },
      市区町村名: { header: 'city', type: 'string' },
      公表_年月日: { header: 'date', type: 'date' },
      年代: { header: 'age', type: 'string' },
      性別: { header: 'gender', type: 'string' },
    }
    const jsonData = JSON.parse(csv2json(filecontent, overridesMap))
    ret.death_attributes = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.death_attr),
        before,
        after,
        first,
        last
      )
  }
  {
    // death_number
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_death_number.csv'
        )
      )
      .toString()
    const overridesMap = {
      公表_年月日: { header: 'date', type: 'date' },
      全国地方公共団体コード: { header: 'government_code', type: 'string' },
      都道府県名: { header: 'prefecture', type: 'string' },
      市区町村名: { header: 'city', type: 'string' },
      死亡者数: { header: 'value', type: 'number' },
    }

    const jsonData = JSON.parse(csv2json(filecontent, overridesMap))
    ret.death_number = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.death_number),
        before,
        after,
        first,
        last
      )
  }
  {
    // inspections_summary
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_inspections_summary.json'
        )
      )
      .toString()
    const jsonData = JSON.parse(filecontent)
    jsonData.data_date = str2date(jsonData.updDate as string)
    delete jsonData.updDate
    jsonData.last_update = str2date(LastUpdate.inspections_summary)
    ret.inspections_summary = jsonData
  }
  {
    // mutant_positive_number
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_mutant_positive_number.json'
        )
      )
      .toString()
    let jsonData = JSON.parse(filecontent)
    jsonData = jsonData.map((item: any) => ({
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
    }))
    ret.mutant_positive_number = ({
      before,
      after,
      first,
      last,
    }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.mutant_positive),
        before,
        after,
        first,
        last
      )
  }
  {
    // mutant_test_people
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_mutant_test_people.csv'
        )
      )
      .toString()
    const overridesMap = {
      '実施_年月日 FROM': { header: 'date_from', type: 'date' },
      '実施_年月日 TO': { header: 'date_to', type: 'date' },
      全国地方公共団体コード: { header: 'government_code', type: 'string' },
      都道府県名: { header: 'prefecture', type: 'string' },
      市区町村名: { header: 'city', type: 'string' },
      検査実施_人数: { header: 'tested', type: 'number' },
      陽性者数: { header: 'positive', type: 'number' },
      変異株名: { header: 'strain_name', type: 'string' },
    }

    const jsonData = JSON.parse(csv2json(filecontent, overridesMap))
    ret.mutant_test_people = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.mutant_test_people),
        before,
        after,
        first,
        last
      )
  }
  {
    // patients
    const filecontent = fs
      .readFileSync(
        path.resolve(opendataBasepath, '080004_ibaraki_covid19_patients.csv')
      )
      .toString()
    const overridesMap = {
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

    const jsonData = JSON.parse(csv2json(filecontent, overridesMap))
    ret.patients = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.patients),
        before,
        after,
        first,
        last
      )
  }
  {
    // positive_number
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_positive_number.csv'
        )
      )
      .toString()
    const overridesMap = {
      公表_年月日: { header: 'date', type: 'date' },
      全国地方公共団体コード: { header: 'government_code', type: 'string' },
      都道府県名: { header: 'prefecture', type: 'string' },
      市区町村名: { header: 'city', type: 'string' },
      陽性者数: { header: 'positive', type: 'number' },
      うち濃厚接触者: { header: 'close_contact', type: 'number' },
    }

    const jsonData = JSON.parse(csv2json(filecontent, overridesMap))
    ret.positive_number = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.positive_number),
        before,
        after,
        first,
        last
      )
  }
  {
    // recovered_number
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_recovered_number.csv'
        )
      )
      .toString()
    const overridesMap = {
      公表_年月日: { header: 'date', type: 'date' },
      全国地方公共団体コード: { header: 'government_code', type: 'string' },
      都道府県名: { header: 'prefecture', type: 'string' },
      市区町村名: { header: 'city', type: 'string' },
      回復者数: { header: 'value', type: 'number' },
    }

    const jsonData = JSON.parse(csv2json(filecontent, overridesMap))
    ret.recovered_number = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.recovered_number),
        before,
        after,
        first,
        last
      )
  }
  {
    // summary
    const filecontent = fs
      .readFileSync(
        path.resolve(opendataBasepath, '080004_ibaraki_covid19_summary.json')
      )
      .toString()
    const jsonData = JSON.parse(filecontent)
    ret.summary = () => ({
      last_update: str2date(LastUpdate.lastUpdate),
      total: jsonData.children[0].value,
      care: jsonData.children[0].children[0].value,
      hospitalized:
        jsonData.children[0].children[0].children[0].value +
        jsonData.children[0].children[0].children[1].value +
        jsonData.children[0].children[0].children[2].value,
      severe: jsonData.children[0].children[0].children[0].value,
      moderate: jsonData.children[0].children[0].children[1].value,
      light: jsonData.children[0].children[0].children[2].value,
      home: jsonData.children[0].children[0].children[3].value,
      hotel: jsonData.children[0].children[0].children[4].value,
      recovered: jsonData.children[0].children[1].value,
      death: jsonData.children[0].children[2].value,
      other: jsonData.children[0].children[3].value,
    })
  }
  {
    // test_people
    const filecontent = fs
      .readFileSync(
        path.resolve(opendataBasepath, '080004_ibaraki_covid19_test_people.csv')
      )
      .toString()
    const overridesMap = {
      実施_年月日: { header: 'date', type: 'date' },
      全国地方公共団体コード: { header: 'government_code', type: 'string' },
      都道府県名: { header: 'prefecture', type: 'string' },
      市区町村名: { header: 'city', type: 'string' },
      検査実施_人数: { header: 'value', type: 'number' },
    }

    const jsonData = JSON.parse(csv2json(filecontent, overridesMap))
    ret.test_people = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.test_people),
        before,
        after,
        first,
        last
      )
  }
  {
    // vaccination
    const filecontent = fs
      .readFileSync(
        path.resolve(
          opendataBasepath,
          '080004_ibaraki_covid19_vaccination.json'
        )
      )
      .toString()
    let jsonData = JSON.parse(filecontent)
    jsonData = jsonData.map(
      (item: {
        date: string
        count: number
        status_1: number
        status_2: number
        status_3: number
      }) => ({
        date: str2date(item.date),
        government_code: '080004',
        prefecture: '茨城県',
        city: '',
        total: item.count,
        first: item.status_1,
        second: item.status_2,
        third: item.status_3,
      })
    )

    ret.vaccination = ({ before, after, first, last }: PaginationArg) =>
      PaginationFn(
        jsonData,
        str2date(LastUpdate.lastUpdate),
        before,
        after,
        first,
        last
      )
  }
  return ret
}

export default { getData }
