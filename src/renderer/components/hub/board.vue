<template>
	<div style="" class="w-100 p-2 row text-center">
		<div v-for="(questions, category) in questions" style="flex: 1; max-height: 100%;" class="m-1 column">
			<div class="mb-3 border-bottom">
				<h4><small><b><i>{{ category }}</i></b></small></h4>
			</div>

			<div v-for="(question, index) in questions" @click="question_choose(category, index)" style="height: 150px; cursor: pointer;" class="p-1 m-3 bg-primary border rounded">
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
			question_choose: function (category, index) {
				if (!window.game.session.is_group_captain) return;

				window.game.socket.emit('question_choose', {category: category, index: index})
			}
		}
	}
</script>
