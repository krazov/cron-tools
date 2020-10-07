const { intervals } = require('./intervals');

function parsedCron(cron) {
    const array = cron.split(/\s/);
    const count = array.length;
    const withSeconds = count == 6;
    const labels = intervals({ withSeconds });

    const values = {};

    for (let i = 0; i < count; i++) {
        values[labels[i]] = array[i];
    }

    return { labels, values, count };
}

module.exports = { parsedCron };
