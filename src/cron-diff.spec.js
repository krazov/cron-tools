const cronDiff = require('./cron-diff');

describe('cron-diff', () => {
    describe('simple tests, with one value', () => {
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
            const actual =

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
});