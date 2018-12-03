<template>
	<div :title="title" class="m-1 p-2 flex-fill text-white rounded msg" :class="{'bg-warning': msg.host, 'bg-primary': msg.type == 'grp' && msg.captain == false, 'bg-success': msg.type == 'grp' && msg.captain == true, 'bg-info': msg.system}">
		<i>{{ msg ? msg.author : 'AUTHOR'}}</i> <b>:</b>
		<span class="mr-2 mb-0">{{ msg ? msg.content : 'MESSAGE'}}</span>
	</div>
</template>

<script>
	export default {
		name: 'msg',
		props: ['msg'],
		computed: {
			title: function () {
				let title = 'This is a random player!'
				
				if (this.msg.system) {
					title = 'This is the game system!'
				} else if (this.msg.host) {
					title = 'This is the game host!'
				} else if (this.msg.type == 'grp') {
					if (this.msg.captain) {
						title = 'This is your group captain!'
					} else {
						title = 'This is your group member!'
					}
				}

				return title
			}
		}
	}
</script>

<style>
	#chat .msg {
		min-height: 50px;
	}
</style>
