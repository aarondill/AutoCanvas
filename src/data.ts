declare global {
	// var is neccisary here.
	// eslint-disable-next-line no-var
	var IS_TEST: boolean | undefined;
}
export const COLORS = {
	BLUE: "BLUE",
	ORANGE: "ORANGE",
};
export type Color = (typeof COLORS)[keyof typeof COLORS];

export const SCHOOL_START_COLOR = COLORS.ORANGE;
export const SCHEDULES = {
	normal: {
		"1": { start: [7, 15], end: [8, 48] },
		"2": { start: [8, 48], end: [10, 30] },
		"3": { start: [10, 30], end: [12, 53] },
		"4": { start: [12, 55], end: [14, 35] },
	},
} as const;
export const FIRST_DAY_OF_SCHOOL = new Date("8/14/2024");

function range(start: string, end: string) {
	const startDate = new Date(start);
	const endDate = new Date(end);
	const dates = [];
	while (startDate <= endDate) {
		dates.push(new Date(startDate));
		startDate.setDate(startDate.getDate() + 1);
	}
	return dates;
}

export const SCHOOL_HOLIDAYS: (string | Date)[] = [
	"9/2/2024",
	"10/11/2024",
	"10/14/2024",
	"11/4/2024",
	"11/5/2024",
	...range("11/25/2024", "11/29/2024"),
	...range("12/23/2024", "1/5/2025"),
	"1/20/2025",
	...range("2/14/2025", "2/17/2025"),
	...range("3/10/2025", "3/14/2025"),
	"4/18/2025",
	"4/21/2025",
] as const;

export const CANVAS_LINKS = {
	main: "",
	2: "courses/317926/modules",
	4: "",
	6: "courses/320177/modules",
	8: "",
	1: "courses/318005/modules",
	3: "courses/321525/modules",
	5: "courses/320177/modules",
	7: "courses/321926/modules",
} as const;
