# Simplifying Logic

> This page is very much a work in progress. Suggestions and contributions would be appreciated (that applies everywhere in these docs).

It's easy to get overwhelmed by complexity when creating logic conditions, so here are a couple of pointers to help you achieve your goals.

## Writing It Out

One way to make the structure of your logic more clear is to write it out as a formula. Let's use an example:

Let's say we want our ReactorSensor to trip when any of three lights are on, and it's after sunset or before 7:00am, and the "Party Mode" virtual switch is OFF.

Taking this one step at a time, we first need to know if any of three lights are on. That is an "OR" operation, and replacing the details of the test of each light with just a letter as a placeholder, we can say it as "if A is on or B is on or C is on" or simply "if A or B or C." We can write it as a formula like this: `(A OR B OR C)`. Remember, we're just writing for human readability at the moment, to expose structure of how our logic will be created in Reactor--we're not creating the actual conditions yet.

We have two other tests: whether it's after sunset and before 7am, and whether the party mode switch is on. The first one is easy. We'll replace the details with letters as we did before: `(D OR E)`, where D represents the test for after sunset, and E represents the test for before 7am. That leaves the party mode switch test, which can simply be `F`.

Are you starting to see what we're getting to? Each of these is grouped by parentheses so it makes a correct, standalone logic element. Now we can combine our logic elements into one bigger formula. Since the overall goal is for the ReactorSensor to be true when *all* of these elements are true, it's this: `( (A OR B OR C) AND (D OR E) AND F )`

We now have the structure of logic groups for our ReactorSensor! The parentheses expose our groups:

* The "root" group (top group of the ReactorSensor) is an AND group containing three other groups;
* The first subgroup is the light on test (`A OR B OR C`). This is an OR subgroup containing the three light switch device state conditions;
* The second subgroup is the sunset/time test (`D OR E`), containing a Sunrise/Sunset condition with the "after" operator, and a Date/Time condition with a time specification;
* The third subgroup is the party mode switch device state condition; you can do this in a group, but since it's a single condition, putting it in its own group is redundant, so it can simply be added directly to the root group.

## Reducing Your Logic

Some logic operations can be reduced to simpler logic operations. For the uninitiated, this can be one of the most complex areas of logic (in general, not specifically Reactor or any tool).

Reducing logic is the process of taking a set of logic operations and reducing them to their simplest form. Let's again start with an example: let's say we want a lighted turn off when two motion sensors are not tripped. If we assign the state of the motion sensors to the letters *A* and *B*, the signal to turn the light off is expressed by the formula `NOT A AND NOT B`. This can be reduced, rewritten as `NOT ( A OR B )`. The interior group `( A OR B )` is *true* if either sensor is tripped. The `NOT` inverts that--if either sensor is tripped, the result is *false*, and is only *true* if *A* and *B* are both *false* (i.e. `false OR false = false` so `NOT ( false OR false ) = true`).

There are some well known reductions for logic, referred to as De Morgan's Law, and they are:

* `NOT ( A AND B ) = ( NOT A ) OR ( NOT B )`
* `NOT ( A OR B ) = ( NOT A ) AND ( NOT B )`

These apply in either direction, so if your logic looks like the right side, you can restructure it to look like the left, or vice versa. Which is simpler really depends on your usage and sensibilities. Always choose the form that's easiest for you to read and interpret later, after you haven't looked at the logic for a long time. Of course, using *Comment* conditions for documenting your work is also recommended--that's exactly why it's there.

Sometimes you can simplify by distributing terms:

* `(A OR C) AND (B OR C) = (A AND B) OR C`

* `A AND (A OR B) = A`
* `A OR ( ( NOT A ) AND B ) = A OR B`

And of course, the identities:

* `A AND A = A`
* `A OR A = A`
* `A AND ( NOT A ) =` always *false*
* `A OR ( NOT A ) =` always *true*

There's a really cool online tool that reduces logic for you: https://www.dcode.fr/boolean-expressions-calculator , but I would encourage you to use it only to check your work, because the practice builds skill.

Keep in mind that in Reactor conditions, the parentheses above are represented by condition groups.

Another thing to keep in mind is that `NOT` doesn't always require a group. Sometimes, you can (and should) just modify the condition itself. For example, if we want to test that a light is not on, we could test "Status is TRUE" (light on) and use a wrapping group with a "NOT" operator to invert that, but it's obvious and much simpler to just if the light is off (it only has two possible states--on and off) and make the condition test "Status IS FALSE". Another example is if the temperature at a sensor is *not greater than or equal to* 85F--in other words, it's *less than* 85F. You can choose a different operator to avoid the "NOT" wrapper group.

Finally, learn how Reactor's [Modular Logic](Modular-Logic.md) works. By using modular logic, you can break down complex logic into simpler building blocks, and then reassemble those blocks using *Group State* conditions into the more complex overall logic, with the advantage that each block is easier to understand, and is more easily tested for correctness and tracked on the Status tab display. And it may be reusable within the same ReactorSensor or by another (*Group State* conditions let you test groups in the same RS or another).