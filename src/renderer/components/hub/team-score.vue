<template>
	<div style="opacity: 0.4;" class="w-100 d-flex bg-warning text-center">
		<div v-for="(group, index) in groups" v-if="group.players.length > 0" style="flex: 1;" class="w-100 m-1">
			<h5 class="m-0 p-0"><small><b>Group #{{ index + 1 }}</b></small></h5>
			<br />
			<h2 class="m-0 p-0"><small><i>{{ group.score }}</i></small></h2>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'team-score',
		props: ['groups']
	}
</script>
