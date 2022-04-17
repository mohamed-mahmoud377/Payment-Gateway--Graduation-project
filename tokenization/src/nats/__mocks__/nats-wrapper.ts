export  const natsWrapper = { // this mock for the real natsWrapper
    // all the connection stuff does not matter because it used in the app file but we get from the natsWrapper the
    // the client that we give to ticket created publisher which takes this client and give it to his parent the publiser
    // and the publisher now can publish the event using the publish function in client so the client in the end must
    // have the connect that we do not care about because to is actually connecting and the publish that we have to mock
    // client: {
    //     publish: (subject:string,data:string,callBack:()=>void)=>{
    //         callBack(); // this can work just fine and all the test cases that  require nats will passs
    // but you do not actually test this function but why ? test is a not real function in the first place
    // you can test to know that at least the route you are testing calling the function
    // or that it is actually tires to publish an event
    //     }
    // }
    client:{
        publish:jest.fn().mockImplementation((subject:string,data:string,callBack:()=>void)=>{
            callBack();
        })
    }
};