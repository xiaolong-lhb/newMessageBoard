export default {
  getTime() {
    const date = new Date()
    let month = date.getMonth() + 1
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let second = date.getSeconds() < 10 ? '0' + date.getSeconds : date.getSeconds()
    return (
      date.getFullYear() +
      '-' +
      month +
      '-' +
      date.getDate() +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      second
    )
  }
}
