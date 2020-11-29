# cron-tools

Tools for cron value

---

Let the test suite speak for itself,

```
  cronDiff(..)
    generally speaking
      √ should return object with 0 value if there were values and skip if had stars (6 ms)
    for incorrect values
      √ should reject handling empty crons (6 ms)
      √ should reject handling mismatched crons (1 ms)
    for crons with one value,
      √ should work with a positive diff of minutes
      √ should work with a negative diff of minutes (14 ms)
      √ should work with a positive diff of hours (1 ms)
      √ should work with a negative diff of hours (1 ms)
      √ should work with a positive diff of day of a month (1 ms)
      √ should throw an error for a negative diff of days of a month (2 ms)
      √ should work with a positive diff of months
      √ should work with a negative diff of months (1 ms)
      √ should work with a positive diff of days of a week
      √ should work with a negative diff of days of a week (1 ms)
      √ should recognise 7 as Sunday, apart from 0
    for crons with hours and minutes,
      √ should work with both positive diffs of minutes and hours (1 ms)
      √ should work with a negative diff of minutes and a positive diff of hours (1 ms)
      √ should work with a positive diff of minutes and a negative diff of hours
      √ should work with a negative diff of minutes and a negative diff of hours (1 ms)
    for crons with day of the month and month
      √ should calculate days of the month for the consecutive months: 31 days
      √ should calculate days of the month for the consecutive months: 30 days (1 ms)
      √ should throw an error for the consecutive months: 28 days (but no year)
```
