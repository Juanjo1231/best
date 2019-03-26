import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import TableScout from './appModules/TableScout'

const Scout = new TableScout()

Vue.use(Vuex)

Vue.filter('timeToString', function (value) {
  if(value.constructor != Number) return value

  let hh     = Math.floor( value / 3600000 )
  let hh_mod = value % 3600000
  let mm     = Math.floor( hh_mod / 60000 )
  let mm_mod = hh_mod % 60000
  let ss     = Math.floor( mm_mod / 1000 )
  
  mm = mm < 10 ? `0${mm}` : mm
  ss = ss < 10 ? `0${ss}` : ss

  return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
})

const store = new Vuex.Store({
  state: {
    activeSite: 'Overall',
    sites: Scout.getUniqueDataValues('site'),
    agents: Scout.getDataRowsBy(),
    sumaryData: Scout.getSummaryRowsBy()
  },
  mutations: {
    changeSite (state, site) {
      let filter = site === 'Overall' ? null : {site}
      state.activeSite = site
      state.agents = Scout.getDataRowsBy(filter)
    },
    updateStats (state) {
      let filter = state.activeSite === 'Overall' ? null : {site: state.activeSite}
      Scout.getRows({data: 'time'})
      state.sites  = Scout.getUniqueDataValues('site')
      state.agents = Scout.getDataRowsBy(filter)
      state.sumaryData = Scout.getSummaryRowsBy()
    }
  },
  getters: {
    getSiteAgents: state => {
      let filter = state.activeSite === 'Overall' ? null : {site: state.activeSite}
      return Scout.getDataRowsBy(filter, state.agents)
    },
    getSiteSkills: state => {
      return Scout.getUniqueDataValues('skill', state.agents)
    },
    getSiteStates: state => {
      return Scout.getUniqueDataValues('state', state.agents)
    },
    getAgentsBySkillByState: (state) => (skill, _state) => {
      return Scout.getDataRowsBy({skill, state: _state}, state.agents)
    },
    getSummaryRowsBySite: state => {
      return Scout.getSummaryRowsBy()
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
