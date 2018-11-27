<template>
  <main class="w-100 h-100" id="app">
    <router-view class="w-100 h-100"></router-view>
  </main>
</template>

<script>
  export default {
    name: 'chat-pardy'
  }
</script>

<style>
  body {
    animation: color_change 10s infinite;
  }

	button {
		cursor: pointer;
	}

	button:disabled {
		cursor: not-allowed;
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
