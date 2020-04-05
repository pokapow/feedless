const Server = require("ssb-server");
const fs = require("fs");
const path = require("path");
const config = require("./ssb-config");

// add plugins
Server.use(require("ssb-master"))
  .use(require("ssb-gossip"))
  .use(require("ssb-replicate"))
  .use(require("ssb-backlinks"))
  .use(require("ssb-about"))
  .use(require("ssb-contacts"))
  .use(require("ssb-invite"))
  .use(require("ssb-friends"))
  .use(require("ssb-query"))
  .use(require("ssb-device-address"))
  .use(require("ssb-identities"))
  .use(require("ssb-peer-invites"))
  .use(require("ssb-blobs"));

const server = Server(config);
console.log("SSB server started at", config.port);

// save an updated list of methods this server has made public
// in a location that ssb-client will know to check
const manifest = server.getManifest();
fs.writeFileSync(
  path.join(config.path, "manifest.json"), // ~/.ssb/manifest.json
  JSON.stringify(manifest)
);
