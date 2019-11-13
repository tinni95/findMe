import gql from 'graphql-tag';

export const typeDefs= gql `
extend type Query{
    postLocation: String!
    postOwnerType: Int!
}`;

export const resolvers = {};
