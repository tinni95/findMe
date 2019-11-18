import gql from 'graphql-tag';

export const typeDefs = gql`
type localPosition{
    title:String!
    field:String!
    description:String!
    type:String!
}

extend type Query{
    postLocation: String!
    postOwner: String!
    postOwnerPosition:String!
    postTitle:String!
    postDescription:String!
    postCategories:[String]
    postPositions:[localPosition]
}`;

export const resolvers = {};
