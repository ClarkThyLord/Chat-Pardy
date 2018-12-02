<template>
	<div>
		<div v-for="(questions, category, index) in data">
			<div>
				{{ category }}
			</div>

			<div>
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
		props: ['data']
	}
</script>
