# FAQ (Frequently Asked Questions)

!!! question 
    If you don't find your question/answer here, please ask in [the Reactor category on the Vera Community Forums](https://community.getvera.com/c/plugins-and-plugin-development/reactor/178), and suggest that the question be added!

**None of my ReactorSensors is working and they all say "Safety Lockout!"**

:  Safety lockout occurs when Reactor detects that your system has reloaded/restarted too many times in a short period (10 times in 15 minutes by default). It is best to investigate the reason for this before proceeding. Sometimes this is caused by an errant device or bug in another plugin. It also can occur when you are renaming a lot of devices, or changing rooms assignments, or creating/modifying scenes, all of which cause Luup restarts (unfortunately). Waiting 15-20 minutes and restarting your system is usually sufficient to recover. If you are impatient, you can set the `rs` state variable on the Reactor master device to "0" and restart Luup, and everything will come back up right away.

**Why is there a yellow triangle in my ReactorSensor icon?**

:   The "trouble" icon overlay is meant to draw your attention to a problem with that ReactorSensor. There are many reasons for this, from a deleted device still mentioned in configuration to an error in a variable expression. You may need to do some digging to figure out why. The most reliable way to find that answer is to go to the *Tools* tab of your ReactorSensor, to the "Troubleshooting" section, and click the "Logic Summary" link. In the "Events" section of the generated report, you should find entries that clearly tell you why trouble was flagged.

**How many ReactorSensors can I create?**

:   ReactorSensors are child devices of the Reactor master device, and as such, the memory they take up is just their configuration and state. There is always only one copy of the Reactor code resident in memory no matter how many ReactorSensors you create, so it's very efficient. Think of it as paper stacked neatly on a desk--the first sheet takes up some of the desk's surface area, but each subsequent sheet only uses a little vertical space and no additional surface area. The author has tested with several hundred ReactorSensors on a Vera Plus without significantly impacting system performance.

**Do I have to split my logic into mulitple ReactorSensors?**

:   That's up to you. You can create as many groups as you want within a ReactorSensor, so where long ago (version 1.x and 2.x) you may have been required to have two ReactorSensors, now you can have many groups within one ReactorSensor. Each group has its own logic and activities. Groups can refer to the state of other groups, so you can build logic rules incrementally. Structure your ReactorSensors in whatever way makes the most sense to you, and is easiest for you to maintain. My "house" system has typically one RS per room, and each has as many groups as needed to take care of all the logic in that room. I have a couple of "global" ReactorSensors that I keep in a "Virtual Devices" room to handle house-wide logic like "is it morning/daytime/evening/night?", and the other sensors refer to those "global" groups to handle their room-specific behaviors for those events. My home theater has specific needs, so it has two RS's, one for the room in general, and one for the AV system.

**Why aren't my ReactorSensors controllable in the Vera Mobile apps/Imperihome/etc.?**

:   Unfortunately, the authors of these apps, which includes Vera itself, have to date hard-coded user interfaces for the "standard" device types Vera defines, plus a few exceptions. They have not taken the step of using the UI definition files that both standard and custom devices provide to make a user interface (dashboard card and control panel) in the web UI. This has been the way for many years, and at this point I believe is unlikely to change, as the current UI and firmware are now (as of February 2020) pretty much throw-away with entirely new and rewritten firmware on the horizon. Unfortunately, there is no sign as yet that Vera/eZLO will address these shortcomings in future firmware, either, and it may simply be that custom devices created by plugins never have support in the mobile applications.

**Here's what I want to do. Can you build the logic for me? I'll pay you!**

:   There are too many reasons not to do this, not the least of which is ongoing support of each person's house, and it doesn't make my user community any smarter and more capable themselves. I'm more of a ["teach a man to fish"](https://www.brainyquote.com/quotes/maimonides_326751) guy. I want *you* to become an expert, to the point where you help others build up to your acquired expertise.

**What's the difference between Reactor and PLEG?**

:   They are similar logic tools, with a different approach. PLEG has a more text-syntax-driven paradigm (a new language to learn that isn't Lua), where Reactor is more of a GUI-based tool (click and pick). Most users find Reactor easier to learn and use. Reactor is free, while PLEG is not. Reactor runs on openLuup, but PLEG is not available there. Reactor's source is available for inspection, while PLEG's is locked down (encrypted, unpublished), which opens the risk that at some future date its users may be left empty-handed without upgrades (and probably unhappy they spent money on it) if a firmware update breaks it. As it stands today (2020-02-15), PLEG's author has had very little significant contact on the community forums in the last year. Draw from that whatever conclusion you will. While PLEG is older and thus has a larger community of users to help, Reactor is gaining quickly, and any advantage enjoyed by PLEG in this regard is moot if the stops or is slow to support it. Historically, I've avoided making many of these last points in deference to the important contribution PLEG made back in the day--it was a very important tool in the early days of Vera--but as of now, its use appears to me to be a significant risk to its users going forward.

**Is there a tool to migrate my PLEG configuration to Reactor?**

:   No, and there likely never will be. That would be a significant engineering project on its own, perhaps bigger even than Reactor itself, and given that it needs to correctly support every error and oddity people may have in their PLEG configurations and produce an identical Reactor result, it's unlikely to be successful. It's also very likely to be a giant support nightmare. So, no...

**How long is a piece of string?**

:   The length of a piece of string is twice the distance from its center to either end.
