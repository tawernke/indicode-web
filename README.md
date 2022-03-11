# README #

This README document contains an overview of this project and the steps necessary to get it up and running locally. See deployment for notes on how to deploy the project on a live system.

### What is this repository for? ###

This repo is the frontend for an ecommerce jewellery site 

### Built With

- [next](https://nextjs.org/docs/getting-started)
- [typescript](https://github.com/microsoft/TypeScript)
- [graphql](https://github.com/graphql)
- [apollo-client](https://github.com/apollographql/apollo-client)
- [chakra-ui](https://github.com/chakra-ui/chakra-ui)
- [formik](https://github.com/jaredpalmer/formik)
- [cloudinary](https://cloudinary.com/documentation)

#### Prerequisites

What things you need to install the software and how to install them

- [nvm](https://github.com/nvm-sh/nvm#install--update-script)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

#### Installing

```sh
nvm use
cp .env.example .env # make a new env file
yarn # install dependencies
yarn dev # start server
```

### Deployment

This frontend is deployed automatically deployed to [Vercel](https://vercel.com/) when commits are made to the master branch
