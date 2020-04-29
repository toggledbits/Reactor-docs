The "Tools" tab includes a couple of helpful tools for your ReactorSensor.

## Test Time and Test House Mode

The "Test Time" and "Test House Mode" settings on the "Tools" tab allow you to fool your ReactorSensor into thinking the time or house mode, respectively, is different from what it actually is. This lets you test condition logic without having to either wait for a particular time of day or date or come around, or actually changing the system house mode. These settings remain in effect while the checkbox is checked, and so you must remember to turn them off when you are finished testing, or your ReactorSensor will not use the "real" values.

The time you set for "Test Time" is anchored at the instant you set it, and the clock runs forward from that point. That is, if you set the test time to 2pm and wait 60 seconds, the ReactorSensor's clock will read 2:01pm. This allows the delays, sustains and other time-related conditions and options to perform more realistically, and greatly increases the utility of this tool.

But there's an important detail: because Reactor stores timestamps for condition events, when you go into or out of "Test Time" mode, you have to clear these stored timestamps to avoid the appearance of time moving radically forward or backward as a result of the change. Reactor will ask you if you want to `Restart` the sensor (a quick operation that clears its stored state, but not its configuration); you don't have to restart the ReactorSensor at that moment (you can put it off if you have other changes you want to make before testing), but at some point before you test, you must complete the restart to get valid results.

!!! tip
    Always restart your ReactorSensor when going into or out of any test mode, or changing the test value (time or house mode). It's quick and painless.

## Device Information Update

Reactor includes a "device information database" that provides hints that the UI uses to make the creation of conditions and activities easier. From time to time, this database is updated with new devices, or new features available to existing devices (e.g. when another plugin updates and introduces new actions or state variables). This "Tools" tab section will let you know when a newer version of the "DDB" is available; you can press the "Update" button to download the update. The update takes effect immediately, and applies to all ReactorSensors (i.e. no matter which ReactorSensor you launch the update from, it will update all of them). No restart of Luup or reboot is required. The updates also do not modify the configuration of your ReactorSensor in any way.

## Troubleshooting Section

The "Troubleshooting" section of the "Tools" tab gives information about how to work out logic or operational problems with your ReactorSensor. 

In addition to the useful advice and links to this documentation, it provides a link to a report called the *Logic Summary*. The Logic Summary report contains a large amount of information about the system state, plugin state, and ReactorSensor configuration and state. It includes an "Events" section that documents the recent history of what your ReactorSensor has been doing and how it responded to conditions changing. This should be your first stop when your ReactorSensor is doing something unexpected.

!!! important
    As soon as your ReactorSensor does something you didn't expect, you should run, not walk, to your browser, get into the ReactorSensor's "Tools" tab, and generate and capture the Logic Summary report. Capturing that report immediately will capture the events leading up to the problem, and then you can work out, from the contents of the report, what went wrong. **Do not do anything else** before generating the report, like reload Luup, unplug your Vera, edit the ReactorSensor's configuration, or hit the `Restart` button on the ReactorSensor, as these actions will destroy the stored history and reduce the usefulness of the report.

There is also a set of steps described on how to generate a "Log Snippet". A log snippet is a subset of your system's `LuaUPnP.log` file that attempts to filter out non-Reactor data. Generally, this is not necessary, and only rarely will it be requested; please don't generate it or post it unless you are asked to.

See also: [Getting Support](Support-&-Suggestions.md)