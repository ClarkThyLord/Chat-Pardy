<template>
  <div class="text-center" id="wrapper">
		<div tabindex="-1" role="dialog" aria-hidden="true" class="modal fade" id="download-prompt">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title text-center">Chat Pardy</h5>

		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>

		      <div class="modal-body">
		        <img src="~@/assets/icons/chat_pardy.svg" alt="CHAT PARDY" width="128" class="p-2 mb-4 img-fluid">
						<br />
						<i>You must download Chat Pardy to create a session!</i>
		      </div>

		      <div class="modal-footer justify-content-center">
						<button type="button" data-dismiss="modal" class="btn btn-danger">No, thank you</button>
						<button type="button" onclick="window.util.url_open('https://github.com/ClarkThyLord/Chat-Pardy/releases');" data-dismiss="modal" class="btn btn-success">Yes, thank you!</button>
		      </div>
		    </div>
		  </div>
		</div>

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
          <input type="button" @click="session_new" value="Create a game!" class="form-control btn-success">
        </div>
      </div>

      <img src="~@/assets/icons/feather/github.svg" onclick="window.util.url_open('https://github.com/ClarkThyLord/Chat-Pardy')" title="Check us out on GitHub!" style="cursor: pointer;" class="mt-5"/>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
		methods: {
			session_new: function () {
				if (process.env.IS_WEB) return window.$('#download-prompt').modal('show')
			}
		}
  }
</script>

<style>
  html, body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
		justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
	  animation: color_change 10s infinite;
  }

	@keyframes color_change {
	  0% {background-color: red;}
	  20%{background-color:yellow;}
	  40%{background-color:green;}
	  60%{background-color:brown;}
	  80% {background-color: purple;}
	  100% {background-color: red;}
	}
</style>
