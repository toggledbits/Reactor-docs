# Welcome to Reactor

Reactor is a modern program logic plugin for Vera/eZLO home automation systems and [openLuup](https://github.com/akbooer/openLuup). It addresses the shortcomings in the built-in logic for triggering scenes and events, adding powerful, user-configurable logic to drive automations.

Reactor is built for speed and efficiency. It is a single-instance plugin, meaning all ReactorSensors in the system run from a single copy of the Reactor code resident in memory, making it light on system resources even for large numbers of sensors and logic conditions. It is built to operate well even on older, less-capable hardware like VeraLite (although, UI7 or ALTUI is required &mdash; it does not run on UI5 or UI6). It also runs on openLuup.

## What Can I Do with Reactor?

If you've ever wanted to do something with Vera/Luup where it's "if this is on and that's off and this sensor is tripped and that device is in this condition", then Reactor is for you. In particular, any time the word "and" appears in the conditions for an automation you are trying to set up, you may need Reactor.

Here are some examples of things you can do with Reactor (many of which would be difficult to do reliably or at all with Vera scenes and device triggers alone):

* Send a notification when the garage door is left open for more than 15 minutes between 10pm and 8am, and blip a siren every 30 minutes until it is closed;
* Turn off outdoor lights at 11pm, unless your house is in "Party Mode" (as set by a virtual switch you created);
* Reboot your Vera at 5am every Sunday;
* Track the ambient humidity in your bathroom and turn on ventilation when there's a sudden rapid increase (as when someone showers or bathes);
* Close the blinds and turn off your pool equipment if the current weather is "lightning";
* Implement "wasp in a box" presence detection in a room or entire house;
* Implement a complete alarm system with "home", "away" and "stay" security modes, perimeter zones, interior zones, smoke and fire detection/alarm;

## Free (as in Free Beer)

Reactor is free to use (but not open-source at this time; see the [license](Installation.md#license-and-use-restrictions)). There is no cost to license Reactor for use on your Vera Luup or openLuup system, and there are no charges for large numbers of logic rules, complex configurations, or additional functionality. That said, the author appreciates [donations](https://www.toggledbits.com/donate) in support of the project.
