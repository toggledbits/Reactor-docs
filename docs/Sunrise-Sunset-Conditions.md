# Sunrise-Sunset Condition

The _Sunrise/Sunset_ condition allows you to create a condition that is active (true) before or after sunrise or sunset, or between sunrise and sunset (or the reverse, for an overnight period). 

![A Sunrise/Sunset Condition](images/sunrise-sunset-condition.png)

The "before" and "after" operators are equivalent to "between" conditions, with the start or end, respectively, being midnight. That is, "before sunset" is equivalent to "between midnight and sunset". The "before" and "after" operators, therefore, work within the context of a day.

The "between" and "not between" operators can span a day (i.e. cross through midnight). If one makes a condition, for example, that is "between sunset and sunrise," then, as should be clear, the condition is active (_true_) throughout the period from sunset through midnight and until sunrise the following day. It is possible and allowed to set a condition to "between sunrise and sunrise" or "between sunset and sunset," and these conditions are always true (as long as their offsets are equal, see below).

The _Sunrise/Sunset_ condition also allows offsets to the specified milestone. For example, one could specify that the condition is active from 30 minutes before sunset ("sunset-30") to 30 minutes after sunrise ("sunrise+30"). The offsets are in minutes, and may be negative or zero.

_Sunrise/Sunset_ conditions also have options for the use of civil, nautical, and astronomical dawn and dusk. All sunrise/sunset condition tests require that your time zone and geographical location be properly configured in the Vera or openLuup settings.

