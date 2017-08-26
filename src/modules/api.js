import {ResponseStatusError} from './error'

class API {
  constructor ({url}) {
    this.url = url
  }
  get (params = {}) {
    return call(this.url, 'GET', params)
  }
  post (params = {}) {
    return call(this.url, 'POST', params)
  }
  put (params = {}) {
    return call(this.url, 'PUT', params)
  }
  delete () {
    return call(this.url, 'DELETE')
  }
}

function call (api, method, params) {
  let querystring = ''
  if (params) {
    for (let key in params) {
      if (params[key]) {
        querystring += (querystring.length ? '&' : '') + key + '=' + params[key]
      }
    }
  }

  let options = {
    method: method,
    headers: {}
  }

  switch (method) {
    case 'GET':
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      api = api + ((querystring) ? '?' + querystring : '')
      break
    case 'PUT':
      options.headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(params)
      break
    case 'POST':
      options.headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(params)
      break
    case 'DELETE':
      break
  }

  return window.fetch(api, options)
  .then(function (response) {
    return {body: response, statusCode: response.status}
  })
  .then(function ({body, statusCode}) {
    return body.json().then(function (response) {
      let result = {}
      let errorMessage = ''
      result.status = response.status
      if (String(statusCode).indexOf('2') === 0) {
        result.success = true
      }
      if (String(statusCode).indexOf('4') === 0 || String(statusCode).indexOf('5') === 0) {
        response.success = false
        if (statusCode === 403) {
          // Session token has expired. Redirect to login.
          window.location.pathname = '/logout'
        }
        throw new ResponseStatusError(errorMessage, statusCode)
      }
      if (response) {
        result.message = response.message
        result.data = response
      }
      return (Promise.resolve(result))
    })
  }).catch(function (error) {
    //  handle the error here or throw
    return Promise.reject(error)
  })
}

export default API
