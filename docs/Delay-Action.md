# Delay Action

The _Delay_ action delays the execution of the actions that follow it in the activity. You can delay execution relative to the current time (that is, the exact time at which this Delay action is encountered), or relative to the time at which the activity started (that is, the time the first action in the Activity was evaluated).

You can use the result of a variable/expression as the delay time by surrounding its name in "curly braces" (e.g. `{someName}`).

## Counter-Activities

Delayed actions in an activity are run unless the group's "counter-activity" is started. The counter-activity is the activity for the opposite state of the group; that is, the counter-activity to a group's "is TRUE" activity is its "is FALSE" activity, and vice versa. For example, let's say you have a group with an "is TRUE" activity that turns on a light, delays 60 seconds, and then turns off the light. If the group goes *false* during the delay period, and there are actions in the "is FALSE" activity for the group, then the "is TRUE" activity is aborted (and therefore never turns off the light) before the "is FALSE" activity is started. In this case, we would want to ensure that the "is FALSE" activity also turns off the light.

If the counter-activity contains no actions, the running activity is not affected and will complete as expected.

