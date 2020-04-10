# Weekday Conditions

_Weekday_ conditions allow you to create triggers for certain days of the week, and in particular, on certain days of the month. This allows you to trigger, for example, every Monday, Wednesday, and Friday; or every second Sunday of each month. Simply select the days of the week on which the condition should be true, and select the ordinal for the day, which is "Every" by default, but can also be one of "First", "Second", "Third", "Fourth", "Fifth" or "Last".

![A Weekday Condition](images/weekday-condition.png)

!!! attention
    If your logic relies on accurate time, please see the "CLOCK INVALID" topic in the [FAQ](FAQ.md). There are conditions under which the system clock can be completely invalid, and steps you can take to prevent undesirable behavior when this occurs.