import { gql } from 'apollo-boost'


export const typeDefs = gql`
  extend type Query {
    selectedBlog: ID
  }
`;