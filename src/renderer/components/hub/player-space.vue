<template>
  <div class="p-2 d-flex flex-wrap align-items-start justify-content-center shadow-sm" id="player-space">
		<player v-for="player in players" :player="player"></player>
  </div>
</template>

<script>
	import player from './player'

  export default {
    name: 'player-space',
		components: {
			player
		},
		props: ['players']
  }
</script>

<style scoped>
	#player-space {
		overflow-x: hidden;
		overflow-y: auto;
		border-width: 3px !important;
	}
</style>
