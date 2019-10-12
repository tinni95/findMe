export const MAX_ATTEMPTS = 5;

/**
 * Exponential back-off with termination.
 *
 * @param {number} attemptNumber The number of the current retry attempt.
 * @returns {(number|null)} Number of milliseconds to wait for before trying again, or null to signify not to retry anymore.
 */
export const retryDelayInMillisecondsForAttemptNumber = attemptNumber => {
    if (attemptNumber >= MAX_ATTEMPTS) return null;

    return 2 ** attemptNumber * 1000;
};
