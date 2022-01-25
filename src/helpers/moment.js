import moment from 'moment'

export const getDaysInMonth = month => {
  let date

  if (!month) {
    date = moment(`${moment().year()}-01-01`)
  } else {
    month = ('0' + month).slice(-2)
    date = moment(`${moment().year()}-${month}-01`)
  }
  

  return Array.from(Array(date.daysInMonth()), (_, i) => i + 1)
    .map(day => ({ value: day, label: day }))
}

export const getYears = () => {
  const years =  Array.from({length: moment().year() - 1900}, (_, i) => i + 1901).reverse()
  return years.map(year => ({ value: year, label: year }))
}

export const formatDate = date => {
  return moment(date).format('DD-MM-YYYY')
}