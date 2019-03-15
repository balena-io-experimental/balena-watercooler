const say = require("say");
const hash = require("object-hash");
const Session = require("flowdock").Session;

const FLOWDOCK_TOKEN = process.env.FLOWDOCK_TOKEN;

const voices = ["voice_don_diphone", "voice_kal_diphone", "voice_rab_diphone"];

let getVoice = function(base) {
  return;
};

let main = function() {
  let session = new Session(FLOWDOCK_TOKEN);

  session.flows(function(err, flows) {
    var anotherStream, flowIds;
    flowIds = flows.map(function(f) {
      return f.id;
    });
    anotherStream = session.stream(flowIds);
    return anotherStream.on("message", function(msg) {
      if (
        msg.event === "message" &&
        msg.content.length > 0 &&
        msg.content.length <= 600
      ) {
        console.log("message from stream:", msg);
        // Use semi-random voice and speed, but always the same
        let base = { user: msg.user, flow: msg.flow };
        // Voice will be one of the defined voices
        let voice = voices[Buffer.from(hash(base), "hex")[0] % voices.length];
        // Speed will map to 0.75-1.25 speed
        let speed = (Buffer.from(hash(base), "hex")[1] / 255) * 0.5 + 0.75;

        // Remove the syncbot-added link at the end
        let cleanMsg = msg.content.replace(/\[\](.*)/, "");
        try {
          say.stop();
        } catch {
          // don't do anything
        }
        say.speak(cleanMsg, voice, speed);
      }
    });
  });
};

if (FLOWDOCK_TOKEN) {
  main();
}
