<template>
  <div>
    <h1>Covid19 Ibaraki Updater</h1>
    <b-breadcrumb>
      <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
      <b-breadcrumb-item to="/admin/">Admin Home</b-breadcrumb-item>
      <b-breadcrumb-item active>Covid19-ibk</b-breadcrumb-item>
    </b-breadcrumb>
    <hr />
    <h2>Pref</h2>
    <b-row>
      <b-col>
        <h3>市町村別</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>New</th>
            <th>Close</th>
          </tr>
          <tr v-for="(val, key) in Data_Pref.municipality">
            <td>{{ key }}</td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Pref.municipality[key][0]"
              />
            </td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Pref.municipality[key][1]"
              />
            </td>
          </tr>
        </table>
      </b-col>
      <b-col>
        <h3>男女別</h3>
        <table>
          <tr>
            <th>Gender</th>
            <th>Value</th>
          </tr>
          <tr v-for="(val, key) in Data_Pref.gender">
            <td>{{ key }}</td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Pref.gender[key]"
              />
            </td>
          </tr>
        </table>
        <br />
        <h3>年齢別</h3>
        <table>
          <tr>
            <th>Age</th>
            <th>Value</th>
          </tr>
          <tr v-for="(val, key) in Data_Pref.age">
            <td>{{ key }}</td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Pref.age[key]"
              />
            </td>
          </tr>
        </table>
        <br />
        <h3>職業別</h3>
        <table>
          <tr>
            <th>Occupation</th>
            <th>Value</th>
          </tr>
          <tr v-for="(val, key) in Data_Pref.occupation">
            <td>{{ key }}</td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Pref.occupation[key]"
              />
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
    <hr />
    <h2>Mito</h2>
    <b-row>
      <b-col>
        <h3>市町村別</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>New</th>
            <th>Close</th>
          </tr>
          <tr v-for="(val, key) in Data_Mito.municipality">
            <td>{{ key }}</td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Mito.municipality[key][0]"
              />
            </td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Mito.municipality[key][1]"
              />
            </td>
          </tr>
        </table>
      </b-col>
      <b-col>
        <h3>男女別</h3>
        <table>
          <tr>
            <th>Gender</th>
            <th>Value</th>
          </tr>
          <tr v-for="(val, key) in Data_Mito.gender">
            <td>{{ key }}</td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Mito.gender[key]"
              />
            </td>
          </tr>
        </table>
        <br />
        <h3>年齢別</h3>
        <table>
          <tr>
            <th>Age</th>
            <th>Value</th>
          </tr>
          <tr v-for="(val, key) in Data_Mito.age">
            <td>{{ key }}</td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Mito.age[key]"
              />
            </td>
          </tr>
        </table>
        <br />
        <h3>職業別</h3>
        <table>
          <tr>
            <th>Occupation</th>
            <th>Value</th>
          </tr>
          <tr v-for="(val, key) in Data_Mito.occupation">
            <td>{{ key }}</td>
            <td>
              <b-form-input
                @change="output"
                type="number"
                size="sm"
                number
                v-model="Data_Mito.occupation[key]"
              />
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>
    <hr />
    <h2>Output</h2>
    <b-form-textarea :value="output()" readonly />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IbarakiMunicipalities from '~/assets/ibaraki-municipalities.json'

type data_type = {
  municipality: { [key: string]: number[] }
  gender: { [key: string]: number }
  age: { [key: string]: number }
  occupation: { [key: string]: number }
}

