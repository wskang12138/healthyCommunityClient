<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (window.localStorage.getItem('useruser_id')) {
      this.$socket.emit('LOGIN', {
        type: 'onLine',
        body: {
          id: window.localStorage.getItem('useruser_id'),
          avatar: window.localStorage.getItem('useravatar'),
          nickName: window.localStorage.getItem('username'),
          message: {
            content: '',
            time: new Date()
          }
        }
      })
    }
  }
}
</script>
