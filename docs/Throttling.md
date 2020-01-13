# Throttling

One of the risks of having free-form logic creation and the ability to watch and react to device states is that it's possible to create logic that is "circular" in nature: the logic examines conditions, determines some action needs to take place, and that causes the logic to re-examine the conditions, and take an action that then stimulates the original set of conditions, and back and forth it would go, ad infinitum. For example, you could create a ReactorSensor (RS) that checks the state of a light, and turns the light on if it's off, and off if it's on. In the absence of any other logic or delays, this logic would go into an infinite loop, turning the light on and off as quickly as the system would allow.

To prevent this from causing problems for your device and the system as a whole, Reactor "throttles" when the rate of updates or rate of state changes exceeds certain parameters. When this happens, you will see a message on the RS with one of two messages:

* "high update rate": the devices that the RS is watching are changing frequently; the default limit for this is 30 times per minute;
* "high change rate": the RS itself is being asked to trip and untrip too frequently; the default limit for this is 10 times per minute.

When your RS is throttled, it stops running condition evaluations and activities for a short period, in an effort to let things settle down without overwhelming the system.

## Tuning

There will be some cases where the default limits are too conservative for perfectly valid logic and device conditions. You can tune each RS' throttling parameters individually. 

The `MaxUpdateRate` state variable sets the number of updates (e.g. responses to device changes) allowed per minute before throttling kicks in. The default is 30. 

The `MaxChangeRate` state variable sets the number of *changes* (e.g. transitions between tripped/untripped states) allowed per minute before throttling kicks in. The default is 10.

**Nota bene:** Arbitrarily setting these parameters to high numbers to effectively disable these checks is akin to putting black tape over the "Check Engine" light on your car's dashboard. You do so at your own peril. Generally speaking, if your device is being throttled even at the default values, some solid analysis of your logic conditions and activities is needed before making any changes.