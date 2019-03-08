<template lang="pug">
  #app
    tab-bar(:sites="sites", v-on:tab-change="onTabChange")
    .summary
      overall-stats-tab(:stats="overallStats", :activeSite="activeSite")
    .sites-container
      site-table(:activeSite="activeSite")
</template>

<script>
import TabBar from './components/TabBar.vue'
import OverallStatsTab from './components/OverallStatsTab.vue'
import SiteTable from './components/SiteTable.vue'

const Scout = require('./appModules/TableScout')

let overallStats = [
  {
    skill: 'Dominion',
    callsInQueue: 0,
    answered: 0,
    abandons: 0,
    oldestCall: '0:00:00',
    maxDelay: '0:00:00',
    avgAnswerSpeed: '00:00',
    serviceLevel: '99.00%',
    skilled: 0,
    available: 0,
    acw: 0,
    acd: 0,
    aux: 0,
    other: 0
  },
  {
    skill: 'Disney General',
    callsInQueue: 0,
    answered: 0,
    abandons: 0,
    oldestCall: '0:00:00',
    maxDelay: '0:00:00',
    avgAnswerSpeed: '00:00',
    serviceLevel: '99.00%',
    skilled: 0,
    available: 0,
    acw: 0,
    acd: 0,
    aux: 0,
    other: 0
  },
  {
    skill: 'Tampa Escalations',
    callsInQueue: 0,
    answered: 0,
    abandons: 0,
    oldestCall: '0:00:00',
    maxDelay: '0:00:00',
    avgAnswerSpeed: '00:00',
    serviceLevel: '99.00%',
    skilled: 0,
    available: 0,
    acw: 0,
    acd: 0,
    aux: 0,
    other: 0
  }
]

export default {
  components: {TabBar, OverallStatsTab, SiteTable},
  name: 'app',
  data () {
    return {
      sites: ['Tampa', 'Denver', 'Glendale'],//Scout.getSites(),
      activeSite: 'Overall',
      overallStats
    }
  },
  methods: {
    onTabChange: function(site) {
      this.activeSite = site
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: white;
}

.summary,
.sites-container {
  padding: 1em;
}

</style>
