<template lang="pug">
  table
    thead
      tr
        td
        th(colspan=7) Overall Stats
        th(colspan=6) {{ activeSite }} Stats
      tr
        th(v-for="header in headers") {{ header }}
    tbody
      tr(v-for="stat in stats")
        td(v-for="field in stat") {{ field }}
</template>

<script>
export default {
  props: {
    stats: Array,
    activeSite: String
  },
  data () {
    return {
      headers: [
        'Skill Name',
        'Calls in Queue',
        'Answered',
        'Abandons',
        'Oldest Call',
        'Max Delay',
        'Avg. Answer Speed',
        'Service Level',
        'Skilled',
        'Available',
        'ACW',
        'ACD',
        'AUX',
        'Ohter'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  font-size: 12px;
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 0.3em 0.5em;
    text-align: center;
    border: 1px solid #ccc;
  }

  tr th:first-child,
  tr td:first-child {
    text-align: left;
  }

  tr td:first-child {
    color: #00578e;
  }
}
</style>

