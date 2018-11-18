<template>
	<div role="alert" class="m-1 alert alert-primary text-center player">
		{{ player || 'NAME'}}
	</div>
</template>

<script>
  export default {
    name: 'player',
		props: ['player']
  }
</script>

<style>
 .player {
	 width: 200px !important;
	 min-width: 200px !important;
	 word-wrap: break-word;
	 cursor: pointer;
 }
</style>
