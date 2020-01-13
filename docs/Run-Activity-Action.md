# Run Activity Action

The _Run Activity_ action allows you to run the activities/action associated with another group in the current or another ReactorSensor. It essentially is a "call" to the other activity as if it were a function (but there a catch... read on).

Each possible activity in the selected ReactorSensor is available (including activities associated with disabled groups). 

When the _Run Activity_ action is executed, even on the current ReactorSensor, the selected activity is run as a job, meaning it starts when Vera's job process gets around to it. That is usually almost immediate, but if there is a backlog of other jobs (including Z-Wave device communications) there may be a delay. The activity using _Run Activity_ is not delayed by the called activity--the called activity is run entirely asynchronously. 

This action also does not stop other activities that may currently be running on the target device. The counter-group behavior normally seen when group states change (i.e. the starting of the *false* group activity causes an implicit cancellation of a running *true* activity for the same group) is *not* enforced by this action.

This action was introduced in Reactor 3.4.