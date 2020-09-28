export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers.Authorization = 'Basic ' + btoa('manju-id:password') // bWFuanUtaWQ6cGFzc3dvcmQ=
    config.headers['Access-Control-Allow-Methods'] =
      'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    config.headers['Access-Control-Allow-Headers'] = '*'
  })
}
