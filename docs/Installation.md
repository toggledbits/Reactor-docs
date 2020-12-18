## Installation Prerequisites

!!! attention "Multi-System Reactor"
    Multi-System Reactor is coming! MSR is a platform-agnostic Reactor that is planned to support Vera, openLuup, HomeAssistant, and Hubitat in its first release (and Homey soon after). [Sign up for my Discord channel](https://discord.gg/dKzYxc5n) for discussion and updates.

### Prequisites for Vera Systems

Vera Edge, Plus and Secure systems must be running UI7 firmware 7.0.29 (1.7.4452/4453/4453) or higher. Version 7.31 or higher is recommended.

Vera Lite and Vera3 systems must be on UI7 7.0.27 (1.7.1040), the final firmware release for these systems.

Reactor does not run on Vera UI6, UI5, or earlier firmware.

!!! attention "Users on 7.0.30 and below"
    Before installing Reactor for the first time, systems running firmware earlier than 7.0.30 should first be checked for adequate available space on the partition on which `/etc/cmh-ludl` resides. Ideally, you should have not less than 2MB free space prior to installation. You can check the space available there by logging in via SSH and typing: `df -kh /etc/cmh-ludl/`

### Prerequisites for openLuup

The following are required to run Reactor on [openLuup](https://github.com/akbooer/openLuup):

* `openLuup` version 2020.04.14b or higher (current development version recommended);
* `Lua` version 5.1;
* `dkjson` version 1.2 or higher acceptable; but 2.5 or higher preferred; it is also highly recommended that `LPeg` be installed;
* `LuaSocket` version 2.0.2 or higher (which should include the `mime`, `socket.http`, `socket.smtp`, and `ltn12` modules);
* `LuaSec` version 0.8 or higher (version 0.6 might be acceptable for reaching some low-encryption endpoints);
* `lfs` recommended, but not required.

All of the above except openLuup should, if possible, be installed using your OS distro's available installation tools (e.g. `apt-get`, `yum`, etc.). Direct installation may be necessary, however, if certain modules or their required versions cannot be installed through these tools.

### Requirements for the Reactor UI

The Reactor UI for editing conditions and activities is, by its nature, information-dense and very task oriented, with complex interactions. 

* Current Chrome, Brave, Firefox, or Safari running natively on modern Windows, Mac or Linux (desktop);
* Display size of 1024x768 minimum, larger than 1280x800 recommended;
* JavaScript enabled.

I do cursory testing on Edge and Opera, but these are not recommended configurations. While you may be able to get something done on a mobile device with a smaller-than-recommended display and device-specific browser, it won't be a fun way to work and isn't a supported configuration (i.e. I won't fix bugs or layout problems unique to those devices).

!!! attention "Got a UI Bug?"
    If you think you've found a UI bug, please (a) make sure you are on one of the supported configurations enumerated above, and the browser is up-to-date; and (b) retry the operation after starting your browser with *all* extensions disabled (some browsers offer a "safe mode" option that does exactly this). If the feature works with extensions disabled, you should probably report the issue to the extension developer/maintainer.

## Installing from the Vera Plugin Marketplace (Vera)

!!! question "Backup First!"
    A full backup of your Vera system, including the ZWave network, is always a good idea before making *any* important system changes.

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

## License and Use Restrictions

Reactor is not open source or public domain, and the author reserves all rights, including copyright. That said, you are granted a royalty-free license to use Reactor on any Vera or openLuup system you own for the purpose of creating automations. You may not reverse engineer it or produce derivative works from its source code and original files and data, but any automations and configuration data you create for use with Reactor are, of course, yours to do with as you please (these are not considered *derivative works* here). The public storage and display of Reactor's source code on Github or any other medium is a requirement for distribution and use in the environments in which it is designed to operate, and Reactor shall not be construed as having been "published" into the public domain or "Open Source" or for any other purpose or use that is inconsistent with this license. Reactor is offered "as-is" and "as-available" together with any and all defects; all warranties, including but not limited to all express or implied warranties of fitness, are hereby disclaimed, and you agree to indemnify and hold harmless the author from any cause arising, of whatever nature, that may result for your use or inability to use Reactor. Your sole remedy for any defect or non-conformity is to stop using Reactor. Your use of Reactor constitutes your express agreement to all terms of this license without reservation or exclusion. If you do not agree to all of the foregoing, or if the laws of your jurisdiction exclude or limit any of the foregoing license terms or limitations, you may not use Reactor and all rights granted hereunder are withdrawn, null, and void.

Reactor and this documentation site Copyright 2018, 2019, 2020 Patrick H. Rigney, All Rights Reserved
