<template>
	<div role="alert" :title="captain ? 'This is a group captain' : 'This is a group member'" class="m-1 alert alert-primary text-center player">
		<span v-if="captain">⭐</span>
		{{ player ? player.name : 'NAME'}}
	</div>
</template>

<script>
  export default {
    name: 'player',
		props: ['captain', 'player']
  }
</script>

<style>
 .player {
	 max-height: 50px !important;
	 min-width: 200px !important;
	 word-wrap: break-word;
	 cursor: pointer;
 }
</style>
