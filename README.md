<p align="center">
  <a href="http://www.hashcash.digital/"><img src="/Images/Logo/Asset logo 2 2.svg" height="200" width="200"></a>
</p>


<!-- shields -->

<p align="center">
  <img src="https://img.shields.io/badge/Maintained%3F-Yes-purple?style=for-the-badge">
  <img src="https://img.shields.io/github/issues/mohamed-mahmoud377/Payment-Gateway--Graduation-project?color=deeppink&style=for-the-badge">
  <img src="https://img.shields.io/github/stars/mohamed-mahmoud377/Payment-Gateway--Graduation-project?style=for-the-badge&color=purple">
  <img src="https://img.shields.io/github/forks/mohamed-mahmoud377/Payment-Gateway--Graduation-project?color=blueviolet&style=for-the-badge">
  <img src="https://visitor-badge-reloaded.herokuapp.com/badge?color=9D3480&page_id=mohamed-mahmoud377/Payment-Gateway--Graduation-project&style=for-the-badge&lcolor=555555"/>
</p>

<!-- shields -->

#### HashCash is a gradation project which aims to build a [payment gateway](https://en.wikipedia.org/wiki/Payment_gateway) for small merchants to start accepting payment really easy throw API integration without worrying about any [PCI](https://www.pcisecuritystandards.org/) requirements and merchant account details.
#### We are focusing on implementing the actual service and APIs the merchant is going to use and the PCI requirements that comes with it not focusing on the system as a whole.

#### see [wiki](https://github.com/mohamed-mahmoud377/Payment-Gateway--Graduation-project/wiki) pages for more info.

<!-- Code Tree (files structure) -->

<details>
   <summary><h2> Code Tree (files structure) </h2></summary>


