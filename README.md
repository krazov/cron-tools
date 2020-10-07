# cron-tools

Tools for cron value

---

Let the test suite speak for itself,

```
cronDiff(..)
    for crons with one value,
        ✓ should work with a positive diff of minutes (4 ms)
        ✓ should work with a negative diff of minutes
        ✓ should work with a positive diff of hours (1 ms)
        ✓ should work with a negative diff of hours
        ✓ should work with a positive diff of day of a month
        ✓ should throw an error for a negative diff of days of a month (3 ms)
        ✓ should work with a positive diff of months
        ✓ should work with a negative diff of months (1 ms)
        ✓ should work with a positive diff of days of a week
        ✓ should work with a negative diff of days of a week (1 ms)
        ✓ should recognise 7 as Sunday, apart from 0
    for crons with hours and minutes,
        ✓ should work with both positive diffs of minutes and hours (1 ms)
        ✓ should work with a negative diff of minutes and a positive diff of hours
        ✓ should work with a positive diff of minutes and a negative diff of hours (1 ms)
        ✓ should work with a negative diff of minutes and a negative diff of hours
```
