const { parsedCron } = require('./parsed-cron');
const { DAY_OF_MONTH } = require('./intervals');
const range = require('./range');

function cronDiff(cron1, cron2) {
    const {
        values: parsed1,
        count,
        labels,
    } = parsedCron(cron1);

    const {
        values: parsed2,
        count: count2,
    } = parsedCron(cron2);

    if (count != count2) throw Error('Mismatched crons.');

    const response = [];
    let shouldReduce = null;

    for (const label of labels) {
        const interval1 = parsed1[label];
        const interval2 = parsed2[label];

        // covers the same values, including *
        if (interval1 == interval2) continue;

        const diff = interval2 - interval1 - (shouldReduce ? 1 : 0);
        shouldReduce = false;

        if (diff >= 0) {
            response.push({ type: label, value: diff });
        } else {
            if (label == DAY_OF_MONTH) throw Error('We regret to inform it’s not possible to calculate this value for a day of a month.');

            const [min, max] = range(label);
            response.push({ type: label, value: max + 1 - min + diff });
            shouldReduce = true;
        }
    }

    return response;
}

module.exports = cronDiff;
