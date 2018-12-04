<template>
  <div class="h-100 d-flex flex-column" id="hub">
		<action-bar :state="state" :can_start="players.length == 0"></action-bar>

		<div style="max-height: 100%;" class="m-0 p-0 row flex-fill">
			<div style="overflow-x: hidden; overflow-y: auto; max-height: 100%;" class="m-0 p-0 w-75 flex-fill">
				<team-score v-if="state == 'playing'" style="position: sticky; top: 0px;" :groups="groups"></team-score>

				<div v-if="players.length == 0" style="opacity: 0.7 !important; position: fixed !important;" class="w-100 h-100 bg-dark text-center">
					<h1><i>INVITE PLAYERS TO START THE GAME!</i></h1>
				</div>

				<div v-if="state == 'waiting'" class="w-100 h-100">
					<player-space :players="players" class="h-50"></player-space>

					<group-space :groups="groups" class="h-50"></group-space>
				</div>

				<div v-if="state == 'playing' && question == ''" class="w-100 h-100">
					<board :questions="questions"></board>
				</div>

				<div v-if="state == 'playing' && question != ''">
					{{ question }}

					<input type="text" class="form-control" />
				</div>
			</div>

			<chat style="position: sticky !important; max-height: 100%;" class="w-25 flex-fill"></chat>
		</div>
  </div>
</template>

<script>
  import ActionBar from '../../components/hub/action-bar'

  import Player from '../../components/hub/player'
  import PlayerSpace from '../../components/hub/player-space'
  import GroupSpace from '../../components/hub/group-space'

	import TeamScore from '../../components/hub/team-score'
	import board from '../../components/hub/board'

	import chat from '../../components/chat'

  export default {
    name: 'hub',
    components: {
			ActionBar,

			PlayerSpace,
		 	GroupSpace,
			Player,

			TeamScore,
			board,

			chat
		},
		data: function () {
			return {
				state: window.game.session.state,
				players: window.game.session.players,
				groups: window.game.session.groups,
				is_group_captain: window.game.session.is_group_captain,
				question: '',
				questions: window.game.session.questions
			}
		},
		mounted: function () {
			if (window.game.socket === undefined) return this.$router.push('portal');

			window.game.socket.on('data_sync', (data) => {
				this.players = data.players
				this.groups = data.groups
		  })

			window.game.socket.on('group_captain', (data) => {
				this.is_group_captain = data
			})

			window.game.socket.on('game_start', (data) => {
				this.state = 'playing'
				this.questions = data.questions
			})

			window.game.socket.on('game_question', (data) => {
				console.log('QUESTION UPDATE:');
				console.log(data);

				this.question = data.question
			})
		}
  }
</script>
