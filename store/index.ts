import { GetterTree, MutationTree } from 'vuex'

export const state = () => ({
  darkmode: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  darkmode: (state) => state.darkmode,
}

export const mutations: MutationTree<RootState> = {
  setdarkmode(state, darkmode) {
    state.darkmode = darkmode
  },
}
