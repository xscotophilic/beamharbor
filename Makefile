# API commands
api-install:
	cd api && npm install

api-start:
	cd api && npm run start

api-build:
	cd api && npm run build

api-test:
	cd api && npm run test

# Streamer commands
streamer-install:
	cd streamer && npm install

streamer-start:
	cd streamer && npm run start

streamer-build:
	cd streamer && npm run build

streamer-test:
	cd streamer && npm run test

# Client commands
client-install:
	cd client && npm install

client-start:
	cd client && npm run start

client-build:
	cd client && npm run build

client-test:
	cd client && npm run test

# Aggregate commands
install: api-install streamer-install client-install

start:
	# Run services in background and wait so Ctrl+C stops all
	cd api && npm run start & \
	cd streamer && npm run start & \
	cd client && npm run start & \
	wait

build: api-build streamer-build client-build

test: api-test streamer-test client-test
