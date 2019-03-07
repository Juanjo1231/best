<template lang="pug">
  .tabs-container
    .tab.active(@click="activateTab($event, 'Overall')") Overall
    .tab(v-for="site in sites", @click="activateTab($event, site)") {{ site }}
</template>

<script>
export default {
  props: {
    sites: Array
  },
  methods: {
    activateTab: function (ev, val) {
      if(ev.target.classList.contains('active')) return

      let current_active = document.querySelector('.tab.active')
      current_active.classList.remove('active')
      ev.target.classList.add('active')

      this.$emit('tab-change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin user-select($prop) {
  -webkit-user-select: $prop;
  -moz-user-select: $prop;
  -ms-user-select: $prop;
  user-select: $prop;
}

.tabs-container {
  width: 100%;
  border: 1px solid #ccc;
  padding: 0 1em;
  padding-top: 0.5em;
  display: flex;
  background: #eee;
}
.tab {
  padding: 0.5em 1em 0.2em 1em;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  margin: 0 0.1em;
  margin-bottom: -1px;
  cursor: pointer;
  transition: 200ms;
  @include user-select(none);

  &:hover {
    background-color: #ddd;
  }

  &.active {
    background-color: white;
    border-bottom-color: white;
  }
}

</style>
