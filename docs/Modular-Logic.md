# Modular Logic

> This page is very much a work in progress. Suggestions and contributions would be appreciated (that applies everywhere in these docs).

Reactor condition groups have three very important features:

1. They can be nested &mdash; a group may contain other groups;
2. Each group has its own Activities;
3. You can test the state of a group as part of the logic of another group (even across ReactorSensors).

Combined, these features set the stage for _modular logic_, an approach to building
ReactorSensor conditions that allows you to modularize and re-use tests as logic building blocks.

Let's look at a fairly common problem and how we can build it and solve it with
modular logic: a motion-sensor-controlled light, driven by one or more motion sensors,
for which we want full brightness on during the day, but just 33% brightness at night.

First, the goal:

* If motion is sensed, turn the light on.
    * Between the hours of 6am and 10pm, the light turns on at full brightness;
    * Between 10pm and 6am, the light turns on at 33% brightness;
* If no motion is sensed for 15 minutes, the light is turned off.

Let's start by creating two groups in a new ReactorSensor--we'll call the first
"Functions" and the second "Operations." Assign them both the "NUL" operator.

Here's the first important concept: we are not going to use the state of the root
group (which drives the *tripped* state of the ReactorSensor)
or the *Functions* or *Operations* groups for any purpose. They exist only as
organizational tools--folders, if you will--to contain other groups that will do the work.
Using the "NUL" operator on these subgroups means that their state will not percolate up to
the parent's (root) state--their state is ignored.
So the tripped state of the ReactorSensor (driven by the root group) will remain false/untripped,
because the *Functions* and *Operations* groups don't make a contribution to the root group's state.

Underneath the *Functions* group, let's create a sub-group called *Motion Detected*,
with an "OR" logical operation, and within it add *Device State* conditions that examine
the _Tripped_ state variable of each motion sensor (how many is irrelevant at this point). Save
your configuration changes.

We should now be able to observe on the Status tab of our ReactorSensor that any
motion at any motion sensor configured in the *Motion Detected* group causes
that group to go _true_ (highlighted green on the Status tab).

Next, within the *Functions* group, let's create another group called *Daytime* with
an "AND" operator and the single condition of type "Date/Time" with range 06:00 to
22:00. Save.

We now have the two bulding blocks we need to turn on the light. Now, let's use these
building blocks to build the logic to determine brightness and get the light(s) turned
on.

Within the *Operations* group now, create a subgroup called *Lights On Daytime*, using the
"AND" operator, and within it,
ad two "Group State" conditions, each looking at *this ReactorSensor*
(e.g. it's looking at itself, or *self-referencing*). The first condition should look at the *Motion Detected*
group state with an "is TRUE" operator, and the second should look at the *Daytime* group, also with
the "is TRUE" operator.
You should be able to clearly see now that the result of this group will be _true_ when motion is detected 
(group *Motion Detected* is _true_) _AND_ it's daytime (by our definition, i.e. group *Daytime* is _true_). Save.

Next, again within the *Operations* group, create another subgroup called *Lights On Night*,
using the "AND" operator, and place within it two identical conditions to the *Lights On
Daytime* group you just created, but this time, make the operator on the *Daytime* group state
test "is FALSE". Save.

We now have all of the conditions needed to turn the lights on. All we need to 
do is complete our solution by turning the lights off after a period of time. This takes
just one more condition group.

Create a third subgroup under *Operations* called *Motion Timeout*, using the "AND" operation,
and within it, place a single *Group State* condition looking at our (this) ReactorSensor's
*Motion Detected* group with operator "is FALSE". Before you save, click the downward-pointing
arrow in the condition row's right margin, to open up the _Condition Options_ panel.
In the options, in the *Restrictions* section, set the "sustained for" duration to the amount of 
delay you want before turning off the light(s), in seconds (e.g. 1800 is 15 minutes... 15\*60=1800). Then Save.

The logic for our solution is now complete. You should be able to see the modularity in this,
as the *Operations* groups use the logic output of the *Functions* groups repeatedly and in
different ways to make their own results as needed.

All that remains now is for you to assign activities to the *Lights On Daytime* group to turn
the lights on at full brightness (in activity *Lights On Daytime is TRUE*),
and *Lights On Night* to turn them on at 33% (in activity *Lights On Night is TRUE*),
and *Motion Timeout* to turn them all off (in activity *Motion Timeout is TRUE*).

One final note. I've used the names _Functions_ and _Operations_ in this example just to
enforce the concept that the groups under *Functions* are like subroutines (or functions)
being called by the procedures in *Operations*. You can call them anything you wish. The group
names have no signficance to Reactor.

## Use `NUL` Operator for Organizational Groups

It is not always necessary to ignore the state of the root group when using modular logic, and in fact,
it will often be the case that the _Operations_ group contains only a single subgroup with a simple test,
so the extra layer of groups is more of a nuisance than a help in staying organized. It is possible to use
the state of the root group and the ReactorSensor's tripped/untripped state, but in order to do so, we probably
need to eliminate the effect of the _Functions_ group's state (which is probably nonsense) from the state of
the root group.

The `NUL` group operator is specifically for this purpose. The `NUL` group operator causes the state of the
group to which it is assigned to be ignored by its parent group. In this case, if we assign the `NUL` operator
to the _Functions_ group, we make the root group ignore the state of _Functions_, and that allows the other
groups in the ReactorSensor to function as they would normally in determining the state of the root group.

## The Bigger Picture

Because "Group State" conditions can refer to conditions in other ReactorSensors,
it is possible, and maybe even desirable, to place logic in a ReactorSensor whose 
sole purpose is to just be a container for modular components, but doesn't actually
perform any activities itself. These components can be used by other ReactorSensors.
This may be a good way for
you to organize logic in very complex environments, and make it more maintainable,
easier to test, and easier to change when devices are replaced. 
But you may want to resist the
urge to use a single ReactorSensor like this for everything if you have a really
large system and a lot of logic. In that case, it
may be better to organize these "container" modules by function, room, or 
some other grouping (e.g. a group
for all modules related to automating your home theater equipment, but a separate group
for automating the lights and sensors in your home theater). Having large numbers of
conditions in a ReactorSensor can lead to long evaluation times and slow response.
Like any program, the bigger you make it, the longer it will take to execute.

## See Also

Also see [Simplifying Logic Expressions](Simplifying-Logic.md).