const state = {
  alerts: [],
}

const mutations = {
  NEW_ALERT(state, alert) {
    state.alerts.push(alert)
  },
  REMOVE_ALERT(state, alert) {
    let index = state.alerts.indexOf(alert)    
    state.alerts.splice(index, 1)    
  },
}

const getters = {
  alerts: state => {
    return state.alerts.slice().reverse()
  }
}

const actions = {
  alert({commit}, alert ) {
    // dispatched in dashboard component
    commit('NEW_ALERT', alert)

    setTimeout(()=> {
      // auto remove alert after 3 seconds
      commit('REMOVE_ALERT', alert)
    }, 4000)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
