import moment from 'moment';

export default function convertDate(date: string) {
  return moment(date).utc().format('YYYY-MM-DD');
}
