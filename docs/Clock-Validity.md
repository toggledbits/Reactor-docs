## Invalid Clock

To date, Vera system hardware has not included a real time clock &mdash; a battery-backed clock that runs when the rest of the system is not running or powered off &mdash. It relies on the [Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) (NTP) to set and update the clock using Internet time servers. The time is set by querying these servers at boot, and then periodically after for adjustments to keep the clock accurate.

But it is possible for a Vera system to boot up when Internet access is unavailable/down and those time servers are not reachable, and in this case, the system time will be wildly off (technically, this also would apply to *openLuup* systems running on hardware that doesn't have a real time clock). Testing on 7.31 reveals that Edge and Plus systems consistently come up with 1-Jan-2000 UTC dates when started without Internet access. The Unix/Linux default "zero time" is 1-Jan-1970 UTC. Reactor uses these fact to establish the validity of the clock at startup. When the clock is invalid, the Reactor master device state variable `ClockValid` will be set to 0 (this can be tested from a ReactorSensor; it is normally 1 when the clock is valid). The ReactorSensor condition history will also be wiped clean to avoid impossible time arithmetic against previously-stored, valid timestamps (i.e. it does a self-`Restart`). This means any previously-unfinished condition delays and sequences, and unfinished activities or scenes, all of which would normally complete after a reload, are instead abandoned and will not complete. All *Date/Time*, *Sunrise/Sunset* and *Weekday* conditions that are evaluated will produce invalid results due to the invalid system time.

**If you have critical automations that rely on accurate time, you should include a check of `ClockValid` in the logic.** You can also stop Reactor from starting at all if the clock is invalid by setting `RequireValidClock` to 1 (default is 0); when 1, startup of Reactor will be delayed until the clock becomes valid.

### Mitigating Clock Problems

The best way to mitigate against time-related problems is to set up a network time service in your LAN that's always available &mdash; a system with a good hardware real time clock, preferably UPS-backed &mdash; so that your Vera/openLuup system always has access to a reliable time server, even during the absence of Internet access. Many home and small-office NAS systems have this built-in and easily enabled. Although your local time server will still use network time servers for synchronization, their hardware clocks allow them to serve reasonably accurate time locally on the network even when syncing to those servers isn't available to them &mdash; something your Vera cannot do itself.

Once you have a reliable time server locally, you can reconfigure your Vera system to use it. On firmware 7.31, a script such as this can be run:

```
uci set ntpclient.@ntpserver[0].hostname='LOCALNTPSERVERIP'
uci commit ntpclient
```

Vera seems to periodically default these settings (and certainly will at firmware updates), so running these in a script periodically may be necessary. A full reboot of the system is required for the changes to take effect.

## Unstable Clock

If Reactor detects that the system clock has been adjusted by more than 60 seconds in either direction (which is highly unusual), or Reactor starts up after a previous run detected an invalid system clock (see above), it will mark the clock "unstable" and cause these messages. Large adjustments to time can have dramatic effects on delays and sequence options in your conditions, so are worth noting in case an apparent malfunction sends you looking for the reason. This applies to both Vera and openLuup systems. Please note that DST changes are *not clock adjustments*, they are only changes to a flag that affects the math for converting from system time to human-readable time, but it doesn't actually change the system clock itself (which is derived from UTC). DST changes will therefore never cause the clock to be marked unstable (it is possible, however, that clock adjustments can cause DST to "flap").

For Vera systems, the most common cause of bad clock adjustments is a rogue time server in the pool, but there is nothing we can do to mitigate this and the problem usually resolves itself fairly quickly (the pool detects this and eventually pushes the rogue out). For openLuup systems, the rogue time server problem is possible, as well as having your network time configuration disabled or set up to adjust/update with insufficient frequency to keep updates small.
