export function convertHouresToStingToMinutes(hourString: string) {
	const [hours, minutes] = hourString.split(":").map(Number);
	const minutesAmout = hours * 60 + minutes;
	return minutesAmout;
}
