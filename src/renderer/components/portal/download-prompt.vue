<template>
	<div tabindex="-1" role="dialog" aria-hidden="true" class="modal fade" id="download-prompt">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title text-center">Chat Pardy</h5>

					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<img src="~@/assets/icons/chat_pardy.svg" alt="CHAT PARDY" width="128" class="p-2 mb-4 img-fluid">
					<br />
					<i>You must download Chat Pardy to create a session!</i>
				</div>

				<div class="modal-footer justify-content-center">
					<button type="button" data-dismiss="modal" class="btn btn-danger">No, thank you</button>
					<button type="button" onclick="window.util.url_open('https://github.com/ClarkThyLord/Chat-Pardy/releases');" data-dismiss="modal" class="btn btn-success">Yes, thank you!</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'download-prompt'
	}
</script>
