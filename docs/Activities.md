#Activities

Reactor can run actions directly, without relying on Vera scenes.
These _Activities_ are run when a condition group changes state (e.g. from _false_ to _true_ or vice versa). Each condition group has two Activities: one for when the group becomes *true*, and one for when the group becomes *false*. An Activity can have one or more *actions*, which are the individual steps to be taken in response to group's change of state.

The following action types are available in Reactor Activities:

* [Device Action](Device-Action.md) - Run an action on a device (e.g. turn a light on or off, change dimming level or thermostat mode, etc.);
* [Delay](Delay-Action.md) - Delay execution of subsequent actions in the Activity;
* [Change House Mode](Change-House-Mode-Action.md) - Change the current house mode;
* [Run Lua](Run-Lua-Action.md) - Run a Lua script;
* [Run Scene](Run-Scene-Action.md) - Run a Vera scene;
* [Run Activity](Run-Activity-Action.md) - Start another group's Activity;
* [Notify](Notify-Action.md) - Send a notification;
* [Set Variable](Set-Variable-Action.md) - Set a ReactorSensor variable's value;
* [Reset Latched](Reset-Latched-Action.md) - Reset latched conditions in a group
* [HTTP Request](HTTP-Request-Action.md) - HTTP GET or POST request to a remove server/service
* [Comment](#comment-action) - A comment to help you document your Activity.

## The Activities Tab

The _Activities_ tab of your ReactorSensor is where you will define and edit the actions your ReactorSensor performs.

![The Activities Editor](images/activities-editor.png)

Starting at the top of the screenshot the "Show Activities" dropdown (A) lets you choose which Activities are shown. Because there are two Activities for each group, the list can get quite long quickly, and often only a couple of the Activities are actually used, so this menu lets you filter the view. For example, if you choose "In Use", the view will only show Activities that have actions in them.

Each Activity has an action list: the list of actions it will perform. Actions are performed in the order shown in this list.

The "Save" and "Revert" buttons (B) appear in each action list header and are used to save the current Activity configured, or revert to the last saved, respectively. The revert is the only "undo" offered, so you are encouraged to save often.

Below that are the actions. Each action has a selectable action type (C), the action parameters (D), and action controls (E). The action parameters (D) vary from action type to action type. The action controls (E) have some standard buttons and some action-specific buttons. You can see from the screenshot that every action has up- and down-arrow buttons, and an "X" button; these are "move up", "move down" and "delete", respectively. The action-specific controls are covered in the description of each action type.

At the bottom of each Activity, below the action list, are two buttons: "Add Action" and "Copy From...". The "Add Action" button adds a new action to the end of the Activity's action list. The "Copy From..." button presents a pop-up menu from which you can select another Activity; the selected Activity's actions will be imported into the current Activity (at the end).

![Action List Footer](images/activity-editor-bottom.png)

## Activities and Action Execution

An Activity can have one or more *actions*. The actions are run sequentially. Actions that spawn Luup jobs (such as turning a Z-Wave device on or off) do not block until the action completes &mdash; the job is submitted and the next action in the Activity is run immediately, and so the next action may complete before the job finishes or perhaps is even started by Luup.

In the discussion of conditions and groups, there is a callout box ("Important Concept!") that states that groups, like any condition, only have two states: *true* and *false*. Activities are only run when the state of a group *changes*, that is, goes from *false* to *true*, or from *true* to *false*. Let's use an example to illustrate why this concept is so important.

Let's say we have a group with two conditions, and it's an OR group, so either condition (or both) being *true* results in the group itself being *true*. We start with both conditions *false*, so the group is also *false*. When one of the conditions goes *true*, the group goes *true*, and any actions in the "is TRUE" Activity for the group are then run. However, if later the second condition in the group also goes *true*, the group is already *true* and does not change state as a result, so the "is TRUE" Activity is not run again.

!!! info "Important Concept"
    As illustrated in the example above, Activities only run once per state transition of their group.

## Activity Delays

Activities can have delays, which pause the run of all actions listed after the delay. Multiple delays are permitted. This is very much like Vera scenes, except that Reactor Activities are durable across reloads and reboots of the system. An interrupted Activity will resume after the restart, and effort is made to keep the delayed actions on schedule. For example, if a delay of 5 minutes in encountered in execution at 2:15:03PM, and a reload or reboot occurs during the delay, the actions would resume at 2:20:03PM as long as the system is up and ready at that time (otherwise, they will occur as soon as the system allows after the scheduled time).

When a group switches between *true* and *false* states, it's possible that delayed actions from the previously-started state's Activity, called the *counter-activity*, are still running or waiting to run. If there are actions for the group's new state, the counter-activity will be stopped &mdash; the delayed actions will be cancelled and not allowed to run. If there are no actions for the group's new state, the counter-activity will be allowed to complete. For example, if you have a ReactorSensor with a *true* Activity that turns on a light, delays 60 seconds, and then turns off the light, and the group goes *false* during the 60-second delay period *and* there are "is FALSE" Activity actions, the turn off of the light will never happen. But, if there are no "is FALSE" actions, the *true* Activity will be allowed to turn off the light as scheduled.

!!! note
    The existence of *any* action, even just a comment, in a group state's Activity is sufficient to stop the counter-activity. So, if you have a *true* Activity with several actions and delays, and you want those to stop on group *false*, putting a comment in the group's "is False" Activity as the sole action is sufficient to stop the *true* Activity.

If your ReactorSensor has several groups with Activities, it is possible for multiple Activities to be run, if several groups change state at the same time and have Activities associated with those states. Group Activities are started first, in a (post-order (LRN) traversal)[https://en.wikipedia.org/wiki/Tree_traversal#Post-order_(LRN)] order; the overall ReactorSensor trip/untrip Activity is the last to be started.

!!! attention "Timing is not guaranteed!"
    The foregoing describes the order in which Activities are *started*. But if, for example, two groups have equal delays, there is no guarantee with respect to which group will resume first when the delay period expires.

## Comment Action

The comment action doesn't actually do anything, it's just a placeholder for text that you can use to document your Activity.

![A Comment "action"](images/comment-action.png)

It does have one special feature: if the first character is a "*", the comment text is written to the ReactorSensor's event log, which can be seen in the Logic Summary (Tools tab).