import {
    MAX_ATTEMPTS,
    retryDelayInMillisecondsForAttemptNumber,
} from "./exponentialBackoff";

describe("retryDelayInMillisecondsForAttemptNumber", () => {
    describe("below MAX_ATTEMPTS", () => {
        it("returns 2 ** attempt number * 1000 milliseconds -> exponential backoff in the order of seconds", () => {
            const attemptNumber = MAX_ATTEMPTS - 1;

            expect(
                retryDelayInMillisecondsForAttemptNumber(attemptNumber)
            ).toEqual(2 ** attemptNumber * 1000);
        });
    });

    describe("at MAX_ATTEMPTS", () => {
        it("return null to signify not trying anymore", () => {
            expect(
                retryDelayInMillisecondsForAttemptNumber(MAX_ATTEMPTS)
            ).toEqual(null);
        });
    });

    describe("above MAX_ATTEMPTS (should never happen)", () => {
        it("return null to signify not trying anymore", () => {
            const attemptNumber = MAX_ATTEMPTS + 1;

            expect(
                retryDelayInMillisecondsForAttemptNumber(attemptNumber)
            ).toEqual(null);
        });
    });
});
