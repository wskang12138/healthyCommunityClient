import moment from 'moment'

function borthdate(time) {
  if (time == '' || time == null || time == undefined) {
    return ''
  } else {
    return moment(time).format('YYYY-MM-DD')
  }
}
export default borthdate
