<template lang="pug">
  .site-container
    h4 {{ activeSite }}
    .skills-container
      skill-table
</template>

<script>
import SkillTable from './SkillTable.vue'

export default {
  components: {SkillTable},
  props: {
    activeSite: String
  }
}
</script>

<style lang="scss" scoped>
h4 {
  border-width: 1px 0;
  border-style: solid;
  border-color: #ccc;
  padding: 0.5em;
}
</style>

