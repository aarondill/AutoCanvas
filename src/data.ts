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
  "9/5/2022",
  "10/7/2022",
  "10/10/2022",
  "11/8/2022",
  "11/21/2022",
  "11/22/2022",
  "11/23/2022",
  "11/24/2022",
  "11/25/2022",
  "12/19/2022",
  "12/20/2022",
  "12/21/2022",
  "12/22/2022",
  "12/23/2022",
  "12/26/2022",
  "12/27/2022",
  "12/28/2022",
  "12/29/2022",
  "12/30/2022",
  "1/2/2023",
  "1/3/2023",
  "1/16/2023",
  "2/17/2023",
  "2/20/2023",
  "3/13/2023",
  "3/14/2023",
  "3/15/2023",
  "3/16/2023",
  "3/17/2023",
  "3/20/2023",
  "4/7/2023",
  "4/10/2023",
] as const;
const CANVAS_LINKS = {
  main: "https://conroeisd.instructure.com/" as const,
  2: "courses/272770" as const,
  4: "courses/269874" as const,
  6: "courses/268640" as const,
  8: "courses/273548" as const,
  1: "courses/271285" as const,
  3: "courses/267975" as const,
  5: "courses/272738" as const,
  7: "courses/268059" as const,
} as const;

export {
  SCHOOL_HOLIDAYS,
  SCHEDULES,
  FIRST_DAY_OF_SCHOOL,
  SCHOOL_START_COLOR,
  CANVAS_LINKS,
};
