# Run Lua Action

The _Run Lua_ action allows you to run a Lua script. This works the same way as scene Lua, except that you can use the RunLua action as often as you want, where you want, not just at the beginning of the activity.

![Run Lua Action](images/run-lua-action.png)

Like scene Lua, if your script returns boolean _false_, execution of the actions in the activity stops at that point. If anything other than boolean _false_ is returned (including nothing), execution continues.

!!! attention "All Plugins are Sandboxed"
    Because Reactor is a plugin, and Vera runs plugins in different sandboxes (environments) from other plugins and startup Lua, globals defined outside of Reactor are not visible to Lua in Reactor. If you have a library of functions you define in your startup Lua, you can convert this code to a Lua module, which can then be used in startup Lua, scene Lua, Reactor Run Lua actions, or anywhere else. See "Converting Startup Lua to a Module" below.

!!! attention "You're doing it wrong!"
    If you are using a _Run Lua_ action to just call `luup.call_action(...)` on a device, you should rather use a _Device Action_ &mdash; the _Run Lua_ action has considerable overhead in compiling the Lua fragment, and building and running the Lua environment. The _Device State_ condition is far more efficient for such a simple purpose.

## Reactor Context

Your script environment will have a global table named `Reactor` that contains information about the context in which your script is executing. The following subkeys are available in this table:

* `id` - The device ID of the ReactorSensor in which the script is executing.
* `conditions` - A read-only table containing status objects for all groups and conditions in this ReactorSensor. See below.
* `trip` - A read-only table containing status objects for those groups which last caused the ReactorSensor to trip;
* `untrip` - A read-only table containing status objects for those groups which last caused the ReactorSensor to untrip;
* `script` - The internal name of the running script (for debug purposes);
* `variables` - A read-only table containing the current values of all expression/variables defined in the ReactorSensor (so you don't need to use `luup.get_variable()` to access them). Note that this table's elements are read-only, so you cannot set ReactorSensor variables by making assignments to them here.
* `dump( var )` - A utility function you can use to return a formatted string representation of a value (e.g. for use in a `print()` or `luup.log()` call); this function stringifies tables in a JSON-like way, so you can see the contents of the table structure rather than Lua's default (not-very-informative) presentation "table: 0x14e123". For fun, try `print(Reactor.dump(luup.devices))` to see a dump of all your device data in the Logic Summary (hint: put the output through jsonlint.com to get a pretty-printed version that humans can more easily read -- it's not JSON, but jsonlint.com still does a nice job of formatting it).

The `Reactor.conditions` table, which is indexed by condition ID (e.g. it's a dictionary or map in some languages), contains a condition state object for every condition. Groups are themselves conditions (which happen to contain other conditions), so they also appear in this table. Each element of this table contains the `id` of the condition, its `type`, its current `state`, the time `since` that state took effect, and the `parent` group to which the condition belongs. 

* When the `type` value is "group", the key `conditions` is an array of the child conditions of the group, `name` is the name of the group, `op` is the group operator (and, or, xor, etc.), and `disabled` is *true* if the group is currently disabled. 
* Otherwise, the entry will contain keys `lastvalue` and `priorvalue` which are the most recent and prior value of the condition test value.

!!! attention "`Reactor.groups` Deprecated as of 3.9"
    The `Reactor.groups` table, which is similar in structure to the conditions table but lists only groups, has become redundant. The same information can be accessed through `Reactor.conditions`. As a result, `Reactor.groups` is now deprecated and will be removed from a future release. Use `Reactor.conditions` instead; it works the same way, so you should just be able to change the name. See the examples below.

### Context Usage Examples

Print the name of the "root" group:

```
print("Root group name is", Reactor.conditions.root.name)
```

Print a message for each condition in a group with ID `grp_jednkh` that is not *true*:

```
for id,cond in ipairs( Reactor.conditions.grp_jednkh.conditions ) do
    if ( not cond.state ) then
        print("Condition", cond.id, "is false!")
    end
end
```

Print the name and state of the group that is the parent of condition `cond_jednkh`:

```
local group = Reactor.conditions.cond_jednkh.parent
print( group.name, "is", group.state )
```

## Error Logging

The "Event Log" section of the Logic Summary for your ReactorSensor (which can be generated from its "Tools" tab) will contain messages for errors thrown by your code, as well as any `print()` statements in your code.

!!! tip
    Using the `print()` function in your Lua code makes debugging much easier than logging to the LuaUPnP log file!

## Other *Run Lua* Environment Features

The *Run Lua* environment shares loaded modules between scripts, so if two of your scripts, whether in the same ReactorSensor or different, `require` a module, that module is loaded only once. This makes the environment more memory-efficient.

The *Run Lua* environment also contains code to warn you if your script accesses an undeclared variable, or if it creates a variable without the `local` declaration (i.e. creates a global variable). Global variables are generally to be avoided when possible.

## Enhanced Editor

Reactor attempts to load the ACE syntax-highlighting editor in the Activities tab for editing _Run Lua_ code. If you do not want to use ACE, you can set the `LoadACE` state variable in the Reactor master device to 0.

You can control the version of ACE that is used, and the source from which it is loaded, by setting the `ACEURL` state variable on the Reactor master device to a full URL of any version of ACE you wish (including code stored on LAN-local servers, so Internet access is not required).

You can also control options that are passed to ACE, such as theme. You can set these options by providing a JSON-formatted options structure in the `AceOptions` state variable.

## Converting Startup Lua to a Module

Please refer to this thread: [https://community.getvera.com/t/undeclared-uninitialized-errors-in-lua-activities/200650/4](https://community.getvera.com/t/undeclared-uninitialized-errors-in-lua-activities/200650/4)