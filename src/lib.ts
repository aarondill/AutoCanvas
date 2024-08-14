/// <reference lib="dom" />
import { COLORS, type Color } from "./data";
function toMilliseconds(hr = 0, min = 0, sec = 0, mSec = 0) {
	// eslint-disable-next-line no-mixed-operators
	return mSec + (sec + (min + hr * 60) * 60) * 1000;
}
function getDatesFromStrings(strArr: readonly (string | Date)[]) {
	return strArr.map(str => new Date(str));
}
function isHoliday(date: Date, holidays: Date[]) {
	const dateFormatter = Intl.DateTimeFormat("en-US", { dateStyle: "short" });
	const getFullDate = (date: Date) => dateFormatter.format(date);
	for (const holiday of holidays)
		if (getFullDate(date) === getFullDate(holiday)) return true;
	return false;
}
function isWeekend(date: Date) {
	return date.getDay() === 6 || date.getDay() === 0;
}
function betweenTime(date: Date, beginTime: number, endTime: number) {
	const timeOfDay = toMilliseconds(date.getHours(), date.getMinutes());
	return timeOfDay >= beginTime && timeOfDay <= endTime;
}
interface Schedule {
	start: readonly [number, number];
	end: readonly [number, number];
}
interface Schedules {
	normal: Record<string | number, Schedule>;
}
function findPeriod(date: Date, schedules: Schedules) {
	const schedule = schedules.normal;
	for (const p of Object.keys(schedule)) {
		const [hr, min] = schedule[p].start;
		const [endHr, endMin] = schedule[p].end;
		const start = toMilliseconds(hr, min);
		const end = toMilliseconds(endHr, endMin);
		if (betweenTime(date, start, end)) return p;
	}
	throw Error("Error: Impossible to Reach In Normal Code");
}
function findBlueOrange(
	date: Date,
	firstSchool: Date,
	schoolHolidays: Date[],
	startColor: Color
): Color {
	/*start firstSchool --> date;*/
	const incrementor: Date = firstSchool;
	let count = 0;
	while (incrementor.valueOf() < date.valueOf()) {
		if (!isWeekend(incrementor) && !isHoliday(incrementor, schoolHolidays)) {
			count++;
		}
		incrementor.setDate(incrementor.getDate() + 1);
	}
	const checkNum = startColor === COLORS.ORANGE ? 0 : 1;
	const dateColor = count % 2 === checkNum ? COLORS.BLUE : COLORS.ORANGE;
	return dateColor;
}
function openCanvas<CanvasLinks extends Record<string, string>>(
	id: keyof CanvasLinks,
	canvasLinks: CanvasLinks
): string {
	let canvasPage = canvasLinks.main;
	if (id !== "main") canvasPage += canvasLinks[id];
	if (!globalThis.IS_TEST) {
		if (location.protocol === "data:") location.href = canvasPage;
		else window.open(canvasPage);
	}
	return canvasPage;
}
export function main(
	today: Date,
	schoolHolidays: readonly (string | Date)[],
	periodSchedules: Schedules,
	firstSchoolDay: Date,
	firstColor: Color,
	canvasLinks: Record<"main" | number, string>
): string {
	const schoolHolidayDates = getDatesFromStrings(schoolHolidays);

	const schoolStart = toMilliseconds(...periodSchedules.normal[1].start);
	const schoolEnd = toMilliseconds(...periodSchedules.normal[4].end);
	if (
		isHoliday(today, schoolHolidayDates) ||
		isWeekend(today) ||
		!betweenTime(today, schoolStart, schoolEnd)
	)
		return openCanvas("main", canvasLinks);
	const relativePeriod = findPeriod(today, periodSchedules);
	const blueOrOrange = findBlueOrange(
		today,
		firstSchoolDay,
		schoolHolidayDates,
		firstColor
	);
	const evenPeriod = Number(relativePeriod) * 2;
	const absPeriod = evenPeriod - (blueOrOrange === COLORS.BLUE ? 0 : 1);
	return openCanvas(absPeriod, canvasLinks);
}

/**
 * @Developer_Warning - Do *not* use!
 * This is not intended for use in any form of api, as it has many side effects
 * and would be fairly instable. This is only exported so I can import them to
 * test them.
 */
export const exportedForTesting = {
	betweenTime,
	findBlueOrange,
	findPeriod,
	getDatesFromStrings,
	isHoliday,
	isWeekend,
	openCanvas,
	toMilliseconds,
	main,
};
