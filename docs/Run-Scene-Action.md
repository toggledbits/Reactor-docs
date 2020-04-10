# Run Scene Action

The _Run Scene_ action pretty much does what it says: runs a selected Vera scene.

If the scene contains Lua, the return value of the Lua script determines whether or not the scene actions are run. If the scene Lua returns explicitly *false*, the scene's actions are not run. Note that this does not stop any remaining actions in the same ReactorSensor activity, however &mdash; as soon as the scene execution completes, whether its actions were run or not, the ReactorSensor activity continues at the next action.

## Options

The sole option for the _Run Scene_ action is whether the scene is run by Reactor (the default), or if the scene is handed off to Luup for execution.

When running the scene in Reactor (the default):

1. Reactor tracks the scene progress, including all delayed groups. If Luup restarts or execution is interrupted by a power failure or other event, Reactor will restart the scene where it left off as part of recovery. This makes scenes more resilient and ensures that critical actions will be performed (including actions in delayed scene groups).
1. The "immediate" group (the actions having no delay) are run in sequence by Reactor before any other actions in the activity follow. If there are delayed groups in the scene, Reactor does not wait for these; they are scheduled to run as configured.
1. The scene can be stopped by another activity using a [_Stop Activity_ action](Stop-Activity-Action.md), or from Lua or other facilities by invoking the `StopActivity` device action on the ReactorSensor.
1. Scene Lua is executed in the plugin environment (jail), so globals defined by startup Lua or other scene Lua are not available, but the Reactor context, including Reactor variables via the `Reactor.variables` table and other features, are available (see the [_Run Lua_ action](Run-Lua-Action#reactor-context)).
1. Any non-device action Vera scene features (such as sending Vera notifications) are not performed. Only the scene Lua and its device actions are run. The scene's "last run" timestamp is also not updated.

When handing off the scene to Luup:

1. Reactor does not monitor the scene's progress or success/failure. If the scene fails or is interrupted by a Luup restart or other event (power failure, etc.), Reactor makes no effort to restart the scene.
1. The next action in the ReactorSensor's activity is run immediately, without waiting for the scene to complete. Luup will start the scene asynchronously; there is no way to determine when Luup's scheduler will start the scene, or when or if it has completed.
1. Scene Lua is run in the normal Vera/Luup global scene/startup Lua environment, not the Reactor plugin environment, so there is no access to the Reactor context (see above).
1. Any non-device action Vera scene features (e.g. sending Vera notifications) will be performed as usual for Vera/Luup native scenes.

## Importing Scenes

You can import a Vera scene's actions into an activity. The actions are appended to the activity, including any delays. If your activity already contains other actions, and in particular if it contains other delays, it may be necessary to reorder the imported actions so that they all execute in a sensible order together.

## Scene Changes

Because of the way scene data must be retrieved from Vera, scene data is cached by Reactor for best performance. If a scene changes, Reactor may run one cycle of the "old" scene definition before the updated version is cached, so if you're debugging running a scene with Reactor, make sure you run it twice after each change to the scene &mdash; the first run *may* still use the old scene definition, but the second time should run with your changes as expected.

On openLuup, you need to reload Luup after any scene changes for Reactor to update its cache as described above.

## Paused Scenes

Vera allows you to "pause" a scene. This is done in the Vera UI using the "power button" control to the left of the scene name in UI7. When paused, a scene is not run when called. Reactor honors paused scenes by not running them. When a paused scene is skipped in this way, a message is written to the Logic Summary (Tools tab) "Events" section. Skipping a paused scene does not, however, cause a "trouble" flag on a ReactorSensor.
