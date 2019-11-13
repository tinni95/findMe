import gql from 'graphql-tag';

export const typeDefs= gql `
extend type Query{
    postLocation: String!
    postOwnerIndex: Int!
    postOwnerPosition:String!
}`;

export const resolvers = {};
