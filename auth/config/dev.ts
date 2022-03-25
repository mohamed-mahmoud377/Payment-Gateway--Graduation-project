
export const dev = {
    mongoURL: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_KEY,
    natsClientId: process.env.NATS_CLIENT_ID,
    natsURL:  process.env.NATS_URL,
    natsClusterId: process.env.NATS_CLUSTER_ID,

}