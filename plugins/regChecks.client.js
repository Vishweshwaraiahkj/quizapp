export default async ({ app }) => {
  await app.router.afterEach((to, from) => {
    // we can also add a file with required code
    // require('~/static/js/base-init.js')
    const events = ['click', 'scroll', 'keypress']

    let warningTimer = null
    let logoutTimer = null
    let warningZone = false

    const logoutUser = () => {
      app.$auth.logout('local')
    }

    const setWarningZone = () => {
      if (app.$auth.loggedIn) {
        warningZone = true
        const userId = app.$auth.$storage.getUniversal('USER_DATA').userId
        let token = app.$auth.getToken('local')
        token = token.replace('Bearer ', '')

        app.$axios
          .$get(
            '/comman/getUserProfile?user=' + userId + '&access_token=' + token
          )
          .then((response) => {
            logoutTimer = setTimeout(logoutUser, 1 * 60 * 1000)
          })
          .catch((e) => {
            logoutUser()
          })
      }
    }

    const setTimers = () => {
      warningTimer = setTimeout(setWarningZone, 9 * 60 * 1000)
    }

    const resetTimer = () => {
      clearTimeout(warningTimer)
      clearTimeout(logoutTimer)
      setTimers()
    }

    events.forEach((event) => {
      window.addEventListener(event, resetTimer)
    })
  })
}
