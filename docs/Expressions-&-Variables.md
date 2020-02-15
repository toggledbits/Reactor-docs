## Overview 

Reactor allows you to define variables that are the result of expressions. The expressions can reference device state variables and other Reactor variables, and support a rich set of operators and functions. The result of the expression evaluations are stored on the ReactorSensor in device state variables, and so are available to conditions in the current and other ReactorSensors (as well as Lua, PLEG, and other facilities that can use state variables).

Expressions are written "in-fix," such as `(Temp-32)/9*5`. If you are familiar with JavaScript, Lua, C, or really most calculators (except notably RPN), the expression syntax should be familiar. The expressions are evaluated using LuaXP, which is a stand-alone Lua library I separately developed for parsing expressions (it's also used by SiteSensor). For general information, refer to the LuaXP documentation for [general expression syntax](https://www.toggledbits.com/luaxp/expressions) and the [core function library](https://www.toggledbits.com/luaxp/functions).

Expressions give you many important benefits. Among the most important is that it allows you to perform arithmetic on state variable values before they are used in conditions, so you can do things like convert between degrees Fahrenheit and Celsius, scale or round values, etc. For example, to retrieve the current temperature from a sensor named "Multi Temp 1" that returns its value in degrees Celsius, and convert it to degrees Fahrenheit, you could use this expression:

`getstate( "Multi Temp 1", "urn:upnp-org:serviceId:TemperatureSensor1", "CurrentTemperature" ) * 9 / 5 + 32`

The `getstate()` function is described in default below, but its function is to get the value of a state variable from a device so you can the value in an expression.

Another benefit of expressions is that they allow you to make more complex comparisons than Reactor's intentionally-simple condition editor would otherwise allow. For example, you can compare the value from one device state variable to that of another (which is not possible directly in the condition editor). Let's say we wanted to make a ReactorSensor that trips when the outdoor temperature is 10 or more degrees warmer than the indoor temperature. This takes two simple steps:

1. Define a variable called `HotOutside` with the expression `getstate("Outdoor Temp", "urn:upnp-org:serviceId:TemperatureSensor1", "CurrentTemperature") >= ( 10 + getstate("Indoor Temp", "urn:upnp-org:serviceId:TemperatureSensor1", "CurrentTemperature") )`
Notice we are using two getstate() calls for separate devices in the same expression--that's fine, in fact, as many as you want/need. Also note we've carefully matched our parentheses on the right side of the ">=" operator. Because we are using a comparison operator, the result of the expression will be boolean, with a value of 0 for false and 1 for true.
2. Define a (service) condition that checks if `HotOutside` is not equal to zero. Any time the variable's value is not zero, the condition will be true, and if that's the only condition in the ReactorSensor, the sensor will trip. The sensor will untrip when the variable goes back to zero (i.e. the temperature differential is less than 10 degrees).

## Expression-less Variables

It is possible to create a variable that has no expression associated with it. These "expression-less" variables can be used for temporary storage or other purposes. They can be set either by using the [*Set Variable* action](Set-Variable-Action.md) in a ReactorSensor's "Activity" tab, or by invoking the `SetVariable` UPnP action on a ReactorSensor from an external source (e.g. Lua, HTTP request, etc.).

A common use of expression-less variables is to store the value of a device's state before changing it in an Activity, so you can have another Activity restore it to that prior, saved value later.

## Reactor-specific Functions

There are a couple of extra functions defined by Reactor as extensions to LuaXP:

### `finddevice( deviceSpec )` 
This function will return the Luup device number of the first device matching `deviceSpec` (a string value, device name or UDN). The comparison is not case-sensitive.

    finddevice( 42 )
    finddevice( "Bathroom Humidity" )
    finddevice( "uuid:4d494342-5342-5645-0054-000002fb3f6d" )

### `getstate( device, serviceId, variableName [, trouble [, watch]] )`
This will probably be the function you use most frequently--it returns the value of the specified state variable (identified by both `serviceId` and `variableName`) for the specified `device`. If the `device` argument is a number, it is used as a device number; if it is a string, it may be a UDN or device name.

`getstate( "Multi Temp 1", "urn:upnp-org:serviceId:TemperatureSensor1", "CurrentTemperature" ) * 9 / 5 + 32`

Note that the `getstate()`'s `device` argument performs the function of `finddevice()` internally, so it is not necessary to use both. The whitespace in the example is for clarity only and may be omitted (except for that in the string "Multi Temp 1", which must match exactly any whitespace used in the device name).

!!! info "How to build a `getstate()` call quickly"
    For new players, finding the service ID and variable name can be a little challenging, and even for old-timers, typing the long service IDs is a nuisance and error-prone. To make life easier, there's a "getstate() insert tool" that will build and insert a `getstate()` for you. Click the ![material design memory icon](images/md-btn-memory.png) icon on the expression row to build and insert the function at the expression's current insertion point.

The return value of `getstate()` is always a string (unless there is an error, such as the device not being found, in which case it may be *null*). To use the return value in other expressions, you may need to convert it to another data type (e.g. use `tonumber()` to convert it to a number).

In most cases, you will only need to call `getstate()` with three arguments. But there are two additional arguments you may find useful: `trouble` and `watch`. 

The optional `trouble` argument determines `getstate()`'s behavior when the specified device does not exist: if *false* (the default), *null* is returned for the state variable's value; if *true*, an evaluation error is thrown and the trouble flag is set on the ReactorSensor.

The optional `watch` argument alters Reactor's default determination of whether a watch is placed on the subject state variable. By default, all state variables in devices other than the current ReactorSensor will be watched when `getstate` is used on them; this causes immediately re-evaluation of the expression whenever the state variable changes. State variables on the current ReactorSensor, however, are not watched. This is a protective mechanism to prevent infinite loops where observed data causes the observed data to change in an unending, machine-speed cycle that ends up tripped Reactor's [throttling](Throttling.md). To force a ReactorSensor to watch its own state variable, specific `watch` *true*. To force a ReactorSensor to not watch a state variable on another device that it normally would watch, pass `watch` *false*. Note that when passing `watch`, you must also pass `trouble`, to maintain the position of the argument.

The expression tools area has a "getstate() insert tool" (![material design memory icon](images/md-btn-memory.png)) icon botton to make the process of finding the device number or name, service Id, and state variable more friendly. Users are recommended to use this tool rather than "free-handing" the use of this function.

### `getattribute( device, attributeName )`
This function fetches the value of an attribute of the specified `device`. For example, `getattribute( 'Hall Motion Sensor', 'category_num' )` would fetch the device category number currently assigned to the device named "Hall Motion Sensor"

### `stringify( expression )`
This function converts the result of the given expression to a string value that can be safely stored in Luup state variables (which only store strings) or for display. For example, the expression `list(51, 88, 4)` returns an array, which is a non-primitive type that cannot be stored in a state variable. To convert it to a string, we would use `stringify( list( 51, 88, 4 )`, which would produce `"[51,88,4]"`. This string can be converted back to an array using `unstringify()` below.

!!! info
    It is not necessary to `stringify()` expressions that are marked exported. Reactor will automatically stringify any non-primitive type before storing it on the export state variable.

### `unstringify( stringified_data )`
This function undoes the effect of `stringify()`, so that you can again use the non-primitive data that was stored. This function also decodes JSON data to make it accessible. Working from the example in `stringify()` above, `len( unstringify( "[51,88,4]" ) )` would return 3 (the length of the array), while `max( unstringify( "[51,88,4]" ) )` would return 88 (the largest numeric value in the array).

If you are using an expression to read an exported expression value from another ReactorSensor, you may need to use `unstringify()`, depending on how you intend to use the value. Remember that all state variables are strings, and `getstate()` only returns strings, so conversion may be necessary.

### `arraypush( array, newElement, maxSize )`
This function is meant to assist in the construction of series data. It pushes the value of the `newElement` argument onto the end of the specified `array`, and returns the updated array. If the array does not exist, it is created. The `maxSize` argument sets the maximum length of the array; if an element is added that causes the array to exceed this number, the oldest elements are dropped to conform to the required limit. 

A typical use might look something like this:

??? Insert image of expression gathering temperature and storing on array.

The first expression gets the current temperature from a temperature sensor. The second expression pushes the temperature measurement on the array. As shown, this array will grow to contain and maintain the last five temperature updates from the temperature sensor.

### `sum( arg1 [, arg2 [, ...] ] )`
This function returns the sum of its arguments. If any argument is an array, the elements of the array are summed.

Want to create an average (mean)? Also see `count()` below.

### `count( arg1 [, arg2 [, ...] ] )`
This function returns the count of non-null arguments. If any argument is an array, the elements of the array are counted.

The mean (average) of the temperature series in the `arraypush()` example above could be computed as `sum( array ) / count( array )`.

## LuaXP Built-in Functions

In addition to the functions above, all of LuaXP's built-in functions are supported. The full list of these functions can be found in the [LuaXP function library documentation](https://www.toggledbits.com/luaxp/functions).

## Using Expression Results
Expression results can be used in other expressions in the same ReactorSensor by simply referring to the variable by name:

    TempC: getstate( "Multi Temp 1", "urn:upnp-org:serviceId:TemperatureSensor1", "CurrentTemperature" )
    TempF: TempC * 9 / 5 + 32

Expression results can also be used in the value fields of Conditions, and the parameters of Actions. This is where they are very powerful. For example, you can have an expression compute the desired brightness for a light at a certain time of day, then have an action use that brightness value when turning on a light 
in response to conditions met. To use a variable in a condition or action, just surround its name in "curly braces", for example: `{brightness}`.

## Exporting Result Values

Exporting a variable/result makes it available outside of the ReactorSensor that defines it. This is done by writing its value to a state variable of the same name on the ReactorSensor in the `urn:toggledbits-com:serviceId:ReactorValues` service.

To export a value, check the "export" icon button (![Export button](images/md-btn-export.png))in the variable's tools. When a variable/expression is exported, its "export" button is highlighted green.
![Export button highlighted](images/md-btn-exported.png)

You'll likely find that most variables you create are only used within the context of the defining ReactorSensor; it is not necessary to export these values, since only that ReactorSensor references them. This includes any values created by interstitial variables created when breaking up complex expressions into smaller pieces/individual steps.

Export a value when you have a device or service *outside the ReactorSensor* that needs to access the value, such as another ReactorSensor using it in a condition, or when using the dataMine/dataMine2 plugin to collect and graph the values.

!!! info
    Prior to Reactor version 3.3, all Reactor variables were unconditionally exported. As of 3.3, exporting is user-configurable. The default for all *new* variables is *not exported*; however, in order to maintain backward compatibility with configurations created prior to 3.3, the default for all existing variables (i.e. those created in versions 3.2 and earlier) is *exported*.

Because exporting means storing the value on a Luup state variable, and all state variable values in Luup are strings, all exported values are thus stored as strings. Numbers simply become the string representation of their value (e.g. 123 becomes the string "123"). Booleans are mapped to "0" for `false` and "1" for `true`. All non-primitive types (i.e. not number, boolean, string, or `null`) are JSON-encoded, creating a string. To use the exported string in another ReactorSensor and get it back to its original data type, it may be necessary to use functions like `tonumber()` or `unstringify()` (see above).