```bash
Payment-Gateway--Graduation-project
├── apikey-manager
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── events
│   │   │   ├── eventTypes
│   │   │   │   ├── APIKeyVerifiedEvent.ts
│   │   │   │   └── verifyAPIKeyEvent.ts
│   │   │   ├── listeners
│   │   │   │   ├── emailVerifiedListener.ts
│   │   │   │   ├── merchantActivationListener.ts
│   │   │   │   └── verifyAPIKeyListener.ts
│   │   │   └── publishers
│   │   │       └── APIKeyVerifiedPublisher.ts
│   │   ├── index.ts
│   │   ├── models
│   │   │   └── keys.ts
│   │   ├── nats
│   │   │   └── nats-wrapper.ts
│   │   ├── routes
│   │   │   ├── changeMode.ts
│   │   │   ├── getKey.ts
│   │   │   └── getMode.ts
│   │   ├── types
│   │   │   └── queueGroupName.ts
│   │   └── utils
│   │       └── generateKey.ts
│   └── tsconfig.json
├── auth
│   ├── config
│   │   ├── dev.ts
│   │   ├── keys.ts
│   │   └── prod.ts
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── events
│   │   │   ├── listeners
│   │   │   │   └── merchantActivationListener.ts
│   │   │   └── publishers
│   │   │       ├── emailVerifiedPublisher.ts
│   │   │       ├── userCreatedPublisher.ts
│   │   │       ├── userForgotPasswordPublisher.ts
│   │   │       └── userLoggingInPublisher.ts
│   │   ├── helpers
│   │   │   └── runInDevelopment.ts
│   │   ├── index.ts
│   │   ├── middlewares
│   │   │   ├── rquireAuthforcurrent.ts
│   │   │   └── twoWayAuth.ts
│   │   ├── models
│   │   │   ├── loginSession.ts
│   │   │   └── user.ts
│   │   ├── nats
│   │   │   ├── __mocks__
│   │   │   │   └── nats-wrapper.ts
│   │   │   └── nats-wrapper.ts
│   │   ├── routes
│   │   │   ├── checkPassword.ts
│   │   │   ├── clearSessions.ts
│   │   │   ├── currentUser.ts
│   │   │   ├── deactivateMerchant.ts
│   │   │   ├── enableTwoFactorAuth.ts
│   │   │   ├── forgotPassword.ts
│   │   │   ├── getUsers.ts
│   │   │   ├── getUser.ts
│   │   │   ├── login.ts
│   │   │   ├── me.ts
│   │   │   ├── otpRegister.ts
│   │   │   ├── otpResend.ts
│   │   │   ├── refreshAccess.ts
│   │   │   ├── resetPassword.ts
│   │   │   ├── signout.ts
│   │   │   ├── signup.ts
│   │   │   ├── __test__
│   │   │   │   ├── checkPassword.test.ts.old
│   │   │   │   ├── login.test.ts
│   │   │   │   ├── otpRegister.test.ts.old
│   │   │   │   └── signup.test.ts.old
│   │   │   └── verifyEmail.ts
│   │   ├── test
│   │   │   └── setup.ts
│   │   ├── types
│   │   │   ├── queueGroupName.ts
│   │   │   └── roles.ts
│   │   └── utils
│   │       ├── generateFackUsers.ts
│   │       ├── jwtGenerator.ts
│   │       ├── otpGenerator.ts
│   │       ├── passwordManger.ts
│   │       └── userAgentParser.ts
│   └── tsconfig.json
├── checkout
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── events
│   │   │   ├── eventsTypes
│   │   │   │   ├── APIKeyVerifiedEvent.ts
│   │   │   │   ├── checkoutSessionCreated.ts
│   │   │   │   └── verifyAPIKeyEvent.ts
│   │   │   ├── listeners
│   │   │   │   └── APIKeyVerifiedListeners.ts
│   │   │   └── publishers
│   │   │       ├── checkoutSessionCreatedPublisher.ts
│   │   │       └── verifyAPIKeyPublisher.ts
│   │   ├── index.ts
│   │   ├── models
│   │   │   ├── checkoutSession.ts
│   │   │   ├── customer.ts
│   │   │   └── item.ts
│   │   ├── nats
│   │   │   └── nats-wrapper.ts
│   │   ├── routes
│   │   │   ├── createCheckoutSession.ts
│   │   │   ├── getCheckoutSeeion.ts
│   │   │   └── init.ts
│   │   ├── types
│   │   │   ├── chckoutStatus.ts
│   │   │   └── queueGroupName.ts
│   │   └── validators
│   │       └── validateCreateCheckoutSession.ts
│   └── tsconfig.json
├── client
│   ├── angular.json
│   ├── Dockerfile
│   ├── karma.conf.js
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── app
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app-routing.module.ts
│   │   │   ├── checkout
│   │   │   │   ├── checkout.component.css
│   │   │   │   ├── checkout.component.html
│   │   │   │   ├── checkout.component.spec.ts
│   │   │   │   └── checkout.component.ts
│   │   │   ├── forget-password
│   │   │   │   ├── forget-password.component.css
│   │   │   │   ├── forget-password.component.html
│   │   │   │   ├── forget-password.component.spec.ts
│   │   │   │   └── forget-password.component.ts
│   │   │   ├── guards
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── login.guard.ts
│   │   │   │   └── verify-email.guard.ts
│   │   │   ├── home
│   │   │   │   ├── Components
│   │   │   │   │   ├── activate-account
│   │   │   │   │   │   ├── activate-account.component.css
│   │   │   │   │   │   ├── activate-account.component.html
│   │   │   │   │   │   ├── activate-account.component.spec.ts
│   │   │   │   │   │   ├── activate-account.component.ts
│   │   │   │   │   │   ├── activation-form
│   │   │   │   │   │   │   ├── activation-form.component.css
│   │   │   │   │   │   │   ├── activation-form.component.html
│   │   │   │   │   │   │   ├── activation-form.component.spec.ts
│   │   │   │   │   │   │   └── activation-form.component.ts
│   │   │   │   │   │   ├── declined
│   │   │   │   │   │   │   ├── declined.component.css
│   │   │   │   │   │   │   ├── declined.component.html
│   │   │   │   │   │   │   ├── declined.component.spec.ts
│   │   │   │   │   │   │   └── declined.component.ts
│   │   │   │   │   │   └── pending
│   │   │   │   │   │       ├── pending.component.css
│   │   │   │   │   │       ├── pending.component.html
│   │   │   │   │   │       ├── pending.component.spec.ts
│   │   │   │   │   │       └── pending.component.ts
│   │   │   │   │   ├── navbar
│   │   │   │   │   │   ├── navbar.component.css
│   │   │   │   │   │   ├── navbar.component.html
│   │   │   │   │   │   ├── navbar.component.spec.ts
│   │   │   │   │   │   └── navbar.component.ts
│   │   │   │   │   └── profile
│   │   │   │   │       ├── profile.component.css
│   │   │   │   │       ├── profile.component.html
│   │   │   │   │       ├── profile.component.spec.ts
│   │   │   │   │       └── profile.component.ts
│   │   │   │   ├── home.component.css
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.module.ts
│   │   │   │   └── home-routing.module.ts
│   │   │   ├── login
│   │   │   │   ├── login.component.css
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.spec.ts
│   │   │   │   └── login.component.ts
│   │   │   ├── Models
│   │   │   │   ├── errors.ts
│   │   │   │   └── types.ts
│   │   │   ├── not-found
│   │   │   │   ├── not-found.component.css
│   │   │   │   ├── not-found.component.html
│   │   │   │   ├── not-found.component.spec.ts
│   │   │   │   └── not-found.component.ts
│   │   │   ├── primeng
│   │   │   │   └── primeng.module.ts
│   │   │   ├── reset-password
│   │   │   │   ├── reset-password.component.css
│   │   │   │   ├── reset-password.component.html
│   │   │   │   ├── reset-password.component.spec.ts
│   │   │   │   └── reset-password.component.ts
│   │   │   ├── Services
│   │   │   │   ├── auth.service.spec.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── refresh-token.service.ts
│   │   │   │   ├── shared
│   │   │   │   │   └── handle-errors.service.ts
│   │   │   │   └── user.service.ts
│   │   │   ├── shared
│   │   │   │   ├── error
│   │   │   │   │   ├── error.component.css
│   │   │   │   │   ├── error.component.html
│   │   │   │   │   ├── error.component.spec.ts
│   │   │   │   │   └── error.component.ts
│   │   │   │   ├── interceptors
│   │   │   │   │   └── header.interceptor.ts
│   │   │   │   ├── loading
│   │   │   │   │   ├── component
│   │   │   │   │   │   └── comp-loading
│   │   │   │   │   │       ├── comp-loading.component.css
│   │   │   │   │   │       ├── comp-loading.component.html
│   │   │   │   │   │       └── comp-loading.component.ts
│   │   │   │   │   └── html
│   │   │   │   │       ├── loading.component.css
│   │   │   │   │       ├── loading.component.html
│   │   │   │   │       └── loading.component.ts
│   │   │   │   └── utils
│   │   │   │       └── cleanObj.ts
│   │   │   ├── signup
│   │   │   │   ├── signup.component.css
│   │   │   │   ├── signup.component.html
│   │   │   │   ├── signup.component.spec.ts
│   │   │   │   └── signup.component.ts
│   │   │   └── verify-email
│   │   │       ├── verify-email.component.css
│   │   │       ├── verify-email.component.html
│   │   │       ├── verify-email.component.spec.ts
│   │   │       └── verify-email.component.ts
│   │   ├── assets
│   │   │   └── images
│   │   │       ├── declined.png
│   │   │       ├── error.png
│   │   │       ├── haeder.png
│   │   │       ├── logo.png
│   │   │       ├── not-found.png
│   │   │       ├── otp.jpg
│   │   │       ├── otp.png
│   │   │       └── pending.png
│   │   ├── environments
│   │   │   ├── environment.prod.ts
│   │   │   └── environment.ts
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   ├── proxy.conf.json
│   │   ├── styles.css
│   │   └── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
├── common
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── errors
│   │   │   ├── badRequestError.ts
│   │   │   ├── customError.ts
│   │   │   ├── forbiddenError.ts
│   │   │   ├── InternalServerError.ts
│   │   │   ├── notAuthorizedError.ts
│   │   │   ├── notFoundError.ts
│   │   │   ├── requestValidationError.ts
│   │   │   └── types
│   │   │       └── errorCodes.ts
│   │   ├── events
│   │   │   ├── eventTypes
│   │   │   │   ├── emailVerifiedEvent.ts
│   │   │   │   ├── forgotPasswordEvent.ts
│   │   │   │   ├── merchantActivationEvent.ts
│   │   │   │   ├── userCreatedEvent.ts
│   │   │   │   └── userLoggingInEvent.ts
│   │   │   ├── listeners
│   │   │   │   └── listener.ts
│   │   │   ├── publishers
│   │   │   │   └── publisher.ts
│   │   │   └── Subjects.ts
│   │   ├── index.ts
│   │   ├── middlewares
│   │   │   ├── errorHandler.ts
│   │   │   ├── requireAuth.ts
│   │   │   ├── restrictTo.ts
│   │   │   └── validateRequest.ts
│   │   ├── models
│   │   │   └── events.ts
│   │   ├── types
│   │   │   ├── modes.ts
│   │   │   ├── Payload.ts
│   │   │   └── roles.ts
│   │   └── utils
│   │       ├── APIFilter.ts
│   │       ├── decrypt.ts
│   │       ├── encrypt.ts
│   │       ├── handlerFactory.ts
│   │       ├── jwtGenerator.ts
│   │       ├── passwordManger.ts
│   │       ├── security.ts
│   │       └── sendSuccess.ts
│   └── tsconfig.json
├── customer
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── index.ts
│   │   └── nats
│   │       └── nats-wrapper.ts
│   └── tsconfig.json
├── emailing
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── emails
│   │   │   └── emails.ts
│   │   ├── events
│   │   │   └── listeners
│   │   │       ├── merchantActivationListener.ts
│   │   │       ├── merchantCreatedListener.ts
│   │   │       ├── merchantForgotPasswordListener.ts
│   │   │       └── userLoggingInListener.ts
│   │   ├── index.ts
│   │   ├── nats
│   │   │   └── nats-wrapper.ts
│   │   ├── types
│   │   │   └── queueGroupName.ts
│   │   └── views
│   │       └── emails
│   │           ├── applicationApproved.pug
│   │           ├── applicationDeclined.pug
│   │           ├── baseEmail.pug
│   │           ├── otp-login.pug
│   │           ├── otp-signup.pug
│   │           ├── passwordReset.pug
│   │           ├── _style.pug
│   │           └── welcome.pug
│   └── tsconfig.json
├── Images
│   └── Logo
│       ├── Asset 22.svg
│       ├── Asset 23.svg
│       ├── Asset logo 1 2.svg
│       ├── Asset logo 2 2.svg
│       └── icon 10.svg
├── infra
│   ├── k8s
│   │   ├── apikey-manager-depl.yaml
│   │   ├── apikey-manager-mongo-depl.yaml
│   │   ├── authentication-depl.yaml
│   │   ├── authentication-mongo-depl.yaml
│   │   ├── checkout-depl.yaml
│   │   ├── checkout-mongo-depl.yaml
│   │   ├── customer-depl.yaml
│   │   ├── customer-mongo-depl.yaml
│   │   ├── emailing-depl.yaml
│   │   ├── kms-depl.yaml
│   │   ├── kms-mongo-depl.yaml
│   │   ├── manage-business-depl.yaml
│   │   ├── manage-businessmongo-depl.yaml
│   │   ├── nats-depl.yaml
│   │   ├── payment-depl.yaml
│   │   ├── payment-mongo-depl.yaml
│   │   ├── tokenization-depl.yaml
│   │   └── tokenization-mongo-depl.yaml
│   ├── k8s-accounts
│   │   └── admin.yaml
│   ├── k8s-dev
│   │   ├── ingress-srv.yaml
│   │   ├── mongo-authentication-nodePort.yaml
│   │   └── mongo-kms-nodeport.yaml
│   └── k8s-prod
│       ├── client-deply.yaml
│       └── ingress-srv.yaml
├── kms
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── events
│   │   │   └── publishers
│   │   │       └── userLoggingInPublisher.ts
│   │   ├── helpers
│   │   │   └── runInDevelopment.ts
│   │   ├── index.ts
│   │   ├── middlewares
│   │   │   └── protect.ts
│   │   ├── models
│   │   │   ├── admin.ts
│   │   │   ├── events.ts.old
│   │   │   ├── key.ts
│   │   │   ├── loginSession.ts
│   │   │   └── tokens.ts
│   │   ├── nats
│   │   │   ├── __mocks__
│   │   │   │   └── nats-wrapper.ts
│   │   │   └── nats-wrapper.ts
│   │   ├── routes
│   │   │   ├── dataEncryptKey.ts
│   │   │   ├── decryptDataEncryptKey.ts
│   │   │   ├── deleteKey.ts
│   │   │   ├── deleteToken.ts
│   │   │   ├── generateMaster.ts
│   │   │   ├── getKeys.ts
│   │   │   ├── getKey.ts
│   │   │   ├── getServiceAccessToken.ts
│   │   │   ├── getTokens.ts
│   │   │   ├── login.ts
│   │   │   └── otpRegister.ts
│   │   └── utils
│   │       ├── decrypt.ts
│   │       ├── encrypt.ts
│   │       ├── generateKey.ts
│   │       ├── jwtGenerator.ts
│   │       ├── otpGenerator.ts
│   │       └── userAgentParser.ts
│   └── tsconfig.json
├── LICENSE
├── manage-business
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── events
│   │   │   ├── listeners
│   │   │   │   ├── emailVerifiedListener.ts
│   │   │   │   └── queueGroupName.ts
│   │   │   └── publishers
│   │   │       └── merchantActivatedPublisher.ts
│   │   ├── index.ts
│   │   ├── models
│   │   │   ├── bankAccount.ts
│   │   │   ├── businessActivationRequest.ts
│   │   │   ├── businessApplication.ts
│   │   │   ├── businessInfo.ts
│   │   │   └── businessOwner.ts
│   │   ├── nats
│   │   │   └── nats-wrapper.ts
│   │   ├── routes
│   │   │   ├── AllActivationsRequests.ts
│   │   │   ├── approveActivationRequest.ts
│   │   │   ├── declineActivationRequest.ts
│   │   │   ├── getAcitvationRequest.ts
│   │   │   ├── MyActivationRequest.ts
│   │   │   └── submitActivationRequest.ts
│   │   ├── types
│   │   │   └── RequestStatus.ts
│   │   └── utils
│   │       └── validator.ts
│   └── tsconfig.json
├── payment
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── events
│   │   │   ├── eventsTypes
│   │   │   │   ├── APIKeyVerifiedEvent.ts
│   │   │   │   ├── checkoutSessionCreated.ts
│   │   │   │   └── verifyAPIKeyEvent.ts
│   │   │   └── listeners
│   │   │       └── checkoutCreatedListener.ts
│   │   ├── index.ts
│   │   ├── models
│   │   │   ├── Item.ts
│   │   │   └── payment.ts
│   │   ├── nats
│   │   │   └── nats-wrapper.ts
│   │   └── types
│   │       ├── paymentStatus.ts
│   │       └── queueGroupName.ts
│   └── tsconfig.json
├── push.ps1
├── push.sh
├── README.md
├── skaffold.yaml
├── tokenization
│   ├── docker
│   │   ├── Dockerfile-dev
│   │   └── Dockerfile-prod
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── helpers
│   │   │   └── runInDevelopment.ts
│   │   ├── index.ts
│   │   ├── middlewares
│   │   │   └── protect.ts
│   │   ├── models
│   │   │   ├── accessToken.ts
│   │   │   └── token.ts
│   │   ├── nats
│   │   │   ├── __mocks__
│   │   │   │   └── nats-wrapper.ts
│   │   │   └── nats-wrapper.ts
│   │   ├── routes
│   │   │   ├── deTokenize.ts
│   │   │   ├── getServiceAccessToken.ts
│   │   │   └── tokenize.ts
│   │   └── utils
│   │       └── generateToken.ts
│   └── tsconfig.json
└── updatePackages.ps1

150 directories, 399 files


```

</details>

<!-- Code Tree (files structure) -->

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
**Note that** we are deploying all of our services on a [digitalOcean](https://www.digitalocean.com/) cluster that may not be available at any point of time in the future
which means that may need to run the code locally to test it.
