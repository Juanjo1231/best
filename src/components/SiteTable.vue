<template lang="pug">
  .site-container
    h4 {{ activeSite }}
    .skills-container.masonry-layout
      skill-table.masonry-item(v-for="skill in skills", :skillName="skill", :agents="agents", :key="i")

</template>

<script>
import SkillTable from './SkillTable.vue'

export default {
  components: {SkillTable},
  props: {
    activeSite: String
  },
  computed: {
    agents: function() {
      return this.$store.getters.getSiteAgents
    },
    skills: function() {
      return this.$store.getters.getSiteSkills
    }
  }
}
</script>

<style lang="scss" scoped>
.site-container {
  background: #eee;
}
h4 {
  border-width: 1px 0;
  border-style: solid;
  border-color: #ccc;
  padding: 0.5em;
  background: white;
}
.active-masonry-layout {
  padding: 0.5em;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-gap: 0.5em;
}
</style>
