// pm2 process for Trackio. Used by deploy/deploy.sh:
//   pm2 startOrReload deploy/ecosystem.config.cjs --update-env
// The app runs from ~/trackio-app/current (outside the repo), so rebuilding
// never deletes the files being served.
const path = require("path");
const os = require("os");

const APP_DIR = process.env.TRACKIO_APP_DIR || path.join(os.homedir(), "trackio-app");

module.exports = {
  apps: [
    {
      name: "trackio",
      cwd: path.join(APP_DIR, "current"),
      script: "server.mjs",
      env: {
        NODE_ENV: "production",
        // Local port only — your reverse proxy (nginx/Caddy) forwards the domain to it.
        // Pick a port that your portfolio isn't using.
        PORT: 3001,
        HOST: "127.0.0.1",
      },
      max_memory_restart: "150M",
    },
  ],
};
