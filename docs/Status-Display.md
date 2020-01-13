# Reading the Status Display

> This section is out-dated and needs to be revamped. The small amount of information presented still applies, but the appearance of the display has changed a lot, and much has been added.

To help you visualize your conditions, a ReactorSensor's device control panel shows a status display with all of the configured condition groups and their respective conditions. Each condition line shows the condition as configured, as well as the current value for the condition, whether or not the condition is currently matched (true), and the date/time at which the last change in match state occurred. If all conditions within a condition group are met, the background color of the condition group is light green; otherwise, it is white.

![Highlighted Group](https://www.toggledbits.com/sites/default/files/inline-images/Reactor%20Status%20Highlight.png)

In the above image, the first group's conditions are both met, so this group is highlighted (and the ReactorSensor is therefore tripped).

If your ReactorSensor also contains variables (defined by expressions, see Variables & Expressions, above), an addition section will display the name, expression, and most recent value for each.

