<template>
	<div class="m-2 flex-column flex-fill text-white bg-primary rounded group"  :class="{'d-none': group.players.length == 0, ' d-flex': group.players.length > 0}">
		<div class="card-header text-center"><b> {{ 'Group ' + (index == undefined ? group.id : index + 1) }} </b></div>

		<div class="m-1 d-flex flex-column flex-fill border rounded players">
			<player v-for="player in group.players" :player="player"></player>
		</div>
	</div>
</template>

<script>
	import player from './player'

  export default {
    name: 'group',
		components: {
			player
		},
		props: ['index', 'group']
  }
</script>

<style>
 .group {
	 max-width: 18rem !important;
	 min-height: 200px !important;
 }

 .group .players {
	 overflow-x: hidden !important;
	 overflow-y: auto !important;
	 border-style: dashed !important;
	 border-width: 4px !important;
 }
</style>
