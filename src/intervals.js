const SECOND = 'second';
const MINUTE = 'minute';
const HOUR = 'hour';
const DAY_OF_MONTH = 'dayOfMonth';
const MONTH = 'month';
const DAY_OF_WEEK = 'dayOfWeek';

function intervals({ withSeconds = false }) {
    return withSeconds
        ? [SECOND, MINUTE, HOUR, DAY_OF_MONTH, MONTH, DAY_OF_WEEK]
        : [MINUTE, HOUR, DAY_OF_MONTH, MONTH, DAY_OF_WEEK]
}

module.exports = {
    SECOND,
    MINUTE,
    HOUR,
    DAY_OF_MONTH,
    MONTH,
    DAY_OF_WEEK,
    intervals,
};
