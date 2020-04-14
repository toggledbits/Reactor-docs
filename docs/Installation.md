## Installation Prerequisites

### Prequisites for Vera Systems

Vera systems must be running UI7. Reactor runs on all firmware released since 2018 for Vera Plus, Vera Secure, and Vera Edge. Reactor runs on Vera Lite and Vera3 systems (firmware 7.0.27/1.7.1040 recommended). Reactor does not run on UI6 or earlier.

Systems running firmware earlier than 7.30 should first be checked for adequate available space on the partition on which `/etc/cmh-ludl` resides. Ideally, you should have not less than 2MB free space prior to installation.

### Prerequisites for openLuup

The following are required to run Reactor on openLuup:

* `openLuup` version 2020.04.14b or higher;
* `Lua` version 5.1;
* `dkjson` version 1.2 or higher acceptable; but 2.5 or higher preferred; it is also highly recommended that `LPeg` be installed;
* `LuaSocket` version 2.0.2 or higher (which should include the `mime`, `socket.http`, `socket.smtp`, and `ltn12` modules);
* `LuaSec` version 0.8 or higher (version 0.6 might be acceptable for reaching some low-encryption endpoints);
* `lfs` recommended, but not required.

All of the above except openLuup should, if possible, be installed using your OS distro's available installation tools (e.g. `apt-get`, `yum`, etc.). Direct installation may be necessary, however, if certain modules or their required versions cannot be installed through these tools.

## Installing from the Vera Plugin Marketplace (Vera)

!!! question "Got backup?"
    A full backup of your Vera system, including the ZWave network, is always a good idea before making any big system changes. Installing any new plugin should always be considered a "big" system change.

Reactor can be installed via the "Install Apps" function in the Vera UI. This is the recommended approach for Vera systems. Use the search function there to search for "Reactor" and it should pop right up.

## Installing from the AltAppStore (Vera & openLuup)

The AltAppStore (under ALTUI) offers all current releases of Reactor as well as the current stable development branch. To install, find Reactor in the AltAppStore, choose the version you'd like to install, and click the "Alt" button.

## Installing Directly from Github (Vera & openLuup)

To download the plugin from Github:

1. Go to [the Reactor Github repository](https://github.com/toggledbits/Reactor);
1. Choose the branch for the version of Reactor you want to download:
    * master: the *master* branch is the most recent released version;
    * hotfix: the master branch plus any important fixes that have come up since the master release &mdash; this version is expected to be at least as stable as *master*, if not more.
    * stable: the latest development release for which basic QA has been completed &mdash; may still contain bugs, but they should be trivial;
    * develop: the latest developer code changes checked in, with minimal QA &mdash; this version will be the bleeding-edge of functionality, but may also contain bugs (from the most trivial to soul-crushing, crash-inducing horrors);
1. Click the green "Download/clone" button, and choose "Download ZIP" from the pop-up;
1. Save the ZIP file somewhere;
1. Unzip the ZIP file;
1. Upload the unzipped files to your system.
    * For Vera, the uploader at *Apps > Develop apps > Luup files* is recommended. Select all of the unzipped files except the ".md" files and drag them as group to the "Upload" button in the Vera UI and drop them there.
	* For openLuup, use whatever tool you wish to move the files into your openLuup directory.
1. *If and only if* this is a first-time installation of Reactor on the device, create the Reactor master device:
	* On Vera, this is done in *Apps > Develop apps > Create Device*. You only need to supply the name (description field) of the device (simply "Reactor" is recommended), the UPnP device filename (`D_Reactor.xml`) and UPnP implementation filename (`I_Reactor.xml`). Then reload Luup and [hard reload/cache refresh your browser](https://refreshyourcache.com/en/cache/).
	* On openLuup, use ALTUI's "Create Device" button in the Devices view.
