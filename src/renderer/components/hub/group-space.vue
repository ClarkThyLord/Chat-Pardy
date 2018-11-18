<template>
  <div class="d-flex bd-highlight flex-wrap" id="group-space">
    <group></group>
  </div>
</template>

<script>
	import group from './group'

  export default {
    name: 'group-space',
		components: {
			group
		}
  }
</script>

<style>
	#group-space {
		background-color: rgba(0, 0, 0, 0.15);
	}
</style>
