<template>
	<div class="d-flex flex-column shadow" id="chat">
		<div role="group" class="w-100 btn-group">
		  <button type="button" @click="type = 'g'" class="w-50 btn btn-lg btn-primary">Global</button>
		  <button type="button" @click="type = 'grp'" class="w-50 btn btn-lg btn-primary">Group</button>
		</div>

		<div class="p-1 w-100 msgs">
			<msg v-for="msg in msgs" :msg="msg"></msg>
		</div>

		<div class="input-group">
		  <input type="text" v-model="msg" v-on:keyup.enter="msg_send" class="form-control" placeholder="Enter message...">

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
				msgs: window.game.session.msgs_g
			}
		},
		components: {
			msg
		},
		methods: {
			msg_send: function () {
				window.game.socket.emit(`chat_msg_${this.type}`, {
					author: window.game.session.name,
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
