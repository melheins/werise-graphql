// GraphQL Server Goes Here!

const { GraphQLServer} = require('graphql-yoga')
const photos = require('./data/photos.json')
const users = require('./data/users.json')


const typeDefs = `
    #! after var type means required
    type Photo {
        id: ID!
        name: String!
        description: String
        category: PhotoCategory
    }
    type User {
        id: ID!
        name: String!
    }
    enum PhotoCategory {
        #Best Practice use caps for enum
        LANDSCAPE
        SELFIE
        PORTRAIT
    }
    type Query {
        totalPhotos: Int! 
        allPhotos: [Photo!]!
        totalUsers: Int!
        allUsers: [User!]!
    }
    input PostPhotoInput {
        name: String!
        description: String
        category: PhotoCategory=PORTRAIT
    }
    input PostUserInput {
        name: String!
    }
    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
        postUser(input: PostUserInput!): User!
    }
`

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
        totalUsers: () => users.length,
        allUsers: () => users,
    },
    Mutation: {
        postPhoto: (root, args) => {
            //console.log(args)
            const newPhoto = {
                id: '7',
                name: args.input.name,
                description: args.input.description,
                category: args.input.category
                // need to upgrade node to use spread
                //...args.input
            }
            photos.push(newPhoto)
            return newPhoto
        },
        postUser: (root, args) => {
            //console.log(args)
            const newUser = {
                id: '7',
                name: args.input.name
            }
            users.push(newUser)
            return newUser
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

const options = {
    port: 4000,
    endpoint: '/graphql',
    playground: '/playground'
}

const ready = ({port}) =>
    console.log (`graph service running on port ${port}`)

server.start(options,ready)