<p align="center">
  <img width="130" hight="130" src="/Images/Logo/Asset logo 2 2.svg" />
<p/>
<h1 align="center"> HashCash</h1>

#### HashCash is a gradation project which aims to build a [payment gateway](https://en.wikipedia.org/wiki/Payment_gateway) for small merchants to start accepting payment really easy throw API integration without worrying about any [PCI](https://www.pcisecuritystandards.org/) requirements and merchant account details.
#### We are focusing on implementing the actual service and APIs the merchant is going to use and the PCI requirements that comes with it not focusing on the system as a whole.
## How did we build it ?
#### We are using event driven microservices' architecture. 
## our technology stack:
- [Typescript](https://www.typescriptlang.org/) as the main languages for all backend services
- [Express](https://expressjs.com/) framework to handle http requests in the backend
- [MongoDB](https://www.mongodb.com/) for database and [mongoose](https://mongoosejs.com/docs/guide.html) for ODM
- [Nats streaming server](https://github.com/nats-io/nats-streaming-server) as event bus and message queue -a little outdated but for our learning purposes it get the job done just like kafka for example-
- [Ingress-nginx](https://kubernetes.github.io/ingress-nginx/) for load balancing 
- [Docker](https://www.docker.com/) for containerization
- [kubernetes](https://kubernetes.io/) for orchestration
- [Jest](https://jestjs.io/) for testing 
### You can view all the services endpoints  docs from [postman workspace](https://www.postman.com/planetary-water-344318/workspace/payment-gateway-gp)
#### To test these endpoints you should run it in the production env 
**Note that** we are deploying all of our services on a [digitalOcean](https://www.digitalocean.com/) cluster that may not be available at any point of time in the future <br>
which means that may need to run the code locally to test it.
