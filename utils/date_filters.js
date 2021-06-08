import { utc } from 'moment';

export const getAge = (date) => {
	const dobYear = utc(date).format('YYYY');
	const currentYear = utc(new Date()).format('YYYY');
	console.log('selectedDon', currentYear - dobYear);
	return currentYear - dobYear;
};
