<template>
  <div class="h-100" id="wrapper">
    <action-bar></action-bar>

    <div class="h-100 d-flex flex-column">
      <player-space style="max-height: 50%;" class="flex-fill"></player-space>
      <group-space style="max-height: 50%;" class="flex-fill"></group-space>
    </div>
  </div>
</template>

<script>
  import ActionBar from '../../components/hub/action-bar'
  import PlayerSpace from '../../components/hub/player-space'
  import GroupSpace from '../../components/hub/group-space'
  import Player from '../../components/hub/player'


  export default {
    name: 'hub',
    components: {ActionBar, PlayerSpace, GroupSpace, Player}
  }
</script>

<style scoped>
</style>
