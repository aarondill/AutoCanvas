import {
	SCHOOL_HOLIDAYS,
	SCHEDULES,
	FIRST_DAY_OF_SCHOOL,
	SCHOOL_START_COLOR,
	CANVAS_LINKS,
} from "./data";
/*281 chars shorter than 1.0 && readable!*/
/*70 main lines, 63 data lines; 133 total lines*/
(function () {
	function toMilliseconds(hr = 0, min = 0, sec = 0, mSec = 0) {
		// eslint-disable-next-line no-mixed-operators
		return mSec + (sec + (min + hr * 60) * 60) * 1000;
	}
	function getDatesFromStrings(strArr: readonly string[]) {
		const resultsArray: Date[] = [];
		return strArr.reduce((dates, str) => {
			dates.push(new Date(str));
			return dates;
		}, resultsArray);
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
		grizzly: Record<string | number, Schedule>;
		normal: Record<string | number, Schedule>;
	}
	function findPeriod(date: Date, isGrizzly: boolean, schedules: Schedules) {
		const schedule = isGrizzly ? schedules.grizzly : schedules.normal;
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
		startColor: "Blue" | "Orange"
	) {
		/*start firstSchool --> date;*/
		const incrementor: Date = firstSchool;
		let count = 0;
		while (incrementor.valueOf() < date.valueOf()) {
			if (!isWeekend(incrementor) && !isHoliday(incrementor, schoolHolidays)) {
				count++;
			}
			if (incrementor.getDay() === 5) {
				incrementor.setDate(1); /*skip weekends*/
			} else {
				incrementor.setDate(incrementor.getDate() + 1);
			}
		}
		const checkNum = startColor === "Orange" ? 0 : 1;
		const dateColor = count % 2 === checkNum ? "Blue" : "Orange";
		return dateColor;
	}
	function openCanvas<CanvasLinks extends Record<string, string>>(
		id: keyof CanvasLinks,
		canvasLinks: CanvasLinks
	) {
		let canvasPage = canvasLinks.main;
		if (id !== "main") canvasPage += canvasLinks[id];
		if (location.protocol === "data:") location.href = canvasPage;
		else window.open(canvasPage);
	}
	(function main(
		today,
		schoolHolidays,
		periodSchedules,
		firstSchoolDay,
		firstColor,
		canvasLinks
	) {
		const schoolHolidayDates = getDatesFromStrings(schoolHolidays);
		const schoolStart = toMilliseconds(7, 20); // Evil hardcoding
		const schoolEnd = toMilliseconds(14, 25); // Evil hardcoding
		if (
			isHoliday(today, schoolHolidayDates) ||
			isWeekend(today) ||
			!betweenTime(today, schoolStart, schoolEnd)
		)
			return openCanvas("main", canvasLinks);
		const IS_GRIZZLY = today.getDay() === 2 || today.getDay() === 3;
		const relativePeriod = findPeriod(today, IS_GRIZZLY, periodSchedules);
		if (relativePeriod === "g") return openCanvas("g", canvasLinks);
		const blueOrOrange = findBlueOrange(
			today,
			firstSchoolDay,
			schoolHolidayDates,
			firstColor
		);
		// eslint-disable-next-line no-mixed-operators
		const evenPeriod = Number(relativePeriod) * 2;
		const absPeriod = (evenPeriod -
			(blueOrOrange === "Blue" ? 0 : 1)) as Exclude<
			keyof typeof canvasLinks,
			"g" | "main"
		>;
		openCanvas(absPeriod, canvasLinks);
	})(
		new Date(),
		SCHOOL_HOLIDAYS,
		SCHEDULES,
		FIRST_DAY_OF_SCHOOL,
		SCHOOL_START_COLOR,
		CANVAS_LINKS
	);
})();
