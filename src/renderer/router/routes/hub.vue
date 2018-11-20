<template>
  <div class="h-100 d-flex flex-column" id="hub">
		<action-bar></action-bar>

		<div class="m-0 p-0 row flex-fill">
			<div class="m-0 p-0 w-75 flex-fill">
				<player-space :players="players" class="h-50"></player-space>

				<group-space :groups="groups" class="h-50"></group-space>
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

	import chat from '../../components/chat'

  export default {
    name: 'hub',
    components: {ActionBar, PlayerSpace, GroupSpace, Player, chat},
		data: function () {
			return {
				players: window.game.session.players,
				groups: window.game.session.groups
			}
		}
  }
</script>
