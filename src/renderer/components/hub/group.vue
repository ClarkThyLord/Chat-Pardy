<template>
	<div class="m-2 d-flex flex-column flex-fill text-white bg-primary rounded group">
		<div class="card-header text-center"><b> {{ group ? group.name : 'NAME' }} </b></div>

		<div class="m-1 d-flex flex-column flex-fill border rounded players">
			<player></player>
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
		props: ['group']
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
