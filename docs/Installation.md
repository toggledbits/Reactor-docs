## Installing from the Vera Plugin Marketplace

Reactor can be installed via the "Install Apps" function in the Vera UI. Use the search function there to search for "Reactor" and it should pop right up.

## Installing from the AltAppStore

The AltAppStore (under ALTUI) offers all current releases of Reactor as well as the current stable development branch. To install, find Reactor in the AltAppStore, choose the version you'd like to install, and click the "Alt" button.

## Installing Directly from Github

To download the plugin from Github:

1. Go to (the Reactor Github repository)[https://github.com/toggledbits/Reactor];
1. Choose the branch for the version of Reactor you want to download:
    * master: The *master* branch is the last released version;
    * hotfix: The master release plus any important fixes that have come up since the master release--this version is expected to be at least as stable as master, if not more.
    * stable: The latest development release for which basic QA has been completed--may still contain bugs, but they should be trivial;
    * develop: The latest code changes checked in, with minimal QA--this version will be the bleeding-edge of functionality, but may also contain bugs (from the most trivial to soul-crushing, crash-inducing horrors);
1. Click the green "Download/clone" button, and choose "Download ZIP" from the pop-up;
1. Save the ZIP file somewhere;
1. Unzip the ZIP file;
1. Upload the unzipped files to your system. For Vera, the uploader at *Apps > Develop apps > Luup files* is recommended. When using the Vera uploader, turn *off* the "Restart Luup after upload" checkbox until the last file, then turn it back on; otherwise, you will be reloading Luup for every file, and that's not necessary and may be dangerous to system health.
1. If this is a clean, new installation of Reactor, create the Reactor master device. On Vera, this is done in *Apps > Develop apps > Create Device*. You only need to supply the name (description field) of the device (simply "Reactor" is recommended), the UPnP device filename (`D_Reactor.xml`) and UPnP implementation filename (`I_Reactor.xml`). Then reload Luup and [hard reload/cache refresh your browser](https://refreshyourcache.com/en/cache/).
