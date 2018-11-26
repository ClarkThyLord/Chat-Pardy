<template>
	<div class="m-1 p-2 flex-fill text-white msg">
		<i>{{ msg ? msg.author : 'AUTHOR'}}</i> <b>:</b>
		<span class="mr-2 mb-0">{{ msg ? msg.content : 'MESSAGE'}}</span>
	</div>
</template>

<script>
	export default {
		name: 'msg',
		props: ['msg']
	}
</script>

<style>
	#chat .msg {
		min-height: 50px;
	}
</style>
