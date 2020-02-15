# Run Activity Action

The _Run Activity_ action allows you to run the activities/action associated with another group in the current or another ReactorSensor. Every possible activity in the selected ReactorSensor is available (including activities associated with disabled groups). 

When the _Run Activity_ action is executed, even on the current ReactorSensor, the selected activity is run as a job, meaning it starts when Vera's job process gets around to it. That is usually almost immediate, but if there is a backlog of other jobs (including Z-Wave device communications) there may be a delay. The activity using _Run Activity_ does not wait for the job to complete--the called activity is run entirely asynchronously.

It follows, then, the activity is run in the context of the device that owns the activity. That is, when running an activity on another ReactorSensor, the actions of that activity are run by the other ReactorSensor. That means that if an action makes references to an expression/variable, for example, that value will be taken from the ReactorSensor that owns the activity, not the ReactorSensor this ReactorSensor (that is, the one with the _Run Activity_ action). That is, Scott is telling Dale to play a song from his music book; Scott is not taking Dale's book and playing a song himself.

Unless the "Stop all activities" checkbox is checked, this action does not stop other activities that may currently be running on the target device. 

The counter-group behavior normally seen when group states change (i.e. the starting of the *false* group activity causes an implicit cancellation of a running *true* activity for the same group) is also *not* enforced by this action.

See also: [Stop Activity Action](Stop-Activity-Action.md)