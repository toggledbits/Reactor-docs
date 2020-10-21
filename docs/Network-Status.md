It is common for home automation users to want to check, and perhaps respond to, changes in the availability of Internet access. In fact, on Vera systems in particular, reliable Internet access is quite important, as these systems rely on network-based clocks to keep time, and make frequent connections to the Vera cloud infrastructure for various management and backup functions.

Reactor includes an integrated Internet health check. The check uses a list of well-known, reliable systems (such as Google DNS) to check access every five minutes. If a check fails, two additional checks are made at one minute intervals, and if all three checks fail, Internet access is determined to be "down" (unavailable).

!!! info "Decoupled?"
    The Internet health check works properly on [decoupled](https://github.com/toggledbits/Vera-Decouple) Vera systems. But, if your Vera is so decoupled that it normally runs with no Internet access at all, you should disable the Internet health check (see *Modifying the Test* below).

The result of the test is reflected in the value of the `NetworkStatus` state variable on the Reactor master device, which you can test using a *Device State* condition in your ReactorSensors. A value of 0 indicates that Internet access is not available, and 1 indicates that the Internet access test has passed (and so Internet access is available). If this variable is empty/blank, the test is failing for some other reason and the status of Internet access is unknown. The LuaUPnP log should be examined for details.

!!! info "More to look at"
    On Vera systems running Reactor 3.9 and higher, check to make sure that the `reactor_internet_check` daemon is running. The contents of `/tmp/reactor_internet_check.log` on the Vera can also be examined for clues. If you are not fluent/comfortable with Vera system administration via SSH/command line, try rebooting your Vera (full reboot, not just reload of Luup -- use the "Reboot" button in *Settings > Net & Wi-fi*.

## Modifying the Test

The default check interval (5 minutes) can be modified by setting the Reactor master device state variable `InternetCheckInterval`. If set to 0, the Internet health check is disabled.

The list of sites checked can also be modified. The default list has been carefully selected for reliability, but it's possible that some locations in the world may have trouble reaching certain sites consistently for social, political, or other reasons. The list of sites checked can be modified by providing your own comma-separated list of at least three sites (IP addresses or host names with domain) in the `InternetCheckSites` state variable on the Reactor master device. The sites listed should meet the following criteria:

* There should be at least six targets listed;
* Half of the sites listed should be IP addresses, the other half names; any order is fine;
* Each target site must be outside your LAN;
* To be sufficiently reliable for this test, a target site should be regarded as "always up" in principal &mash; failures of the site should be so rare that, for example, they may garner national media attention when they occur.

The default site list (used when `InternetCheckSites` is blank or absent) is: `8.8.8.8,8.8.4.4,1.1.1.1,www.facebook.com,www.amazon.com,www.google.com`

If the `InternetCheckInterval` and/or `InternetCheckSites` state variables do not exist in your Reactor master device's *Advanced > Variables* tab, you can create them. On the Reactor master device, go to the *Advanced > New Service* tab and create either or both. The service ID (for the *New service* field) is `urn:toggledbits-com:serviceId:Reactor`. Make sure you enter the service ID and variable name exactly as shown here (copy-paste recommended).

!!! question "Help me out!"
    If you live in a country/region where the default target sites don't work reliably and have configured a useful set of alternatives, please let me know via the [Vera Community Forums](https://community.getvera.com/c/plugins-and-plugin-development/reactor/) or by opening a [Github issue](https://github.com/toggledbits/Reactor/issues). I may add that information to the code or here in the documentation to assist other users in your locale. Thank you!

## OpenLuup Implementation Considerations

Reactor versions from 3.6 (the first with the Internet health check) through 3.8 implemented the Internet access check in Lua in the Reactor plugin itself. To make it more efficient, on Vera systems as of 3.9 the health check has been moved to a shell script running as a daemon that notifies Reactor of any changes in Internet access status. OpenLuup retains the internal Lua-based check by default. However, openLuup users may use the daemon script, and this is encouraged.

If you choose to use the daemon script, you must install it as a startup daemon yourself, since openLuup runs on too great a variety of systems for a self-install to be included for every possibility. It's likely that, since current Luup Veras are Linux systems, the approach used in `reactor_internet_check.sh` to install (and uninstall) the script as a daemon is not far from what you will need to do for your Linux distribution. Within `reactor_internet_check.sh`, there are two versions of the typical Linux daemon startup script (placed in `/etc/init.d`), one for systems that use `procd` and one for systems that do not &mdash; choose the one that matches your distro's approach (hint: see if `/sbin/procd` or `/usr/sbin/procd` exists). Once you have the script up and running (and starting itself at boot), your system will automatically know not to use the internal Lua-based check (i.e. when Reactor starts receiving updates from the daemon, it stops doing its own internal checks).

!!! attention "You are your own guru."
    The script provided runs on `bash` or `ash` on Linux; it will not run on `csh`, `ksh`, or generic `sh`, or any non-Linux shell/command processor. I do not provide Windows PowerShell or other variants of the script. It's up to you to get it working on your platform, including getting it installed to run at boot. Again, because of the wide variety of systems on which openLuup can run, I cannot provide specific instructions or support for openLuup users integrating the script, beyond what's shown in the script as delivered.
