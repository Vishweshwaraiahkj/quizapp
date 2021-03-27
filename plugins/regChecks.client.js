export default async ({ app }) => {
  await app.router.afterEach((to, from) => {
    // we can also add a file with required code
    // require('~/static/js/base-init.js')
    const events = [
      'click',
      'mousemove',
      'mousedown',
      'scroll',
      'keypress',
      'load'
    ]

    let warningTimer = null
    let logoutTimer = null
    let warningZone = false

    const setWarningZone = () => {
      if (app.$auth.loggedIn) {
        warningZone = true
        alert('Application will be logged out in 1 minute!')
        logoutTimer = setTimeout(logoutUser, 1 * 60 * 1000)
      }
    }
    const logoutUser = () => {
      app.$auth.logout('local')
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
