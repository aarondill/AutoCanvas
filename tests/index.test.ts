/* eslint-disable no-unused-vars */
/** Import constant data from `./data.example.ts` */
import { exportedForTesting } from "../src/index";

const {
	betweenTime,
	findBlueOrange,
	findPeriod,
	getDatesFromStrings,
	isHoliday,
	isWeekend,
	openCanvas,
	toMilliseconds,
	main,
} = exportedForTesting;

import { DATA } from "./data.example";
/** Force consistent data for main test */
const dataMock = jest.mock("../src/data", () => {
	return DATA;
});

/** Set up spy on window.open */
const openMock = jest.fn(() => null);
const originalWindow = { ...window };
const windowSpy = jest.spyOn(global, "window", "get");
windowSpy.mockImplementation(() => {
	return {
		...originalWindow,
		open: openMock,
		location: {
			href: "not-data:so-open-something-don-t-bother-me",
		},
	} as unknown as Window & typeof globalThis;
	// ^ typescript, pls shush
});

describe("Test betweenTime", () => {
	it("returns a boolean", () => {
		expect(typeof betweenTime(new Date(), 0, 1)).toBe("boolean");
	});
	const date = new Date();
	date.setHours(1); // 1 AM
	date.setMinutes(0); // 1:00 AM
	date.setSeconds(0); // 1:00:00 AM

	const twoAMInMilliseconds = 72e5;
	const midnightInMilliseconds = 0;
	it("Returns true", () => {
		expect(betweenTime(date, midnightInMilliseconds, twoAMInMilliseconds)) //
			.toBe(true);
	});
	it("Returns false", () => {
		date.setHours(3); // 3 AM
		date.setMinutes(0); // 3:00 AM
		date.setSeconds(0); // 3:00:00 AM

		expect(betweenTime(date, midnightInMilliseconds, twoAMInMilliseconds)) //
			.toBe(false);
	});
});
