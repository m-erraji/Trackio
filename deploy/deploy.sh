#!/usr/bin/env bash
# Build the Trackio site and swap in the new release. Run from anywhere as medxd:
#   ~/Trackio/deploy/deploy.sh          (or: npm run deploy)
# Live at https://trackio.erraji.net (nginx config: deploy/nginx.trackio.erraji.net.conf)
# The running server lives in ~/trackio-app/current, outside the repo, so a
# rebuild never deletes the files it is serving.
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)"
APP_DIR="${TRACKIO_APP_DIR:-$HOME/trackio-app}"
export TRACKIO_APP_DIR="$APP_DIR"

cd "$SRC"
npm ci
npm run build

# A release = the built site (dist/) + the small static server that serves it.
mkdir -p "$APP_DIR"
rm -rf "$APP_DIR/release.new"
mkdir "$APP_DIR/release.new"
cp -r dist "$APP_DIR/release.new/dist"
cp deploy/server.mjs "$APP_DIR/release.new/server.mjs"

# Keep the previous release for a quick rollback.
cd "$APP_DIR"
rm -rf release.old
if [ -d current ]; then mv current release.old; fi
mv release.new current

pm2 startOrReload "$SRC/deploy/ecosystem.config.cjs" --update-env
pm2 save
echo "Deployed. Rollback: cd $APP_DIR && mv current release.bad && mv release.old current && pm2 restart trackio"
