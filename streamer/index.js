const NodeMediaServer = require('node-media-server');

require('dotenv').config();

const rtmpPort = process.env.RTMP_PORT || 1935;
const httpPort = process.env.HTTP_PORT || 8000;
const corsOrigin = process.env.CORS_ORIGIN;

const config = {
    rtmp: {
        port: rtmpPort,
        ping: 30,
        ping_timeout: 60,
        gop_cache: true,
        chunk_size: 60000
    },
    http: {
        port: httpPort,
        allow_origin: corsOrigin
    }
};

var nms = new NodeMediaServer(config)
nms.run();

console.log(`RTMP server running at rtmp://localhost:${rtmpPort}/live`);
console.log(`HTTP-FLV/HLS available at http://localhost:${httpPort}/live/<streamKey>.flv`);
