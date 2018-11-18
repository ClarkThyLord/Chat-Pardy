<template>
	<div class="m-2 text-white flex-fill bg-primary rounded group">
		<div class="card-header text-center"><b> {{ group ? group.name : 'NAME' }} </b></div>

		<div class="m-1 d-flex border rounded players">
			<player style="flex: 1 !important;"></player>
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
 }

 .group .players {
	 overflow-x: hidden !important;
	 overflow-y: auto !important;
	 word-wrap: break-word !important;
	 border-style: dashed !important;
	 border-width: 4px !important;
 }
</style>
