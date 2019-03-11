<template lang="pug">
  #app
    tab-bar(:sites="sites", v-on:tab-change="onTabChange")
    .summary
      overall-stats-tab(:activeSite="activeSite")
    .sites-container
      site-table(:activeSite="activeSite")
</template>

<script>
import TabBar from './components/TabBar.vue'
import OverallStatsTab from './components/OverallStatsTab.vue'
import SiteTable from './components/SiteTable.vue'

const TableScout = require('./appModules/TableScout')
const Scout = new TableScout()

function resizeTiles() {
  let layouts = document.querySelectorAll('.active-masonry-layout')
  let tiles = document.querySelectorAll('.masonry-item')
  
  layouts.forEach(layout => {
    layout.classList.remove('active-masonry-layout')
    layout.classList.add('masonry-layout')
  })

  tiles.forEach(tile => {
    let rects = tile.getBoundingClientRect()
    let rows_count = Math.ceil(rects.height/20);
    tile.style.gridRowEnd = `span ${rows_count}`
  })
  
  layouts = document.querySelectorAll('.masonry-layout')
  layouts.forEach(layout => {
    layout.classList.remove('masonry-layout')
    layout.classList.add('active-masonry-layout')
  })
}

export default {
  components: {TabBar, OverallStatsTab, SiteTable},
  name: 'app',
  data () {
    return {
      sites: Scout.getUniqueDataValues('site'),
      activeSite: 'Overall'
    }
  },
  methods: {
    onTabChange: function(site) {
      this.activeSite = site
    }
  },
  mounted() {
    resizeTiles()
  },
  updated() {
    resizeTiles()
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
  overflow-y: scroll;
}

.summary,
.sites-container {
  padding: 1em;
}

</style>
