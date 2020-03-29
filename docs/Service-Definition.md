# Service Definition

This section documents the `urn:toggledbits-com:serviceId:Reactor` and `urn:toggledbits-com:serviceId:ReactorSensor` services. It is intended for advanced Vera and openLuup users that are familiar and comfortable with Lua, device states and actions, etc.

## Generic Service Actions

A ReactorSensor emulates a standard Vera/Luup "security sensor" by implementing the basics of the `urn:micasaverde-com:serviceId:SecuritySensor1` service. This is a carry-over from Reactor's earliest days when its primary function was to be better trigger for Vera scenes. Reactor has since grown outside that role by providing its own [Activities](Activities.md) and other features.

The only action defined by this service is `SetArmed`, which takes a single parameter (`newArmedValue`, with boolean values "0" or "1"), to set or clear the arming state of the sensor. The arming state of a ReactorSensor has no affect on its operation.

## Reactor-Specific Service Actions

ReactorSensors implement a few actions of their own. These provide additional control over the sensor's behavior. All of these actions are in the `urn:toggledbits-com:serviceId:ReactorSensor` service.

### SetEnabled
The "SetEnabled" action takes a single parameter ("newEnabledValue", 0 or 1) to set whether the ReactorSensor is enabled or not. When disabled, a ReactorSensor stops updating and evaluating conditions, and will not change its "Tripped" state.

`luup.call_action( "urn:toggledbits-com:serviceId:ReactorSensor", "SetEnabled", { newEnabledValue=0 }, device_number )`

### Reset
The "Reset" action takes no parameters, and resets the "Tripped" state of the sensor until the next state change and condition evaluation occurs. This is a flag change only; it does not cause any action within the ReactorSensor.

`luup.call_action( "urn:toggledbits-com:serviceId:ReactorSensor", "Reset", { }, device_number )`

### Trip
The "Trip" action takes no parameters, and sets the "Tripped" state of the sensor (to true) until the next condition evaluation and state change occurs. This is a flag change only; it does not cause any action within the ReactorSensor.

`luup.call_action( "urn:toggledbits-com:serviceId:ReactorSensor", "Trip", { }, device_number )`

### Restart
The "Restart" action, which takes no parameters, restarts the ReactorSensor (without reloading Luup). If conditions are changed to introduce new devices/services, the sensor will not know to watch them until it is reset.

`luup.call_action( "urn:toggledbits-com:serviceId:ReactorSensor", "Restart", { }, device_number )`

### ResetRuntime
The "ResetRuntime" action, which takes no parameters, resets the "Runtime" and "TripCount" accumulators, and resets "RuntimeSince" (see below).

`luup.call_action( "urn:toggledbits-com:serviceId:ReactorSensor", "ResetRuntime", { }, device_number )`

### RunScene

The `RunScene` action is an analog to Vera's action of the same name, which runs a scene. Reactor's RunScene, however, can also run group activities in ReactorSensors, and gives you the benefits of Reactor's activity progress tracking, and continuity of delayed scene/activity groups across Luup reloads and reboots. That is, if Luup restarts, or Vera reboots due to a crash or power failure/restore, Reactor will resume running any delayed activity or Vera scene groups, on schedule (or immediately, in correct order, if the scheduled time passed during the event).

```
-- Example 1: Run a Vera scene by number
luup.call_action( "urn:toggledbits-com:serviceId:Reactor", "RunScene", { SceneNum=15 }, reactor_master_device_number )

-- Example 2: Run a Vera scene by name
luup.call_action( "urn:toggledbits-com:serviceId:Reactor", "RunScene", { SceneNum="Outdoor Off" }, reactor_master_device_number )

-- Example 3: Run the true state activity for a ReactorSensor group using the group ID
luup.call_action( "urn:toggledbits-com:serviceId:ReactorSensor", "RunScene", { SceneNum="grp937c83.true" }, reactor_sensor_device_number )

-- Example 4: Run the true state activity for a ReactorSensor group using the group name
luup.call_action( "urn:toggledbits-com:serviceId:ReactorSensor", "RunScene", { SceneNum="Night.true" }, reactor_sensor_device_number )
```

