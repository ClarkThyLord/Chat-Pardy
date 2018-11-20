<template>
  <div class="d-flex bd-highlight flex-wrap" id="group-space">
    <group v-for="group in groups" :group="group"></group>

		<div title="Add Group!" style="cursor: pointer;" class="m-2 d-flex flex-column flex-fill text-center align-middle text-white bg-primary rounded group">
			<h2 class="p-0 m-0 h-100">
				+
				<br />
				Add Group
			</h2>
		</div>
  </div>
</template>

<script>
	import group from './group'

  export default {
    name: 'group-space',
		components: {
			group
		},
		props: ['groups']
  }
</script>

<style>
	#group-space {
		overflow-x: hidden;
		overflow-y: auto;
		background-color: rgba(0, 0, 0, 0.15);
	}
</style>
