# Instructions

## Step 1: Create database endpoint
Follow the instruction to install prisma and [create a new demo prisma database](https://www.prisma.io/docs/-a001/). You will also find how to setup your own database using docker if you are interested.

You need the demo database url from that tutorial. You can skip this part if you already have another prisma endpoint.

## Step 2: Update .env file
Create a .env file with the prisma api endpoint you got from step 1,
```
PRISMA_API=https://eu1.prisma.sh/abcdefg/hello-world/dev
```

## Step 3: Install additional cli tools
graphql cli will help us generate schema from prisma automagically.
```
npm i -g graphql-cli prisma
```

## Step 4: Deployment
Install all dependencies,
```
yarn install
```

Deploy the schema to endpoint,
```
prisma deploy
```

Start the app,
```
yarn start
```

## Step 5: Enjoy
Open browser and go to the playground at http://localhost:4000

# Queries

Get all users
```graphql
query users {
  users {
    id
    name
  }
}
```

# Mutations
```graphql
# Create a user
mutation createUser{
  createUser(name: "POI"){
    id
    name
  }
}

# Update a user by id
mutation updateUser{
  updateUser(id: "cjwuaubca8d2j0b05hd22o9ih", name: "Bob Max") {
    id
    name
  }
}
```

# Subscriptions
The following subscriptions are implemented with pub-sub,
```graphql
subscription userAdded {
  userAdded {
    id
    name
  }
}

subscription userUpdated {
  userUpdated {
    id
    name
  }
}
```

The following is implemented with prisma-binding, it's a bit different then prisma-client on the resolver file,
```graphql
subscription user{
  user{
    mutation
    node{
      id
      name
    }
    updatedFields
  }
}
```