<template>
  <div id="action-bar">
    <nav class="navbar navbar-dark bg-dark">
      <a style="cursor: default !important;" class="navbar-brand" href="#">
        <img src="~@/assets/icons/chat_pardy.svg" alt="CP" width="32" height="32" class="mr-2">
        <span class="d-none d-md-inline">
          Chat Pardy
        </span>

				<h3 v-if="session_id != ''" class="ml-md-3 d-inline"><small><span class="d-none d-md-inline">Session </span>ID:</small> {{ session_id || '0.0.0.0' }}</h3>
      </a>

      <form class="form-inline">
        <div class="btn-group" role="group">
          <button v-if="is_host" type="button" class="btn btn-secondary">Configuration</button>
          <!-- <button type="button" class="btn btn-primary">Help</button> -->
          <button type="button" @click="exit" class="btn btn-danger">Exit</button>
        </div>
      </form>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'action-bar',
		data: function () {
			return {
				session_id: '',
				is_host: window.game.server != undefined
			}
		},
		methods: {
			exit: function () {
				if (window.game.server != undefined) {
					window.game.io.close(function () {
						window.game.socket.close()
						window.vue.$router.push('portal')
					})
				} else {
					window.game.socket.close()
					window.vue.$router.push('portal')
				}
			}
		},
		mounted: function () {
			if (window.game.server != undefined) {
				this.session_id = 'Fetching session id...'
				window.util.getLocalIP().then((ip) => {
					this.session_id = ip
				})
			}
		}
  }
</script>

<style scoped>

</style>
