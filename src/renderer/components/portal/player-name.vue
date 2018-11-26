<template>
	<div tabindex="-1" role="dialog" aria-hidden="true" class="modal fade" id="player-name">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title text-center">Enter name:</h2>

					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<form onsubmit="return false;" action="##" class="text-left">
						<div class="p-3 m-auto form-group">
					    <input type="text" v-on:keyup.enter="!name_valid ? '' : session_join" placeholder="Name..." v-model="name" name="name" class="form-control">
					  </div>
					</form>
				</div>

				<div class="modal-footer">
					<button data-dismiss="modal" class="btn btn-danger">Cancel</button>
					<button @click="session_join" :disabled="!name_valid" :title="!name_valid ? 'Enter name to join...' : 'Join!'" class="btn btn-success">Join!</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'player-name',
		props: ['session_ip'],
		data: function () {
			return {
				name: ''
			}
		},
		computed: {
			name_valid: function () {
				return (this.name != '' && this.name.length >= 2 && this.name.length <= 12)
			}
		},
		methods: {
			session_join: function () {
				window.game.session.name = this.name
				window.client.join(this.session_ip)

				$('#player-name').modal('hide')
				this.$router.push('hub')
			}
		},
		mounted: function () {
			$('#player-name').on('hidden.bs.modal', (eve) => {
				this.name = ''
			})
		}
	}
</script>
