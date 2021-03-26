export default (context, inject) => {
  const errorHandler = (type, error) => {
    const code = parseInt(error.response && error.response.status)
    if (error.config && code === 500) {
      context.redirect('/errors/500')
    } else if (error.config && code === 401) {
      context.$auth.logout('local')
      context.redirect('/login')
    } else if (error.config && code === 404) {
      context.error({
        statusCode: code,
        message: error.message
      })
      context.redirect(context.from.fullPath)
    }
  }
  inject('errorHandler', errorHandler)
}
