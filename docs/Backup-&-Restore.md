## Making Backups
The master Reactor device has, in its control panel, options for backing up and restoring the entire set of ReactorSensors' conditions. When the Backup Now button is clicked, the current sensor configurations are written to a file named `reactor-config-backup.json` on the Vera or your openLuup install (in the same directory as the plugin files). A link is provided so that you can download this file and store it locally, which is recommended, in case your Vera storage becomes corrupted. 

> IMPORTANT: If a copy of the backup file is not downloaded and saved elsewhere than on the Vera, a factory reset or replacement of the Vera would also lose the only backup available, and require the user to rebuild all ReactorSensors manually. Therefore, downloading and archiving your Reactor configuration any time you've completed important changes is highly recommended.

> TIP: When downloading backup files, modify the filename to include the date, and perhaps even time. I like to use YYMMDD or YYMMDD-HHMM format (e.g. `reactor-config-backup-181130.json`), since it ends up sorted properly by date in the alphabetical file listings.

## Restoring from Backup
The Restore button restores the last configuration backup (stored on the Vera as `reactor-config-backup.json` in `/etc/cmh-ludl/` on Vera or the directory in which Reactor is installed on openLuup), if it exists. You may restore the entire configuration, or just that of a single ReactorSensor. 

When restoring "ALL" configurations, Reactor will attempt to find the target ReactorSensor for each configuration by searching for an existing ReactorSensor with the same name as the configuration; if it is not found, the restore is not performed, so if you are restoring after a factory reset of your Vera, for example, it may be necessary to create multiple sensors and then rename them prior to attempting the restore. Alternately, you may do a "directed restore," in which you choose a single configuration to restore from those available in the backup file, and specify the target ReactorSensor to which the configuration will be restored. In this latter case, the name of the target sensor is not relevant, because you are telling Reactor explicitly where to save the configuration.

> IMPORTANT: The restore process takes several steps. Make sure to stay on the _Backup and Restore_ tab until all of the restore steps report "done." A hard-refresh of your browser is then required to ensure that the restored configurations are properly displayed by the user interface.

> NOTE: Restoring ReactorSensors does not "fix" device numbers in conditions, expressions, and activities. The same applies for scene numbers in "Run Scene" activities. You'll need to go through the configuration and fix these yourself, although they should be easy to find--Reactor marks these items "missing" in the various configuration tabs.

## Restoring from an Archived Backup File
If you have an older backup file from which you need to restore configuration, here is the procedure:

1. Make a current backup, and download the current backup file (see above). This ensures you have a current snapshot before moving forward, as a precaution should you take a misstep in this procedure and need to reverse it.
1. Make a copy of your archived file and name the copy `reactor-config-backup.json` (exactly).
1. Use the uploader at _Apps > Develop apps > Luup files_ to upload the file created in the previous step. openLuup users can use _scp_, _ftp_, or whatever other tool you normally prefer to transfer the file into the same directory as that in which the Reactor plugin files are installed.
1. Go to the _Backup and Restore_ tab on the Reactor master device. You should now see that the "current backup" is reported with the date of your archived backup. You may proceed with your restore as usual.
1. You may want to take a final backup after all of this, to capture the configuration in its new current state.