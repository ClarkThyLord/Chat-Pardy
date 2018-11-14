<template>
  <div id="action-bar">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="~@/assets/icons/chat_pardy.svg" width="30" height="30" alt="">
        <span class="d-none d-md-inline">
          Chat Pardy
        </span>
      </a>

      <form class="form-inline">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-secondary">Configuration</button>
          <button type="button" class="btn btn-primary">Help</button>
          <button type="button" class="btn btn-danger">Exit</button>
        </div>
      </form>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'action-bar'
  }
</script>

<style scoped>

</style>
