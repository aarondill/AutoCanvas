/* eslint-disable no-unused-vars */

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

//!! This *does not* run the code in the import, only imports the types of the export
// This is required to keep type-safety while later dynamically importing.
type ExportedForTesting = typeof import("../src/index")["exportedForTesting"];
let betweenTime: ExportedForTesting["betweenTime"],
	findBlueOrange: ExportedForTesting["findBlueOrange"],
	findPeriod: ExportedForTesting["findPeriod"],
	getDatesFromStrings: ExportedForTesting["getDatesFromStrings"],
	isHoliday: ExportedForTesting["isHoliday"],
	isWeekend: ExportedForTesting["isWeekend"],
	openCanvas: ExportedForTesting["openCanvas"],
	toMilliseconds: ExportedForTesting["toMilliseconds"],
	main: ExportedForTesting["main"];

// Ensure presence of import before anything runs
beforeAll(async () => {
	const { exportedForTesting } = await import("../src/index");
	({
		betweenTime,
		findBlueOrange,
		findPeriod,
		getDatesFromStrings,
		isHoliday,
		isWeekend,
		openCanvas,
		toMilliseconds,
		main,
	} = exportedForTesting);
});

describe("betweenTime", () => {
	let date: Date;
	beforeEach(() => {
		date = new Date();
		date.setHours(1); // 1 AM
		date.setMinutes(0); // 1:00 AM
		date.setSeconds(0); // 1:00:00 AM
	});

	it("returns a boolean", () => {
		expect(typeof betweenTime(new Date(), 0, 1)).toBe("boolean");
	});

	const twoAMInMilliseconds = 72e5;
	const midnightInMilliseconds = 0;
	it("Returns true", () => {
		// date: 1 am
		expect(betweenTime(date, midnightInMilliseconds, twoAMInMilliseconds)) //
			.toBe(true);
	});
	it("Returns false", () => {
		date.setHours(3); // 3:00:00 AM
		expect(betweenTime(date, midnightInMilliseconds, twoAMInMilliseconds)) //
			.toBe(false);
	});
});
