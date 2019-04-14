import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface Chain {
  title: string
}

interface RootState {
  chains: { [key: string]: Chain }
  requests: { [key: string]: 'requestMade' | 'requestDone' }
}

export default new Vuex.Store<RootState>({
  state: {
    chains: {},
    requests: {}
  },
  mutations: {
    setRequest(state, { chainId, status }) {
      state.requests[chainId] = status
    },

    setChainData(state, { chainId, chainBody }) {
      const chain = {
        title: chainBody.title
      }

      Vue.set(state.chains, chainId, chain)
    }
  },
  actions: {
    async timeout(_context, tm): Promise<boolean> {
      return new Promise((resolve, _reject) => {
        setTimeout(() => {
          resolve(true)
        }, tm)
      })
    },

    async fetchChain(context, { chainId }): Promise<null> {
      const { state, dispatch, commit } = context
      if (state.requests[chainId]) {
        return null
      }

      commit('setRequest', { chainId, status: 'requestMade' })

      await dispatch('timeout', 1500)

      // const url = `/api/v0/getChain/${chainId}`
      // const response = await fetch(url)
      // const chainBody = response.json()
      const chainBody = {
        title: 'Chickesdsdn',
        description: 'This is a chicken!'
      }

      commit('setRequest', { chainId, status: 'requestDone' })
      commit('setChainData', { chainId, chainBody })
      return null
    }
  }
})
