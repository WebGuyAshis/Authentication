const Redis = require("ioredis");

const redis = new Redis({
    host: "127.0.0.1",
    port: 6379
})

redis.on('connect', ()=>{
    console.log("Successfully Connected to Redis!");
})

redis.on('error', (error)=>{
    console.log("Error Connecting to the Redis Server!",error);
})

module.exports = redis;