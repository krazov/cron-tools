const { parsedCron } = require('./parsed-cron');
const { DAY_OF_MONTH } = require('./intervals');
const range = require('./range');

const emptyStringError = 'C’mon, empty string?';
const mismatchedError = 'We regret to inform that crons are mismatched, thus, cannot be compared.';
const dayOfMonthError = 'We regret to inform that it’s not possible to calculate this value for a day of a month.';

function cronDiff(cron1, cron2) {
    if (cron1 === '' || cron2 === '') throw Error(emptyStringError);

    const {
        values: parsed1,
        count,
        labels,
    } = parsedCron(cron1);

    const {
        values: parsed2,
        count: count2,
    } = parsedCron(cron2);

    if (count != count2) throw Error(mismatchedError);

    const response = [];
    let shouldReduce = null;

    for (const label of labels) {
        const interval1 = parsed1[label];
        const interval2 = parsed2[label];

        if (interval1 == interval2 && interval1 == '*') continue;

        const diff = interval2 - interval1 - (shouldReduce ? 1 : 0);

        if (Number.isNaN(diff)) throw Error(mismatchedError);

        shouldReduce = false;

        if (diff >= 0) {
            response.push({ type: label, value: diff });
        } else {
            if (label == DAY_OF_MONTH) throw Error(dayOfMonthError);

            const [min, max] = range(label);
            response.push({ type: label, value: max + 1 - min + diff });
            shouldReduce = true;
        }
    }

    return response;
}

module.exports = cronDiff;
