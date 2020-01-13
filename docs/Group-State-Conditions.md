# Group State Conditions

_Group State_ conditions allow you to test the state of another group in the
current ReactorSensor or another ReactorSensor. A _Group State_ condition refers to a 
ReactorSensor and group. It can respond to three operations: group _is TRUE_,
group _is FALSE_, and group state has _changed_.

![Two Group State conditions](images/group-state-condition.png)

_Group State_ conditions set the stage for [creating modular logic](Modular-Logic.md).

When choosing groups within the same ReactorSensor, the menu will not display
any group that is an ancestor of the condition, or siblings or their children
of the condition, as these could create a "logic loop."

> IMPORTANT: If you refer to groups in _other_ ReactorSensors, Reactor **does not** check for loops. That is, if group A in one RS refers to group B in another, and group B refers back to group A, that is a logic loop. Be careful in setting up your logic to not create such loops, as they may affect Reactor performance, system performance, and system stability (such tight loops cause high CPU utilization that may lead to crashes and/or reboots). _"With great power comes great responsibility."_ --[many](https://quoteinvestigator.com/2015/07/23/great-power/)