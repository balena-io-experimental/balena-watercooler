#!/bin/bash

echo "Setting volume"
amixer sset 'PCM' "${VOLUME-70}%"

echo "Starting watercooler"
node index.js

echo "App exited."

while : ; do
	echo "Idling..."
	sleep 600
done
