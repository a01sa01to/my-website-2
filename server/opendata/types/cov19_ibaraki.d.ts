import { Pagination } from './pagination'

export type last_update = {
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

export type call_center = {
  date: string
  government_code: string
  prefecture: string
  city: string | null
  value: number
}

export type corona_next_raw = {
  stage: number
  moveDate: string
  severe: number
  sickbed: number
  care_rate: number
  new_patients: number
  non_closecontact: number
  care: number
  positive_rate: number
  severe_lastweek: number
  sickbed_lastweek: number
  care_rate_lastweek: number
  new_patients_lastweek: number
  non_closecontact_lastweek: number
  care_lastweek: number
  positive_rate_lastweek: number
}

export type corona_next = {
  last_update: string
  stage: number
  move_date: string
  severe: number
  sickbed: number
  care_rate: number
  new_patients: number
  non_closecontact: number
  care: number
  positive_rate: number
  severe_lastweek: number
  sickbed_lastweek: number
  care_rate_lastweek: number
  new_patients_lastweek: number
  non_closecontact_lastweek: number
  care_lastweek: number
  positive_rate_lastweek: number
}

export type death_attributes = {
  no: number
  government_code: string
  prefecture: string
  city: string | null
  date: string
  age: string
  gender: string
}

export type death_number = {
  date: string
  government_code: string
  prefecture: string
  city: string
  value: number
}

export type inspections_summary_raw = {
  updDate: string
  datasets: {
    label: string
    data: number
  }[]
}

export type inspections_summary = {
  last_update: string
  data_date: string
  datasets: {
    label: string
    data: number
  }[]
}

export type mutant_positive_number_raw = {
  公表_年月日: string
  全国地方公共団体コード: string
  都道府県名: string
  市区町村名: string | null
  変異株陽性者数: number
  年代別: {
    '20代以下': number
    '30代': number
    '40代': number
    '50代': number
    '60代': number
    '70代': number
    '80代': number
    '90代': number
    '100歳以上': number
    不明: number
  }
  性別: {
    男性: number
    女性: number
    不明: number
  }
  変異株名: string
}

export type mutant_positive_number = {
  date: string
  government_code: string
  prefecture: string
  city: string | null
  total: number
  strain_name: string
  by_age: {
    under_twenties: number
    thirties: number
    fourties: number
    fifties: number
    sixties: number
    seventies: number
    eighties: number
    nineties: number
    over_hundred: number
    unknown: number
  }
  by_gender: {
    male: number
    female: number
    unknown: number
  }
}

export type mutant_test_people = {
  date_from: string
  date_to: string
  government_code: string
  prefecture: string
  city: string | null
  tested: number
  positive: number
  strain_name: string
}

export type patients = {
  no: number
  government_code: string
  prefecture: string
  city: string | null
  publish_date: string
  onset_date: string | null
  address: string
  age: string
  gender: string
  occupation: string | null
  status: string | null
  symptoms: string | null
  travel_abroad_history: boolean
  close_contact: boolean
  test_method: string
  note: string
}

export type positive_number = {
  date: string
  government_code: string
  prefecture: string
  city: string | null
  positive: number
  close_contact: number
}

export type recovered_number = {
  date: string
  government_code: string
  prefecture: string
  city: string | null
  value: number
}

export type summary_raw = {
  children: {
    attr: string
    value: number
    children: {
      attr: string
      value: number
      children: {
        attr: string
        value: number
      }[]
    }[]
  }[]
}

export type summary = {
  last_update: string
  total: number
  care: number
  hospitalized: number
  severe: number
  moderate: number
  light: number
  home: number
  hotel: number
  recovered: number
  death: number
  other: number
}

export type test_people = {
  date: string
  government_code: string
  prefecture: string
  city: string | null
  value: number
}

export type vaccination_raw = {
  date: string
  count: number
  status_1: number
  status_2: number
  status_3: number
}

export type vaccination = {
  date: string
  government_code: string
  prefecture: string
  city: string | null
  total: number
  first: number
  second: number
  third: number
}

export type all_data = {
  call_center: Pagination<call_center>
  corona_next: corona_next
  death_attributes: Pagination<death_attributes>
  death_number: Pagination<death_number>
  inspections_summary: inspections_summary
  mutant_positive_number: Pagination<mutant_positive_number>
  mutant_test_people: Pagination<mutant_test_people>
  patients: Pagination<patients>
  positive_number: Pagination<positive_number>
  recovered_number: Pagination<recovered_number>
  summary: summary
  test_people: Pagination<test_people>
  vaccination: Pagination<vaccination>
}
