const {
    SECOND,
    MINUTE,
    HOUR,
    DAY_OF_MONTH,
    MONTH,
    DAY_OF_WEEK,
} = require('./intervals');

function daysInMonth(month) {
    switch (Number(month)) {
        case 1: return 31;
        case 2: return 28;
        case 3: return 31;
        case 4: return 30;
        case 5: return 31;
        case 6: return 30;
        case 7: return 31;
        case 8: return 31;
        case 9: return 30;
        case 10: return 31;
        case 11: return 30;
        case 12: return 31;
    }
}

function range(interval, { month = 1 } = {}) {
    switch (interval) {
        case DAY_OF_WEEK: return [0, 6];
        case MONTH: return [1, 12];
        case DAY_OF_MONTH: return [1, daysInMonth(month)];
        case HOUR: return [0, 23];
        case MINUTE: return [0, 59];
        case SECOND: return [0, 59];
    }
}

module.exports = range;