export default Vue.extend({
  head: {
    title: 'Covid19 Ibaraki Updater',
  },
  middleware: 'auth',
  data() {
    const gender = ['男性', '女性']
    const age = [
      '10歳未満',
      '10代',
      '20代',
      '30代',
      '40代',
      '50代',
      '60代',
      '70代',
      '80代',
      '90代',
      '100歳以上',
    ]
    const occupation = [
      '会社員',
      '公務員',
      '教職員',
      '医療従事者',
      '団体職員',
      '自営業',
      'パート',
      'アルバイト',
      '技能実習生',
      '無職',
      '学生',
      '生徒',
      '児童',
      '未就学児',
      'その他',
      '確認中',
    ]

    let Data_Pref = {
      municipality: {},
      gender: {},
      age: {},
      occupation: {},
    } as data_type
    let Data_Mito = {
      municipality: {},
      gender: {},
      age: {},
      occupation: {},
    } as data_type

    IbarakiMunicipalities.forEach((municipality) => {
      Data_Pref.municipality[municipality] = [0, 0]
      Data_Mito.municipality[municipality] = [0, 0]
    })
    gender.forEach((g) => {
      Data_Pref.gender[g] = 0
      Data_Mito.gender[g] = 0
    })
    age.forEach((a) => {
      Data_Pref.age[a] = 0
      Data_Mito.age[a] = 0
    })
    occupation.forEach((o) => {
      Data_Pref.occupation[o] = 0
      Data_Mito.occupation[o] = 0
    })

    return {
      isDarkmode: this.$store.state.darkmode,
      Data_Pref,
      Data_Mito,
    }
  },
  methods: {
    output() {
      const data = [] as string[][]
      const data_mito = [] as string[][]
      const occupation_sort = [
        '未就学児',
        '児童',
        '生徒',
        '学生',
        '技能実習生',
        'アルバイト',
        'パート',
        '自営業',
        '団体職員',
        '医療従事者',
        '教職員',
        '公務員',
        '会社員',
        '無職',
        'その他',
        '確認中',
      ]

      const occupation_pref = {} as { [key: string]: number }
      const occupation_mito = {} as { [key: string]: number }
      occupation_sort.forEach((_) => {
        occupation_pref[_] = this.Data_Pref.occupation[_]
        occupation_mito[_] = this.Data_Mito.occupation[_]
      })
      occupation_pref['学生'] =
        occupation_pref['学生'] +
        occupation_pref['生徒'] +
        occupation_pref['児童']
      occupation_mito['学生'] =
        occupation_mito['学生'] +
        occupation_mito['生徒'] +
        occupation_mito['児童']
      delete occupation_pref['生徒']
      delete occupation_pref['児童']
      delete occupation_mito['生徒']
      delete occupation_mito['児童']

      // Pref
      {
        Object.keys(this.Data_Pref.municipality).forEach((key) => {
          const val = this.Data_Pref.municipality[key]
          for (let i = 0; i < val[0]; ++i) {
            data.push([
              '',
              key,
              '',
              '',
              '',
              '',
              '',
              '',
              '0',
              '',
              '年代・性別・職業が異なっている可能性あり',
            ])
          }
          for (let i = 0; i < val[1]; ++i) {
            data.push([
              '',
              key,
              '',
              '',
              '',
              '',
              '',
              '',
              '1',
              '',
              '年代・性別・職業が異なっている可能性あり',
            ])
          }
        })
        let idx = 0
        Object.keys(this.Data_Pref.age).forEach((key) => {
          const val = this.Data_Pref.age[key]
          for (let i = 0; i < val; ++i) {
            data[idx][2] = key
            ++idx
          }
        })
        idx = 0
        Object.keys(this.Data_Pref.gender).forEach((key) => {
          const val = this.Data_Pref.gender[key]
          for (let i = 0; i < val; ++i) {
            data[idx][3] = key
            ++idx
          }
        })
        idx = 0
        Object.keys(occupation_pref).forEach((key) => {
          const val = occupation_pref[key]
          for (let i = 0; i < val; ++i) {
            data[idx][4] = key === '確認中' ? '' : key
            ++idx
          }
        })
      }
      // Mito
      {
        Object.keys(this.Data_Mito.municipality).forEach((key) => {
          const val = this.Data_Mito.municipality[key]
          for (let i = 0; i < val[0]; ++i) {
            data_mito.push([
              '',
              key,
              '',
              '',
              '',
              '',
              '',
              '',
              '0',
              '',
              '年代・性別・職業が異なっている可能性あり',
            ])
          }
          for (let i = 0; i < val[1]; ++i) {
            data_mito.push([
              '',
              key,
              '',
              '',
              '',
              '',
              '',
              '',
              '1',
              '',
              '年代・性別・職業が異なっている可能性あり',
            ])
          }
        })
        let idx = 0
        Object.keys(this.Data_Mito.age).forEach((key) => {
          const val = this.Data_Mito.age[key]
          for (let i = 0; i < val; ++i) {
            data_mito[idx][2] = key
            ++idx
          }
        })
        idx = 0
        Object.keys(this.Data_Mito.gender).forEach((key) => {
          const val = this.Data_Mito.gender[key]
          for (let i = 0; i < val; ++i) {
            data_mito[idx][3] = key
            ++idx
          }
        })
        idx = 0
        Object.keys(occupation_mito).forEach((key) => {
          const val = occupation_mito[key]
          for (let i = 0; i < val; ++i) {
            data_mito[idx][4] = key === '確認中' ? '' : key
            ++idx
          }
        })
      }
      return data
        .concat(data_mito)
        .map((_) => _.join('\t'))
        .join('\n')
    },
  },
})
</script>

<style lang="scss" scoped>
input {
  width: 4rem;
}
table {
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #aaa;
    padding: 0.5rem;
    text-align: center;
  }
}
</style>
