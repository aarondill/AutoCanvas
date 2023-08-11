const SCHOOL_START_COLOR = "Orange" as const; /*Orange||Blue*/
const SCHEDULES = {
	normal: {
		"1": { start: [7, 15], end: [8, 48] },
		"2": { start: [8, 48], end: [10, 30] },
		"3": { start: [10, 30], end: [12, 53] },
		"4": { start: [12, 55], end: [14, 35] },
	},
} as const;
const FIRST_DAY_OF_SCHOOL = new Date("8/09/2023");
const SCHOOL_HOLIDAYS = [
	"9/4/2023",
	"10/6/2023",
	"10/9/2023",
	"11/20/2023",
	"11/21/2023",
	"11/22/2023",
	"11/23/2023",
	"11/24/2023",
	"12/18/2023",
	"12/19/2023",
	"12/20/2023",
	"12/21/2023",
	"12/22/2023",
	"12/25/2023",
	"12/26/2023",
	"12/27/2023",
	"12/28/2023",
	"12/29/2023",
	"1/1/2024",
	"1/2/2024",
	"1/15/2024",
	"2/16/2024",
	"2/19/2024",
	"3/5/2024",
	"3/11/2024",
	"3/12/2024",
	"3/13/2024",
	"3/14/2024",
	"3/15/2024",
	"3/29/2024",
	"4/1/2024",
	"4/19/2024",
] as const;
const CANVAS_LINKS = {
	main: "https://conroeisd.instructure.com/",
	2: "",
	4: "",
	6: "",
	8: "courses/280437",
	1: "",
	3: "courses/286095",
	5: "courses/281822",
	7: "courses/279474",
} as const;

export {
	SCHOOL_HOLIDAYS,
	SCHEDULES,
	FIRST_DAY_OF_SCHOOL,
	SCHOOL_START_COLOR,
	CANVAS_LINKS,
};
