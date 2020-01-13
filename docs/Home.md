Welcome to the Reactor Wiki!

Reactor is a plugin for Vera Home Automation systems that addresses the shortcomings in the built-in logic for triggering scenes and events, adding powerful, user-configurable logic to drive automation.

##### Table of Contents

* [What is Reactor?](#what-is-reactor)
* [What Can I Do with Reactor?](#what-can-i-do-with-reactor)
* [Installation](Installation)
* [Quick Start--Jump Right In!](Quick-Start)
* [Configuration](Configuration-Overview)
  * [Conditions](Conditions)
    * [Device State Conditions](Device-State-Conditions)
    * [House Mode Conditions](House-Mode-Conditions)
    * [Weekday Conditions](Weekday-Conditions)
    * [Date/Time Conditions](Date-Time-Conditions)
    * [Sunrise/Sunset Conditions](Sunrise-Sunset-Conditions)
    * [Time Interval Conditions](Interval-Conditions)
    * [Luup Reload Conditions](Other-Conditions#luup-reload-condition)
    * [Comments](Other-Conditions#comments)
	* [Condition Options](Condition-Options)
  * [Expressions](Expressions-&-Variables)
  * [Activities](Activities)
    * [Device Action](Device-Action)
    * [Run Lua](Run-Lua-Action)
    * [Run Scene](Run-Scene-Action)
    * [Run Activity](Run-Activity-Action)
    * [Delay](Delay-Action)
	* [Notify](Notify-Action)
    * [Change House Mode](Change-House-Mode-Action)
	* [Set Variable](Set-Variable-Action)
    * [Reset Latched](Reset-Latched-Action)
    * [Comment](Activities#comment-action)
  * [Luup State Variables Tutorial](Luup-State-Variables-Tutorial)
* [Status Display](Status-Display)
* [Backup and Restore](Backup-&-Restore)
* [Throttling](Throttling)
* [Service](Service-Definition)
* [How Do I...?](How-To)
  * [Simplifying Logic](Simplifying-Logic)
  * [Modular Logic](Modular-Logic)
* [Support & Suggestions](Support-&-Suggestions)
* [Donate to the Project](#donate-to-the-project)

## What is Reactor?
Reactor is a program logic plugin. It allows the user to create complex boolean logic (well beyond the standard trigger capabilities of Vera scenes) and perform actions based on the logical result. In addition to performing actions internally, it implements the semantics of a security sensor (e.g. like a motion detector), becoming tripped when logic conditions are met, or untripped when they are not, so any external facility that is capable of triggering from a sensor can also respond to Reactor's logic output.

Reactor itself is a single-instance plugin, meaning all ReactorSensors in the system run from a single copy of the Reactor code, making it light on system resources even for large numbers of sensors and logic conditions. It is built to operate well even on older, less-capable hardware like VeraLite (although, UI7 or ALTUI is required). It also runs on openLuup.

## What Can I Do with Reactor?
If you've ever wanted to do something with Vera/Luup where it's "if this is on and that's off and this sensor is tripped and that device is in this condition", then Reactor is for you. In particular, any time the word "and" appears in the conditions for an automation you are trying to set up, you may need Reactor.

Here are some examples of things you can do with Reactor (many of which would be difficult to do reliably or at all with Vera scenes and device triggers alone):

* Send a notification when the garage door is left open for more than 15 minutes between 10pm and 8am;
* Turn off outdoor lights at 11pm, unless your house is in "Party Mode" (as set by a VirtualSwitch you created);
* Reboot your Vera at 5am every Sunday;
* Temporarily run air conditioning if the humidity in your house exceeds 55%;
* Close the blinds and turn off your pool equipment if the current weather is "lightning";
* Put your Nest thermostat in "Home" mode when your house mode is "Away" but your caretaker uses their lock code to open the front door, and then later return the Nest to "Away" mode;
* Turn off all the lights in the basement when the stairway light is turned on and off twice within 10 seconds.

## Donate to the Project
Reactor is free to use, and always will be. Your contributions in support of the project, however, are a big help in both motivation and offsetting some of the expenses related to maintaining this and my other projects (AWS, Github, various developer tools, the Veras I use for testing, etc.). A one-time donation of any amount is appreciated, just [jump over to my web site](https://www.toggledbits.com/donate).