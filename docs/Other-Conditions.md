# Luup Reload Condition

The "Luup Reload" condition pulses *true* briefly after a Luup reload, when Reactor is ready and running. It resets automatically, and takes no parameters. If you need to trigger an activity at startup, this condition offers a way to get that done.

![Luup Reloaded condition](images/reload-condition.png)

!!! tip 
    A common use for this condition is to trigger a notification when your Vera reloads. This can be helpful for troubleshooting, or as a "canary in the mine" for problems with Z-Wave devices, which tend to increase the number of reloads Vera makes.

# Comment

Condition groups allow you to have any number of comments. These don't affect the condition logic, but are available for you to use as documentation for your conditions so that at some future date, you can remember why things are the way you configured them.

![Comment Condition](images/comment-condition.png)
