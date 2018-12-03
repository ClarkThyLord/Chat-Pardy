<template>
	<div class="d-flex flex-column shadow" id="chat">
		<div v-if="!is_host" role="group" class="w-100 btn-group d-flex">
		  <button type="button" @click="type = 'g'" style="flex: 1;" class="btn btn-lg btn-primary">Global</button>
		  <button type="button" @click="type = 'grp'" class="w-50 btn btn-lg btn-primary">Group</button>
		</div>

		<div class="p-1 w-100 msgs">
			<msg v-for="msg in msgs" :msg="msg"></msg>
		</div>

		<div class="input-group">
		  <input type="text" v-model="msg" v-on:keyup.enter="msg_send" class="form-control" :placeholder="`Enter message ${type == 'g' ? 'to everyone' : 'to team'}...`">

			<div class="input-group-append">
		    <button type="button" @click="msg_send" class="btn btn-success">Send</button>
		  </div>
		</div>
	</div>
</template>

<script>
	import msg from './chat/msg'

	export default {
		name: 'chat',
		data: function () {
			return {
				msg: '',
				type: 'g',
				msgs: window.game.session.msgs,
				is_host: window.game.server != undefined
			}
		},
		components: {
			msg
		},
		methods: {
			msg_send: function () {
				window.game.socket.emit(`chat_msg_${this.type}`, {
					type: this.type,
					host: window.game.io != undefined ? true : false,
					captain: window.game.session.is_group_captain,
					author: window.game.server != undefined ? 'GAME HOST' : window.game.session.name,
					content: this.msg
				});
				this.msg = ''
			}
		}
	}
</script>

<style>
	#chat {
		background-color: rgba(0, 0, 0, 0.1);
	}

	#chat .msgs {
		overflow-x: hidden;
		overflow-y: auto;
		flex: 1;
	}
</style>
