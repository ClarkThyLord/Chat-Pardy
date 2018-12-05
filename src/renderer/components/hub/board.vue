<template>
	<div style="" class="w-100 p-2 row text-center">
		<div v-for="(questions, category) in questions" style="flex: 1; max-height: 100%;" class="m-1 column">
			<div class="mb-3 border-bottom">
				<h4><small><b><i>{{ category }}</i></b></small></h4>
			</div>

			<div v-for="(question, index) in questions" @click="question_choose(question.used, category, index)" style="height: 150px; cursor: pointer;" class="p-1 m-3 border rounded" :class="{'bg-primary': question.used == undefined, 'bg-secondary': question.used}">
				<i>{{ 'QUESTION #' + (index + 1) }}</i>
				<br />
				<h2><b>{{ (index + 1) * 100 }}</b></h2>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'board',
		props: ['questions'],
		methods: {
			question_choose: function (used, category, index) {
				// IF THIS ISN'T A TEAM CAPTAIN; OR, QUESTION HAS ALREADY BEEN USED THEN IGNORE
				if (!window.game.session.is_group_captain || used) return;

				window.game.socket.emit('game_question', {
					group: window.game.session.group,
					category: category,
					index: index
				})
			}
		}
	}
</script>
