<template lang="pug">
  .skill-container
    h4 {{ skillName }}
    .state-container(v-for="state in states", v-show="getAgentsByState(skillName, state).length > 0")
      h4 {{ state }}
      .agent-row(v-for="agent in getAgentsByState(skillName, state)", :title="agent.name")
        .id {{ agent.id }}
        .name {{ agent.name }}
        .time {{ agent.time | timeToString }}
      
      
</template>

<script>
const TableScout = require('../appModules/TableScout')
const Scout = new TableScout()

export default {
  props: {
    skillName: String,
    agents: Array
  },
  computed: {
    states: function() {
      return Scout.getUniqueDataValues('state')
    }
  },
  methods: {
    getAgentsByState: function(skill, state) {
      return Scout.getDataRowsBy({skill, state}, this.agents)
    }
  }
}
</script>


<style lang="scss" scoped>
h4 {
  margin: 0;
  padding: 0.5em;
  border-bottom: 1px solid #ccc;
}
.skill-container
 {
  border: 1px solid #ccc;
  display: inline-block;
  h4 {
    font-size: 14px;
  }
}

.state-container h4 {
  font-size: 12px;
  margin: 0;
  padding: 0.5em;
  border-bottom: 1px solid #ccc;
}

.agent-row {
  display: grid;
  font-size: 14px;
  width: 18em;
  grid-template-columns: 3.8em 1fr 4em;

  div {
    padding: 0.3em;
  }

  .name {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .time {
    text-align: right;
  }
}
</style>
