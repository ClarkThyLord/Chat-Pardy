<template>
  <div class="text-center" id="portal">
		<player-name></player-name>
		<download-prompt></download-prompt>

    <form onsubmit="return false;" action="##" style="max-width: 330px;" class="m-auto p-2">
      <div class="m-2">
        <img src="~@/assets/icons/chat_pardy.svg" alt="CHAT PARDY" width="128" class="mb-4 img-fluid">
        <h1 class="h3 mb-3 font-weight-normal">Chat Pardy!</h1>
      </div>

      <div>
        <div class="input-group">
          <input type="text" v-model="session_ip" class="form-control" placeholder="Join a game...">

          <div class="input-group-append">
						<button :disabled="!session_ip_valid" @click="session_join" :title="!session_ip_valid ? 'Enter session id...' : 'Go!'" class="btn btn-primary">Go!</button>
          </div>
        </div>

        <hr />

        <div>
					<button @click="session_new" class="form-control btn-success">Create a game!</button>
        </div>
      </div>

      <img src="~@/assets/icons/feather/github.svg" onclick="window.util.url_open('https://github.com/ClarkThyLord/Chat-Pardy')" title="Check us out on GitHub!" style="cursor: pointer;" class="mt-5"/>
    </form>
  </div>
</template>

<script>
	import PlayerName from '../../components/portal/player-name'
	import DownloadPrompt from '../../components/portal/download-prompt'

  export default {
    name: 'landing-page',
		components: {
			PlayerName,
			DownloadPrompt
		},
		data: function () {
			return {
				session_ip: ''
			}
		},
		computed: {
			session_ip_valid: function () {
				return (this.session_ip.length >= 7)
			}
		},
		methods: {
			session_new: function () {
				if (process.env.IS_WEB) return window.$('#download-prompt').modal('show');

				window.game.server.create()

				this.$router.push('hub')
			},
			session_join: function () {
				window.game.client.join(this.session_ip)

				window.$('#player-name').modal('show')
			}
		}
  }
</script>

<style scoped>
  #portal {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
		justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
  }
</style>
