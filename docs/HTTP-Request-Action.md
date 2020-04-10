# HTTP Request Action

The HTTP Request action allows the Activity to make an HTTP GET or POST request to a remote URL. The response from the target server can be capture in an expression-less variable for further processing. This essentially gives Reactor a built-in abbreviated version of the SiteSensor plugin.

Variable substitution using the standard `{varname}` syntax is supported in all fields. This is particularly useful in the HTTP GET query parameters, allowing them to be dynamic. It is recommended that the variable value be URL-escaped, which is straightforward by simply wrapping the variable name in a `urlencode()` function call like this: `{urlencode(varname)}`.

You may specify HTTP headers, one per line, to be sent with the request.

On POST queries, a data field is displayed allowing you to specify what data is to be sent. The action will automatically supply a `Content-Length` header for all POST requests, so you do not need to generate this yourself. Take care, however, that your headers include the correct `Content-Type` header for the type of data being sent.

## Response Size Limit

Because a server can return a response of virtually any length, and the response is necessarily buffered in RAM and also possibly stored in state for other expressions to use, it is necessary to limit the number of bytes accepted from the remote host. Were this not true, it would be possible for the remote host to return a response of such a size that would cause your system to instantly crash (a condition that may be very hard to troubleshoot, as it may appear to happen randomly).

The default limit is 2048 (2K) bytes. It can be increased by setting the `RequestActionResponseLimit` state variable of the ReactorSensor. Caution must be exercised, however, as the capacity of the system to store and handle the response is not infinite. Values much larger than 8192 (8K) bytes should be regarded with increasing suspicion. Corruption of state data and erratic operation of the ReactorSensor, or system crashes, may result if the limit is set to high. There is no hard rule, however, as the actual limit your system can tolerate will depend on the number of other plugins installed, how much memory they consume, etc.

Responses larger than the limit are truncated. This may cause errors in other expressions &mdash; the classic example is a large JSON response that becomes unparseable when truncated. The "Events" section of the Logic Summary will log truncation events and the actual size of the response, to help guide you in adjusting the response limit if necessary.

!!! attention "Try to Use Optimal Queries!"
    Your first, best option is to try to use queries that give you the data you need with the smallest response size possible. When querying a weather service, for example, a query that is as specific as possible may yield a desirable compact response, as opposed to requesting a multi-day forecast but using only current conditions from the response.

!!! attention "Trap: When You Have a Hammer, Everything Looks Like a Nail"
    If you find yourself processing very large responses regularly, you might do better using the SiteSensor plugin to collect the response and have the ReactorSensor grab the data from the SiteSensor device.

## Timeout

Currently, the default timeout is set to 15 seconds. The timeout can be adjusted by setting the `RequestActionTimeout` state variable on the ReactorSensor. The timeout is therefore the same for all *HTTP Request* actions made by the ReactorSensor; it is not configurable on a per-request basis.

## Errors

Errors in the request that cause the remote server to return an error, or responses that exceed the response length limit, will cause messages to be logged to the "Events" section of the ReactorSensor's Logic Summary (Tools tab), and the LuaUPnP.log, and in normal operation will also set the "trouble" flag on the ReactorSensor.

!!! attention "Check the Log!"
    If your query is not performing as expected, always check the "Events" section of the ReactorSensor's Logic Summary (Tools tab) and the LuaUPnP.log file. Error messages are logged to these locations. Because of the wide range of possible services to which this facility can connect, you are expected to be the expert on your target and its possible responses. It is too difficult to remotely troubleshoot queries to an even more remote service, and study and interpret the documentation and details of every endpoint you might choose to contact, so the author will not provide support for specific connectivity or response issues arising from your use of this action.