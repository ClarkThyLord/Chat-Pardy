<template>
	<div :title="msg.host ? 'This your game host!' : (msg.type == 'grp' ? (msg.captain == true ? 'This is your group captain!' : 'This is your group member!') : 'This is a random player!')" class="m-1 p-2 flex-fill text-white rounded msg" :class="{'bg-warning': msg.host, 'bg-primary': msg.type == 'grp' && msg.captain == false, 'bg-success': msg.type == 'grp' && msg.captain == true}">
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
