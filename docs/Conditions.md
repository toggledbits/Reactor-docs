# Conditions Overview

_Conditions_ are the core of Reactor's programmable logic. It's hard to imagine a useful ReactorSensor that doesn't have at least one condition. A condition is a logic test that Reactor will perform, so in order to make Reactor do something, you have to have at least one condition to test something.

Conditions are organized into one or more _condition groups_. All ReactorSensors contain a group called the _root group_, and it is the group that contains all other groups and conditions. The state of the ReactorSensor overall (its _tripped state_) is also determined by the state of the root group. When the root group is true, the ReactorSensor will be tripped; it is untripped otherwise. 

You may create as many condition groups as you need. Groups can be nested--you can create groups within groups. This allows very complex logic conditions to be created. When writing a logic operation out, such as `( (A OR B OR C) AND (D OR E) AND NOT F )`, the parentheses are groups, so in structuring your conditions in Reactor, it may be helpful to write out your logic in this way before launching into the Conditions editor.

Each condition group has an associate *logic operation*, and the state of the group is the result of that operation performed on the results of the conditions within it:

* `AND` - All conditions in the group must be *true* for the group state to be *true*;
* `OR` - Any condition (one or more) in the group must be *true* for the group state to be *true*; the group is only *false* when *all* of its conditions are *false*;
* `XOR` - Exactly one of the conditions in the group must be *true* for the group state to be *true*; if none or more than one are *true*, the group state is *false*;
* `NOT` - Invert the result of AND/OR/XOR;
* `NUL` - The group state is *null*, which means it does not make a contribution to the logic state of its parent group; logic elements within the NUL group still evaluate and generate results, however, so subgroups of a NUL group can have Activities.

The last group operator, `NUL`, is intended to be used to create [modular logic](Modular-Logic.md). It allows you to make condition groups that may referred to by other conditions, but do not pass their own state upward. It has a similar effect to disabling the group, in that disabled groups do not affect their parent's state, but disabled groups also do not run their condition contents (including subgroups), where `NUL` groups can still evaluate all of their conditions and subgroups and launch activities.

In addition to each condition's specific test operation, most condition types have [condition options](Condition-Options.md) that can be used to further modify their evaluation state, or restrict when the condition is true (for example, only after the test condition has been met for a period of time, or a number of times within a period of time, or in sequence following another condition). See [Condition Options](Condition-Options.md) for full details.

## Creating and Organizing Groups and Conditions
To create a group, one simply clicks on the "New Group" icon at the bottom of the root group or another existing group. The new group will be created as a child of that group. When you create a new group, it will be a default name that is the same as its group ID. You can change the name by clicking on the name in the group's header and entering the new name. Click outside the input field to save the new group name.

To add conditions to a group, click the "New Condition" icon at the bottom of the group. Then select its type and options.

The nesting and ordering of conditions can be changed by drag-and-drop. The "hamburger" icon in the tools area of the condition group (its upper-right corner) can be grabbed and the entire group moved to another position in the hierarchy. Individual conditions can be moved and reorganized in a similar manner.

## Condition Types
A group may thus contain other groups, or conditions. Conditions are the fundamental building blocks of the logic--the tests that can be performed on device or system states.

There are currently eight different condition types:

* [Device State](Device-State-Conditions.md) - Test the various states of devices (e.g. light on/off, volume level, motion detected);
* [Date/Time](Date-Time-Conditions.md) - Test the current date and time;
* [Sunrise/Sunset](Sunrise-Sunset-Conditions.md) - Test the current time against dawn and disk;
* [Day of Week](Weekday-Conditions.md) - Test the current day;
* [Group State](Group-State-Conditions.md) - Test the status of another group in this or another ReactorSensor;
* [House Mode](House-Mode-Conditions.md) - Respond to a change in the house mode;
* [Expression Variable](Expression-Variable-Conditions.md) - Tests the value of an expression variable;
* [Geofence](Geofence-Conditions.md) - Respond to users entering/leaving geofences;
* [Time Interval](Interval-Conditions.md) - Trigger at a fixed, recurring interval;
* [Luup Reload](Other-Conditions.md) - Respond to Luup restarting/the controller rebooting;
* [Comment](Other-Conditions.md) - Just text to help you remember what you did.

## Edge-driven Actions
Reactor's condition results and state changes are edge-driven, which is to say, _changes in state_ cause action, not the states themselves. So, when a condition or group transitions from *false* to *true*, that may cause an action, but the object remaining in *true* state thereafter does not cause those actions to re-run continuously.

On individual conditions, this means that if a condition is _true_ as a result of its operation, it is not "more true" if the underlying value changes and still results in a _true_ evaluation result. For example, if the test expression is "CurrentTemperature >= 50", and the sensor reports 49 first, and then 50, the Reactor condition will change from _false_ to _true_ and Reactor marks the time of the change at that moment. If the sensor then later reports 51, the condition test is still _true_, but that is not a change in condition state, so the condition time is not modified.

At a group level, Reactor handles the group states the same as individual condition states: the _change_ marks time, but a subsequent evaluation yielding the same result (no change) does not modify the time. Groups are, in fact, just handled as a special type of condition within Reactor.

Reactor itself, then, behaves similarly to conditions and groups. Once tripped by the root group becoming _true_, a change in the conditions or groups underlying the root group that still results in a _true_ result leaves the ReactorSensor tripped, and it does not retrigger any activities or scene triggers/watches that may be associated with it (at least, not by default).

As of Reactor 3.0, each group can have its own _activities_, a list of actions to be performed when the group state changes. This sets the stage for [creating modular logic](Modular-Logic.md).

> TIP: Keep this simple rule in mind when creating your logic: group activities and triggers are only fired when there is a _change_ in logical state (_true_ to _false_ or _false_ to _true_).

## Simplifying Your Logic

You'll find your logic can get quite complex pretty quickly, especially when you start adding details and tweaks. You'll often find you even need to completely restructure your logic, as the addition of one more element is a straw that breaks the proverbial camel's back and either makes your logic too complex to understand, or is simply structured in a way that prevents you from easily adding the new conditions to handle the case.

Without going into detail here, there are two additional sections of this Wiki that help you make your logic simpler and therefore more supportable: [Simplifying Logic Expressions](Simplifying-Logic.md) and [Creating Modular logic](Modular-Logic.md).
