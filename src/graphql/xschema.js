import {listBlogs, listPosts, listPoles, listComments, listReplys, } from '../graphql/queries';
import {updateBlog, createBlog, deleteBlog, updatePost, createPost, deletePost, updatePole, createPole, deletePole, updateComment, createComment, deleteComment, updateReply, createReply, deleteReply, } from '../graphql/mutations';
import { gql } from 'apollo-boost'

export const xschema = {Blog: {
  createMutation: gql(createBlog),
  updateMutation: gql(updateBlog),
  deleteMutation: gql(deleteBlog),
  listQuery: gql(listBlogs),
  fields: [
    {name: 'id', gqlType: {type: 'ID!'}},
    {name: 'name', gqlType: {type: 'String!'}},
    {name: 'posts', gqlType: {type: '[Post]', 'connectionType': 'oneToManyConnection', query: (id) => [gql(listPosts), {pollInterval: 50, variables: {filter: {blogID: {eq: id}}}}]}},
    {name: 'poles', gqlType: {type: '[Pole]', 'connectionType': 'oneToManyConnection', query: (id) => [gql(listPoles), {pollInterval: 50, variables: {filter: {blogID: {eq: id}}}}]}},
]
},
Post: {
  createMutation: gql(createPost),
  updateMutation: gql(updatePost),
  deleteMutation: gql(deletePost),
  listQuery: gql(listPosts),
  fields: [
    {name: 'id', gqlType: {type: 'ID!'}},
    {name: 'title', gqlType: {type: 'String!'}},
    {name: 'blogID', gqlType: {type: 'ID!'}},
    {name: 'blog', gqlType: {type: 'Blog', 'connectionType': 'oneToOneConnection', query: (id) => [gql(listBlogs), {pollInterval: 50, variables: {filter: {id: {eq: id}}}}]}},
    {name: 'content', gqlType: {type: 'String!'}},
    {name: 'comments', gqlType: {type: '[Comment]', 'connectionType': 'oneToManyConnection', query: (id) => [gql(listComments), {pollInterval: 50, variables: {filter: {postID: {eq: id}}}}]}},
]
},
Pole: {
  createMutation: gql(createPole),
  updateMutation: gql(updatePole),
  deleteMutation: gql(deletePole),
  listQuery: gql(listPoles),
  fields: [
    {name: 'id', gqlType: {type: 'ID!'}},
    {name: 'title', gqlType: {type: 'String!'}},
    {name: 'blogID', gqlType: {type: 'ID!'}},
    {name: 'blog', gqlType: {type: 'Blog', 'connectionType': 'oneToOneConnection', query: (id) => [gql(listBlogs), {pollInterval: 50, variables: {filter: {id: {eq: id}}}}]}},
    {name: 'content', gqlType: {type: 'String!'}},
]
},
Comment: {
  createMutation: gql(createComment),
  updateMutation: gql(updateComment),
  deleteMutation: gql(deleteComment),
  listQuery: gql(listComments),
  fields: [
    {name: 'id', gqlType: {type: 'ID!'}},
    {name: 'postID', gqlType: {type: 'ID!'}},
    {name: 'post', gqlType: {type: 'Post', 'connectionType': 'oneToOneConnection', query: (id) => [gql(listPosts), {pollInterval: 50, variables: {filter: {id: {eq: id}}}}]}},
    {name: 'content', gqlType: {type: 'String!'}},
    {name: 'reply', gqlType: {type: '[Reply]'}},
]
},
Reply: {
  createMutation: gql(createReply),
  updateMutation: gql(updateReply),
  deleteMutation: gql(deleteReply),
  listQuery: gql(listReplys),
  fields: [
    {name: 'id', gqlType: {type: 'ID!'}},
    {name: 'commentID', gqlType: {type: 'ID!'}},
    {name: 'comment', gqlType: {type: 'Comment'}},
    {name: 'content', gqlType: {type: 'String'}},
]
},
}