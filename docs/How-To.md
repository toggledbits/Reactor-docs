This section is the repository for various "how-to's" and recipes for doing common things with Reactor. Make a contribution!

In the meanwhile, you might look at some of the [YouTube videos](https://community.getvera.com/t/reactor-tutorial-and-cookbook-videos-on-youtube/208834) I've created.

## Logging Events to File

Since the event log in the Logic Summary (Tools tab) is an in-memory structure, it gets lost on reboots/reloads. It also stores only the last 100 events by default. You can get more events logged, and persistence, by setting the `LogEventsToFile` state variable to "1" on any ReactorSensor (0 turns it back off). This will create a file called `ReactorSensorNNN-events.log` (where NNN is the device number).

By default, the file will be allowed to grow to 256KB before it is rotated. At that point, the file is compressed with the usual LZO compression for Vera, and a new file started. Only one "old" version is kept. You can increase or decrease the size of the log file by setting `EventLogMaxKB` to a size in *kilobytes* (thousands of bytes, e.g. 256 = 256,000 bytes roughly; 8192 would by 8MB). 
