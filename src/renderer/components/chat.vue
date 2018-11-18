<template>
	<div class="d-flex flex-column shadow" id="chat">
		<div role="group" class="w-100 btn-group">
		  <button type="button" class="w-50 btn btn-lg btn-primary">Global</button>
		  <button type="button" class="w-50 btn btn-lg btn-primary">Group</button>
		</div>

		<div class="p-1 w-100 msgs">
			<msg></msg>
		</div>

		<div class="input-group">
		  <input type="text" class="form-control" placeholder="Enter message...">

			<div class="input-group-append">
		    <button type="button" class="btn btn-success">Send</button>
		  </div>
		</div>
	</div>
</template>

<script>
	import msg from './chat/msg'

	export default {
		name: 'chat',
		components: {
			msg
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
