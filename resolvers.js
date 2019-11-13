import gql from 'graphql-tag';

export const typeDefs = gql`
extend type Query{
    postLocation: String!
    postOwnerIndex: Int!
    postOwnerPosition:String!
    postTitle:String!
    postDescription:String!
    postCategories:[String]
}`;

export const resolvers = {};
