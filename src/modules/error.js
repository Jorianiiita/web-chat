function ResponseStatusError (message, extra) {
  this.message = message
  this.extra = extra
  this.name = 'ResponseStatusError'
}
ResponseStatusError.prototype = Object.create(Error.prototype)
ResponseStatusError.prototype.constructor = ResponseStatusError

export {ResponseStatusError}
