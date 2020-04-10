# Expression Variable Condition

The _Expression Variable_ condition tests the value of a specified Expression in the current ReactorSensor.

![An Expression Variable condition](images/expression-variable-condition.png)

It is possible to make both string and mathematical comparisons. It is also possible to use variable references in the operand(s) (e.g. `{varname}`). All of the same operators available to [*Device State*](Device-State-Conditions.md) conditions are available with the following exceptions:

1. The `updates` operator used with *Device State* actions is not available;
2. The `is NULL` operator may be used to detect `null` expression results (you can also compare to an empty string because null is coerced to an empty string for string comparisons, but doing that you then cannot differentiate between an empty string an `null`).

The expression/variable must exist at the time the condition is created. You will need to visit the Expressions tab to create your variable prior to creating an instance of this condition type.

If you want to test an expression/variable in a different ReactorSensor, use the *Device State* condition. The expression must also be marked for export in that ReactorSensor. 

!!! info "It's a Short-cut"
    The _Expression Variable_ condition is largely a shortcut for a _Device State_ condition to access an expression/variable in the current ReactorSensor. It is faster and more efficient, and should be used in preference to the _Device State_ condition in those conditions.