// const Redis = require("ioredis");

// const redis = new Redis({
//     host: "127.0.0.1",
//     port: 6379
// })

// redis.on('connect', ()=>{
//     console.log("Successfully Connected to Redis!");
// })

// redis.on('error', (error)=>{
//     console.log("Error Connecting to the Redis Server!",error);
// })

// module.exports = redis;

const Redis = require("ioredis");

const redis = new Redis({
    host: "singapore-redis.render.com", // Correct hostname
    port: 6379,
    password: "zc4KOc4h3qwx9ES8lgWgKg9dWfFwdLE9" // Auth password
});

redis.once('connect', () => {
    console.log("Successfully Connected to Redis!");
});

redis.once('error', (error) => {
    console.log("Error Connecting to the Redis Server!", error);
});

module.exports = redis;
