import moment from 'moment'

function formatdate(time) {
  if (time == '' || time == null || time == undefined) {
    return ''
  } else {
    return moment(time).format('YYYY-MM-DD hh:mm')
  }
}
export default formatdate
