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

Get all products
```graphql
query Products {
  products{
    id
    transactions{
      id
      time
      quantity
    }
  }
}
```

Get one specific product by id
```graphql
query Product {
  product(where: {id: "5d02172924aa9a00070bc5b6"}){
    id
    transactions{
      id
      time
      quantity
    }
  }
}
```

# Mutations
```graphql
# Create a product
mutation createProduct {
  createProduct(data: { }) {
    id
    transactions {
      id
      quantity
      time
    }
  }
}

# Update a product by id
mutation updateProduct {
  updateProduct(
    where: { id: "5d02172924aa9a00070bc5b6" }
    data: { transactions: { create: { quantity: 50, time: "2018-01-26T06:16:12.123Z" } } }
  ) {
    id
    transactions {
      id
      time
      quantity
    }
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
subscription product{
  product{
    mutation
    node{
      id
    }
    updatedFields
  }
}

subscription transaction{
  transaction{
    mutation
    node{
      id
    }
    updatedFields
    previousValues{
      id
    }
  }
}
```