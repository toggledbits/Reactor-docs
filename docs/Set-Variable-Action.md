# Set Variable Action

The *Set Variable* action allows you to set the value of an expression-less variable.

Expression-less variables are a common Reactor paradigm for storing temporary data, such as the state of a switch or setpoint of a thermostat, before changing it (you can then change it back to that previous value later). To create an expressionless variable, all
you do is create a variable in the "Expressions" tab of your ReactorSensor, but leave the expression field blank. The variable will then have no value other than what you assign to it.

To set a variable value, choose the name of the variable from the dropdown list, and supply a constant value or a variable reference. A variable reference is the name of a variable surrounded by curly braces, such as `{status}`. The value assigned to the chosen variable will be the constant, if specified, or the value of the named variable if a reference was specified.

By default, assigning a new value to a variable does not cause re-evaluation of other variables, even if the changed variable is specifically named in other expressions. However, you can force re-evaluation by checking the "Force re-evaluation of expressions and conditions" checkbox. Whether or not you need it checked depends specifically on your use case and the way you've set up your expressions and conditions; if you're not sure, leave it unchecked (the default) and evaluate your logic performance carefully.

NOTE: You are not allowed to change the value of a variable that has an expression associated with it. These variables always have the last evaluation result, and are read-only.