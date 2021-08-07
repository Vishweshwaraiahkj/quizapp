export default (context, inject) => {
  const errorHandler = (type, error) => {
    const code = parseInt(error.response && error.response.status)
    const backToOld = () => context.redirect(context.from.fullPath)
    if (error.config) {
      if (code === 500) {
        context.redirect('/errors/500')
      } else if (code === 401) {
        context.$auth.logout('local')
        context.redirect('/login')
      } else {
        context.error({
          statusCode: code,
          message: error.message
        })
        backToOld()
      }
    } else {
      backToOld()
    }
  }
  inject('errorHandler', errorHandler)
}
