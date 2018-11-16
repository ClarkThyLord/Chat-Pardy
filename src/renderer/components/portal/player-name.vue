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
					    <input type="text" placeholder="Name..." v-model="name" class="form-control">
					  </div>
					</form>
				</div>

				<div class="modal-footer">
					<button data-dismiss="modal" class="btn btn-danger">Cancel</button>
					<button :disabled="!name_valid" :title="!name_valid ? 'Enter name to join...' : 'Join!'" class="btn btn-success">Join!</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'player-name',
		data: function () {
			return {
				name: ''
			}
		},
		computed: {
			name_valid: function () {
				return (this.name != '' && this.name.length >= 2 && this.name.length <= 12)
			}
		}
	}
</script>
