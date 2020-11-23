const { parsedCron } = require('./parsed-cron');

describe('parsedCron', () => {
    it('should return parsed cron: "15 4 3 2 1"', () => {
        const actual = parsedCron('15 4 3 2 1');
        const expected = {
            labels: ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'],
            values: {
                dayOfWeek: '1',
                month: '2',
                dayOfMonth: '3',
                hour: '4',
                minute: '15',
            },
            count: 5,
        };

        expect(actual).toMatchObject(expected);
    });

    it('should return parsed cron: "15 * * * *"', () => {
        const actual = parsedCron('15 * * * *');
        const expected = {
            labels: ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'],
            values: {
                dayOfWeek: '*',
                month: '*',
                dayOfMonth: '*',
                hour: '*',
                minute: '15',
            },
            count: 5,
        };

        expect(actual).toMatchObject(expected);
    });
});
