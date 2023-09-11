/* eslint-disable no-unused-vars */
import { beforeEach, it, describe, expect } from "bun:test";
import { exportedForTesting } from "../src/index";
globalThis.IS_TEST = true;
const {
	betweenTime,
	// findBlueOrange,
	// findPeriod,
	// getDatesFromStrings,
	// isHoliday,
	// isWeekend,
	// openCanvas,
	// toMilliseconds,
	// main,
} = exportedForTesting;

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
