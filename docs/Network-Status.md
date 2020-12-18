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

Reactor versions from 3.6 (the first with the Internet health check) through 3.8 implemented the Internet access check in Lua in the Reactor plugin itself. To make it more efficient, on Vera systems as of 3.9 the health check has been moved to a shell script running as a daemon that notifies Reactor of any changes in Internet access status. OpenLuup retains the internal Lua-based check by default. However, openLuup users may use the daemon script, and this is recommended.

If you choose to use the daemon script, you should first attempt an automatic install by running: `sudo reactor_internet_check.sh -I` (make sure the script file has execute permissions). The script can self-install to the system startup in one of three common configurations:

1. systemd (recent Fedora, CentOS, Debian, Ubuntu and many others);
1. sysvinit (`/etc/rc.d/` files) with procd;
1. sysvinit without procd.

If the script reports that it doesn't know how to install on your system, you must then figure out how to get the `reactor_internet_check.sh` script up and running at boot as a daemon yourself.

If the script stops with a syntax or runtime error, check the following:

* Make sure you are running the script as `root`, either by login or `sudo`;
* Try forcing the install to run using `bash` by running `sudo bash reactor_internet_check.sh -I`. If this works, you likely will also need to edit the *shebang* (the first line of the file) so it reads `#!/bin/bash` (please restart the service, or the entire system, after making this change).

!!! attention "You are your own guru."
    The script provided runs on `bash` or `ash` on Linux, and `sh` in many cases; it will not run on `csh` or `ksh`, or any non-Linux shell/command processor. I do not provide Windows PowerShell or other variants of the script. It's up to you to get it working on your platform, including getting it installed to run at boot. Because of the wide variety of systems on which openLuup can run, I cannot provide specific instructions or support for openLuup users integrating the script, beyond what's shown in the script as delivered.

!!! info "Consistent Configuration"
    apps.When you use the script/daemon, configuration of the sites tested and the testing interval is still controlled by the state variables as described in the previous section. It is therefore advised that you not change the script to adjust these values. Use the state variables for their intended purpose. Reloading Luup is required to make these state variable changes take effect in the script, but it is *not* necessary to restart the script itself or reboot the host OS.

When the script is running, it will periodically (according to the configured interval) test one or more of the target sites and send the result of the test to Reactor, which will update its `NetworkStatus` state variable accordingly. If the script fails to update Reactor for three consecutive time intervals, then on openLuup the checks will revert (temporarily) to the internal (Lua-based) check; once the script daemon is restarted, the Lua-based checks will stop. On Vera systems, a failure of the script causes the `NetworkStatus` variable to go blank (i.e. network status unknown).