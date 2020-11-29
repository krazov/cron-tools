const cronDiff = require('./cron-diff');

describe('cronDiff(..)', () => {
    describe('generally speaking,', () => {
        it('should return object with 0 value if there were values and skip if had stars', () => {
            const actual = cronDiff('10 3 * * *', '10 4 * * *');
            const expected = [
                {
                    type: 'minute',
                    value: 0,
                },
                {
                    type: 'hour',
                    value: 1,
                },
            ];

            expect(actual).toMatchObject(expected);
        });
    });

    describe('for incorrect values,', () => {
        it('should reject handling empty crons', () => {
            expect(() => { cronDiff('', ''); }).toThrowError();
        });

        it('should reject handling mismatched crons', () => {
            expect(() => { cronDiff('10 * * * *', '* 4 * * *'); }).toThrowError();
        });
    });

    describe('for crons with one value,', () => {
        it('should work with a positive diff of minutes', () => {
            const actual = cronDiff('10 * * * *', '15 * * * *');
            const expected = [{
                type: 'minute',
                value: 5,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a negative diff of minutes', () => {
            const actual = cronDiff('15 * * * *', '10 * * * *');
            const expected = [{
                type: 'minute',
                value: 55,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a positive diff of hours', () => {
            const actual = cronDiff('* 10 * * *', '* 11 * * *');
            const expected = [{
                type: 'hour',
                value: 1,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a negative diff of hours', () => {
            const actual = cronDiff('* 11 * * *', '* 10 * * *');
            const expected = [{
                type: 'hour',
                value: 23,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a positive diff of day of a month', () => {
            const actual = cronDiff('* * 10 * *', '* * 28 * *');
            const expected = [{
                type: 'dayOfMonth',
                value: 18,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should throw an error for a negative diff of days of a month', () => {
            expect(() => { cronDiff('* * 11 * *', '* * 10 * *'); }).toThrowError();
        });

        it('should work with a positive diff of months', () => {
            const actual = cronDiff('* * * 1 *', '* * * 3 *');
            const expected = [{
                type: 'month',
                value: 2,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a negative diff of months', () => {
            const actual = cronDiff('* * * 3 *', '* * * 1 *');
            const expected = [{
                type: 'month',
                value: 10,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a positive diff of days of a week', () => {
            const actual = cronDiff('* * * * 1', '* * * * 5');
            const expected = [{
                type: 'dayOfWeek',
                value: 4,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a negative diff of days of a week', () => {
            const actual = cronDiff('* * * * 6', '* * * * 0');
            const expected = [{
                type: 'dayOfWeek',
                value: 1,
            }];

            expect(actual).toMatchObject(expected);
        });

        it('should recognise 7 as Sunday, apart from 0', () => {
            const actual = cronDiff('* * * * 1', '* * * * 7');
            const expected = [{
                type: 'dayOfWeek',
                value: 6,
            }];

            expect(actual).toMatchObject(expected);
        });
    });

    describe('for crons with hours and minutes,', () => {
        it('should work with both positive diffs of minutes and hours', () => {
            const actual = cronDiff('10 3 * * *', '15 4 * * *');
            const expected = [
                {
                    type: 'minute',
                    value: 5,
                },
                {
                    type: 'hour',
                    value: 1,
                },
            ];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a negative diff of minutes and a positive diff of hours', () => {
            const actual = cronDiff('20 3 * * *', '15 4 * * *');
            const expected = [
                {
                    type: 'minute',
                    value: 55,
                },
                {
                    type: 'hour',
                    value: 0,
                },
            ];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a positive diff of minutes and a negative diff of hours', () => {
            const actual = cronDiff('10 4 * * *', '15 3 * * *');
            const expected = [
                {
                    type: 'minute',
                    value: 5,
                },
                {
                    type: 'hour',
                    value: 23,
                },
            ];

            expect(actual).toMatchObject(expected);
        });

        it('should work with a negative diff of minutes and a negative diff of hours', () => {
            const actual = cronDiff('20 4 * * *', '15 3 * * *');
            const expected = [
                {
                    type: 'minute',
                    value: 55,
                },
                {
                    type: 'hour',
                    value: 22,
                },
            ];

            expect(actual).toMatchObject(expected);
        });
    });

    describe('for crons with day of the month and month,', () => {
        it('should calculate days of the month for the consecutive months: 31 days', () => {
            const actual = cronDiff('* * 4 3 *', '* * 3 4 *');
            const expected = [
                {
                    type: 'dayOfMonth',
                    value: 30,
                },
                {
                    type: 'month',
                    value: 0,
                },
            ];

            expect(actual).toMatchObject(expected);
        });

        it('should calculate days of the month for the consecutive months: 30 days', () => {
            const actual = cronDiff('* * 4 4 *', '* * 3 5 *');
            const expected = [
                {
                    type: 'dayOfMonth',
                    value: 29,
                },
                {
                    type: 'month',
                    value: 0,
                },
            ];

            expect(actual).toMatchObject(expected);
        });

        it('should throw an error for the consecutive months: 28 days (but no year)', () => {
            expect(() => { cronDiff('* * 4 2 *', '* * 3 3 *'); }).toThrowError();
        });
    });
});
