<template>
	<div>
		<div v-for="(questions, category, index) in questions">
			<div>
				{{ category }}
			</div>

			<div v-for="(question, index) in questions">
				{{ 'QUESTION #' + (index + 1) }}
				<br />
				{{ (index + 1) * 100 }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'board',
		props: ['questions']
	}
</script>
