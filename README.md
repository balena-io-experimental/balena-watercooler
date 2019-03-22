# Watercooler Speaker for Flowdock

A project for remote teams. You might be on your own working day in and day out, without
talking to any other co-worker besides on chat. Let's have a tool that makes it like
your team is there with you! This watercooler speaker taps into our team's Flowdock chat
and grabs all the messages that would otherwise pop up in your notifications, and speaks
them out.

A demo is shown at https://youtu.be/rYKOME1WNXc

Some implementation details:

* Messages above certain length are ignored, as would take a long time to speak out
* Only one message is spoken at a time, if a message is spoken and a new one comes in, the
  new one will interrupt
* The voices are sort-of random: based on hashing the user ID and flow ID and generating
  voice and speed from that. The same user on the same flow will always sound the same because
  of this, while there are randomish variations of the voices between speakers in general.
* Currently only tapping into [Flowdock](https://www.flowdock.com/), while there could be easy
  ways to add other chat systems like Slack into the support, as well as being able to select
  what flows / channels to monitor. 

## Usage

* Set Flowdock token by the `FLOWDOCK_TOKEN` service variable for the `speaker` service.
* Can ajust the software-defined volume by the `VOLUME` env var (it's nonlinear, as much as I can tell,
  depends on `amixer`'s behaviour

See more details regarding setting these variables in our [documentation][env-var-docs]

Hardware differences:

Audio might need to be enabled different ways for different device types. For example for the Raspberry Pi,
to use the built in audio jack,  enable the `dtparam` needs to have `audio=on` added, and plug in a speaker.
See in our [documentation](dtparam) how to do that.


[env-var-docs]: https://www.balena.io/docs/learn/manage/serv-vars/ "Environment and service variables"
[dtparam]: https://www.balena.io/docs/reference/OS/advanced/#setting-device-tree-overlays-dtoverlay-and-parameters-dtparam "Setting device tree overlays (dtoverlay) and parameters (dtparam)"
