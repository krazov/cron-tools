const { intervals } = require('./intervals');

function parsedCron(cron) {
    const array = cron.split(/\s/);
    const itemsCount = array.length;
    const withSeconds = itemsCount == 6;
    const labels = intervals({ withSeconds });

    const response = {};

    for (let i = 0; i < itemsCount; i++) {
        response[labels[i]] = array[i];
    }

    return response;
}

module.exports = parsedCron;