You will note that the first of the above RunScene action examples is very similar to the Vera-native call, with two notable exceptions: (1) the service ID is different (you use Reactor's service ID), and (2) the device number must be that of the Reactor master device or a ReactorSensor (rather than the Vera root device number 0). It is intended to be as direct a replacement as possible.

The `SceneNum` parameter can be a number (or string containing a number, e.g. "15") or a non-numeric string. It is interpreted like this:
1. If a number or string containing a number, the value is assumed to be a Vera scene ID;
2. If the string ends with `.true` or `.false`, it is assumed to refer to a ReactorSensor group activity;
3. Otherwise, the action is assumed to be a Vera scene name (case-insensitive match)

When specifying a ReactorSensor group activity in `SceneNum`, either the group ID or the group name may be used. For example, if the group with id *grp937c83* has name "Night", then the "is true" and "is false" state activities can be selected by specifying either the group ID or name with `.true` or `.false` appended, respectively. Examples three and four above show this--they would run the same activity in this case.

Reactor's RunScene action honors Lua in Vera scenes with the standard Luup behavior: if a Vera scene contains Lua, it will be run first. If the scene Lua explicitly returns boolean *false*, the scene run is aborted (its actions are not run). Otherwise, the scene actions run after the Lua returns. That means that if the Lua returns nothing, `nil`, `true` or any value or type other than exactly boolean *false*, the return value is ignored and the actions run. 

When a ReactorSensor group activity contains "Run Lua" actions, similar semantics are applied as that for Vera scenes. Each "Run Lua" action has the opportunity to prevent the remainder of the group activity from running by returning boolean *false*.

Reactor's RunScene also takes an additional, optional "Options" parameter. The sample below shows how the options are used. Currently, there are only one available option: `stopPriorScenes`.

The `stopPriorScenes` option controls whether the current task list of running scenes is cleared before starting the new scene, or if the new scene is simply added to the list. By default (`stopPriorScenes=false`), Reactor will run every scene you ask it to (i.e. just add the new scene to its list of tasks), so if you call RunScene with 10 different scenes, Reactor will run all 10 scenes, including all their delayed activity groups. If you pass the `stopPriorScenes` option as *true* on a call, however, Reactor will stop execution of any and all scenes started previously that are still running. Thus after such an action, the only scene running will be that requested in the last RunScene action call.

`luup.call_action( "urn:toggledbits-com:serviceId:Reactor", "RunScene", { SceneNum=15, Options={ stopPriorScenes=true } }, reactor_device_num )`

The `Options` parameter may also be passed as a JSON-encoded table (e.g. `"{ "stopPriorScenes": true }"`).

### AddSensor

The `AddSensor` action (in service `urn:toggledbits-com:serviceId:Reactor` only) creates a new ReactorSensor. If the optional parameter "Count" is given, up to 16 new ReactorSensors can be created at once. This always causes a Luup reload (part of the process of creating a child device in Luup). It is not normally called directly--this action can be performed by using the "Add Sensor" button the Reactor root device's control panel.

### SendSMTP

The `SendSMTP` action (in service `urn:toggledbits-com:serviceId:Reactor` only) sends an SMTP message to the configured SMTP server [see Notify Action - SMTP Method](Notify-Action.md). The action's parameters are:

* `To` - (required) A comma-separated list (if more than one) of recipient email addresses (see form below);
* `Body` - (required) the body of the email message (plain text only);
* `Subject` - The subject of the email message (plain text only; blank if not supplied);
* `From` - The "from" address used for the envelope (if not supplied, the configured "From" address will be used);
* `Cc` - A comma-separated list of additional recipients for the message (these will appear in the Cc header of the message);
* `Bcc` - A comma-separated list of blind-copied recipients that will receive the message but not be visible in the message headers or envelope.

Email addresses specified must be in either of the following forms:

1. "Simple" form: `somebody@example.com`
2. "Nominative" form: `John Doe <johndoe@example.com>` -- in this form, the human-readable name is supplied, and the email address is wrapped in `<>`; the human-readable name may precede or follow the wrapped email address.

!!! attention "Additional Configuration Required!"
    The `SendSMTP` action requires additional configuration on the Reactor master device prior to use. Please see the [SMTP Mail method of the Notify Action](Notify-Action.md#smtp-mail) for setup instructions.

### SendSyslog

This action (in service `urn:toggledbits-com:serviceId:Reactor` only) sends a Syslog datagram to a specifiec server. The parameters are:

* `ServerIP` - (required) the IP address of the target Syslog server;
* `Application` - (required) A short identifier for the source of the action (e.g. "scene-sunset" or "startuplua" -- it should be sufficiently descriptive to help you find the action call later if you need to);
* `Message` - (required) the message text.
* `Facility` - The facility number (integer 0-23, default: 23 which means "local7");
* `Severity` - The syslog severity (integer 0-7, default 5 with means "notice");

The datagram is sent using the Syslog-standard UDP as the transport layer (port 514). Because UDP is stateless and connectionless, there is no assurance, or confirmation, of delivery--the packet is sent and hopefully received. If the target server is down or not listening, the datagram is lost. There are no retries. No errors are returned or thrown.

See also: [Syslog on Wikipedia](https://en.wikipedia.org/wiki/Syslog)

## State Variables

As stated above, a ReactorSensor acts like a "security sensor," implementing the basics of Vera's urn:micasaverde-com:serviceId:SecuritySensor1 service. The state variables `Armed`, `Tripped`, `ArmedTripped`, `LastTrip`, and `AutoUntrip` have their usual meanings and applications for this service.

ReactorSensor's own state variables serve primarily two purposes: provide operational data that can be used externally, or modify behavior of the ReactorSensor. While those that provide data are generally safe to play with, those that modify behavior can have serious performance consequences, as the default behaviors of Reactor are considered "optimized" for the best balance of functionality and performance/stability. Altering Reactor's behaviors can have serious consequences, up to and including increasing Luup reloads and system crashes, so if you think you need to modify any of those variables, feel free to contact me and consult about your application--I'll be happy to guide you on the best way to meet your objectives.

Except as otherwise indicated below, these variables live in the `urn:toggledbits-com:serviceId:ReactorSensor` service.

### Exported Expression Results (Multiple State Variables)

When a ReactorSensor uses expressions, and the expression is marked for export, it stores two state variables for each expression, one with the same name as the variable name given when creating the expression, and one with "_Error" appended. The former contains the most recent value of the expression evaluation (i.e. what the expression returned), while the latter contains an error message resulting from the evaluation. For example, if one creates an expression with variable name "TempC", there will be a state variable named "TempC" that contains the expression result, and a state variable named "TempC_Error" that contains any error message from the expression evaluation.

The values are associated with the `urn:toggledbits-com:serviceId:ReactorValues` service, so if you use these variables in Lua, Luup HTTP requests, or other facilities that require you to specify the service ID, make sure you are using the right one.

### Group States (Multiple State Variables)

The boolean (1=true, 0=false) state of each group in the ReactorSensor is stored in a variable called `GroupState_<groupid>`. The service ID for these variables is `urn:toggledbits-com:serviceId:ReactorGroup`. These variables are changed whenever the group state changes.

### TripCount

`TripCount` increments on a ReactorSensor each time it trips. It may be handy for graphing or other analysis of how often conditions are met. It can be reset by writing 0 to it directly, or by using the ResetRuntime action.

### Runtime

`Runtime` accrues the total time (in seconds) that a ReactorSensor has been tripped, which may be handy for graphing or other analysis. It can be reset by writing 0 to it directly, or by using the ResetRuntime action.

### RuntimeSince

The `RuntimeSince` state variable contains a timestamp at which TripCount and Runtime were last reset by the ResetRuntime action.

### LastReset

Luup maintains a `LastTrip` state variable (in service `urn:micasaverde-com:serviceId:SecuritySensor1`) that keeps the (Unix) timestamp of the last trip event, but there is no corresponding variable in that service for the time of the last reset. ReactorSensors therefore create this `LastReset` variable (in their own service, not Luup's) for this purpose, should you need it.

### MaxUpdateRate/MaxChangeRate

`MaxUpdateRate` and `MaxChangeRate` control the pace of updates a ReactorSensor is allowed to set. The `MaxUpdateRate` is the maximum number of updates (per minute) that the sensor will perform (an update is a re-evaluation of conditions in response to device state changes in those conditions), and defaults to 30. The `MaxChangeRate` is the maximum number of tripped-state changes the sensor is allowed per minute (default: 5). If the sensor exceeds either of these two parameters, it self-throttles and stops updating for a brief period. This is meant to prevent a defective or misbehaving device from driving Reactor crazy, and subsequently Reactor driving the system crazy (high CPU utilization, reduced UI and event performance, crashes, etc.). It also is effective at preventing loops in your logic from taking your system down (i.e. you make a ReactorSensor A that is conditioned on a ReactorSensor B tripping, and you then condition B on A tripping as well--you've created a loop that would cause the two sensors to just trip and untrip each other at machine speed).

### Retrigger

The `Retrigger` state variable (default: 0) tells a ReactorSensor whether it should signal Tripped every time the evaluation of a condition group is true, or only the first time the evaluation becomes true. Because Reactor is generally edge-driven for devices (it responds to device changes immediately), the default value of 0 is usually the correct choice and this value usually should not be changed. When changed, it will, for example, cause a scene triggered by the ReactorSensor to run multiple times, and this may not be (usually is not) desirable, and could have serious performance consequences if not approached carefully. Please contact the author for consultation before setting this value to anything other than the default 0.
