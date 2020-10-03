const parsedCron = require('./parsed-cron');
const { intervals, DAY_OF_MONTH } = require('./intervals');
const range = require('./range');

function cronDiff(cron1, cron2) {
    const parsed1 = parsedCron(cron1);
    const parsed2 = parsedCron(cron2);

    const itemsCount = Math.min(Object.keys(parsed1), Object.keys(parsed2));
    const withSeconds = itemsCount == 6;

    const response = [];

    for (const interval of intervals({ withSeconds })) {
        const int1 = parsed1[interval];
        const int2 = parsed2[interval];

        // covers the same values, including *
        if (int1 == int2) continue;

        const diff = int2 - int1;

        if (diff > 0) {
            response.push({ type: interval, value: diff });
        } else {
            if (interval == DAY_OF_MONTH) throw Error('We regret to inform it’s not possible to calculate this value for a day of a month.');

            const [min, max] = range(interval);
            response.push({ type: interval, value: max + 1 - min + diff });
        }
    }

    return response;
}

module.exports = cronDiff;
