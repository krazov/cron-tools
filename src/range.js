const {
    SECOND,
    MINUTE,
    HOUR,
    DAY_OF_MONTH,
    MONTH,
    DAY_OF_WEEK,
} = require('./intervals');

function range(interval) {
    switch (interval) {
        case DAY_OF_WEEK: return [0, 6];
        case MONTH: return [1, 12];
        case DAY_OF_MONTH: return [1, 31];
        case HOUR: return [0, 23];
        case MINUTE: return [0, 59];
        case SECOND: return [0, 59];
    }
}

module.exports = range;
