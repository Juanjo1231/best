<template lang="pug">
  .skill-container
    h4 Disney General
    .state-container(v-for="state in states")
      h4 {{ state.name }}
      .agent-row(v-for="agent in state.agents", :title="agent.name")
        .id {{ agent.id }}
        .name {{ agent.name }}
        .time {{ agent.time | timeToString }}
      
      
</template>

<script>
export default {
  data() {
    return {
      states: [
        {
          name: 'ACD',
          limit: 1000,
          agents: [
            {id: 12345, name: 'Agent Very Long Name 1', time: 120000},
            {id: 74674, name: 'Agent Name 2', time: 3720000},
            {id: 24738, name: 'Agent Name 3', time: 12345}
          ]
        }
      ]
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
