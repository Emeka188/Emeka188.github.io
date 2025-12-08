#!/bin/sh
set -e

# If DB doesn't exist, initialize it using the included script
if [ ! -f ./db.sqlite ]; then
  echo "Initializing SQLite DB..."
  node init-db.js || echo "init-db failed"
fi

# Run the requested CMD
exec "$@"
