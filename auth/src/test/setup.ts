import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo:MongoMemoryServer

jest.mock('../nats/nats-wrapper') // to make use of the mock file

jest.setTimeout(100000)

beforeAll(async ()=>{
    process.env.JWT_REFERSH_EXPIRES_IN_REMEMBER = '7d'
    process.env.JWT_REFERSH_EXPIRES_IN = '3h'
    process.env.JWT_ACCESS_EXPIRES_IN='6000'
    process.env.JWT_KEY = 'aververysecureskeysonfobtich' // because now we run outside the cluster, and the key is not defined
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
})

beforeEach(async ()=>{ // this function runs before every test
    // deletes all the collection in the database before every test
    const collections = await mongoose.connection.db.collections();
    const asyncCollections =collections.map(async val => val.deleteMany({}) )
    await Promise.all(asyncCollections);
})

afterAll(async ()=>{ // after running all tests just
    // stop mongo and close the connection
    await mongo.stop();
    await mongoose.connection.close();
})
