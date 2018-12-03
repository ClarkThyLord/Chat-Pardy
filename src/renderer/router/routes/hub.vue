<template>
  <div class="h-100 d-flex flex-column" id="hub">
		<action-bar :state="state"></action-bar>

		<div class="m-0 p-0 row flex-fill">
			<div class="m-0 p-0 w-75 flex-fill">
				<div v-if="state == 'waiting'" class="w-100 h-100">
					<player-space :players="players" class="h-50"></player-space>

					<group-space :groups="groups" class="h-50"></group-space>
				</div>

				<div v-if="state == 'playing'" class="w-100 h-100">
					<board :questions="questions"></board>
				</div>
			</div>

			<chat class="w-25 flex-fill"></chat>
		</div>
  </div>
</template>

<script>
  import ActionBar from '../../components/hub/action-bar'

  import Player from '../../components/hub/player'
  import PlayerSpace from '../../components/hub/player-space'
  import GroupSpace from '../../components/hub/group-space'

	import board from '../../components/hub/board'

	import chat from '../../components/chat'

  export default {
    name: 'hub',
    components: {ActionBar, PlayerSpace, GroupSpace, Player, board, chat},
		data: function () {
			return {
				state: window.game.session.state,
				players: window.game.session.players,
				groups: window.game.session.groups,
				questions: window.game.session.questions
			}
		},
		mounted: function () {
			if (window.game.socket === undefined) return this.$router.push('portal');

			window.game.socket.on('data_sync', (data) => {
				this.players = data.players
				this.groups = data.groups
		  })

			window.game.socket.on('game_start', (data) => {
				this.state = 'playing'
				this.questions = data.questions
			})
		}
  }
</script>
