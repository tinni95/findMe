import gql from 'graphql-tag';

export const typeDefs= gql `
extend type Query{
    postLocation: String!
    postOwnerIndex: Int!
}`;

export const resolvers = {};
