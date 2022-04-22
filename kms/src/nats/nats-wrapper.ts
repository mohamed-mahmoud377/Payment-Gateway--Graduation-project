import nats,{Stan} from 'node-nats-streaming'

class NatsWrapper {
    // it will not be defined until you use the connect function
    private _client?:Stan; // this tells ts that it can be undefined for some period for time

    public get client(){
        if(!this._client){
            throw new Error('Cannot access NATS client before connecting');
        }
        return this._client;

    }

    connect(clusterId:string,clientId:string,url:string){
        this._client = nats.connect(clusterId,clientId,{url:url,waitOnFirstConnect:true});
        return new Promise<void>(((resolve, reject) => {
            this.client.on('connect',()=>{
                console.log('Connected to Nats')
                resolve()
            })
            this.client.on('error',(err)=>{
                reject(err)
            })

        }))
    }
}

export const natsWrapper = new NatsWrapper();