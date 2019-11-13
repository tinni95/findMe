import gql from 'graphql-tag';

export const typeDefs= gql `
extend type Query{
    postLocation: String!
    postOwnerIndex: Int!
    postOwnerPosition:String!
    postTitle:String!
    postDescription:String!
}`;

export const resolvers = {};
