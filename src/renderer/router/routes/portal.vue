<template>
  <div class="text-center" id="portal">
    <form onsubmit="return false;" action="##" class="form-signin">
      <div class="m-2">
        <img src="~@/assets/icons/chat_pardy.svg" alt="CHAT PARDY" width="128" class="mb-4 img-fluid">
        <h1 class="h3 mb-3 font-weight-normal">Chat Pardy!</h1>
      </div>

      <div>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Join a game...">

          <div class="input-group-prepend">
            <input type="button" value="Go!" class="input-group-text btn-primary">
          </div>
        </div>

        <hr />

        <div class="input-group">
          <router-link to="/hub" tag="button" class="form-control btn-success">Create a game!</router-link>
          <!-- <input type="button" value="Create a game!" class="form-control btn-success"> -->
        </div>
      </div>

      <img src="~@/assets/icons/feather/github.svg" onclick="window.util.url_open('https://github.com/ClarkThyLord/Chat-Pardy')" title="Check us out on GitHub!" style="cursor: pointer;" class="mt-5"/>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'landing-page'
  }
</script>

<style scoped>
  #portal {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
		justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
  }
</style>
