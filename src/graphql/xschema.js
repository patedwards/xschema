import { listBlogs, listPosts, listComments, listReplys, listPoles } from '../graphql/queries';
import { updateBlog, createBlog, deleteBlog, createPost, updatePost, deletePost, createPole, updatePole, deletePole, createComment, updateComment, deleteComment, createReply, updateReply, deleteReply } from '../graphql/mutations'
import { gql } from 'apollo-boost'


export const xschema = {
    "Blog": {
      createMutation: gql(createBlog), // TODO
      updateMutation: gql(updateBlog), // TODO
      listQuery: gql(listBlogs), // TODO
      deleteMutation: gql(deleteBlog), // TODO
      "reactComponent": "NodeCard",
      "fields": [
        {   "name": "id",
            "gql": "ID!",
            "reactComponent": "MakeUUID"
        },
        {   "name": "name",
            "gql": "String!",
            "reactComponent": "TextField"
        },
        {   "name": "posts",
            "gql": {
                "type": "[Post]",
                "connectionType": "oneToManyConnection",
                "keyName": "byBlog",
                query: (id) => [ // 
                  gql(listPosts), 
                  {
                    pollInterval: 50,
                    variables: {
                        filter: {blogID: {eq: id}}
                    }
                  }
                ]
            },
            "reactComponent": "NodeList"
        },
        {   "name": "poles",
            "gql": {
                "type": "[Pole]",
                "connectionType": "oneToManyConnection",
                "keyName": "byBlog",
                query: (id) => [
                  gql(listPoles), 
                  {
                    pollInterval: 50,
                    variables: {
                        filter: {blogID: {eq: id}}
                    }
                  }
                ]
            },
            "reactComponent": "NodeList"
        }
      ]
  },
  "Post": {
      createMutation: gql(createPost), // TODO
      updateMutation: gql(updatePost), // TODO
      listQuery: gql(listPosts), // TODO
      deleteMutation: gql(deletePost), // TODO
      "modelParameters" : {"name": "byBlog", "fields": ["blogID"]},
      "reactComponent": "NodeCard",
      "fields": [
        {
            "name": "id",
            "gql": "ID!",
            "reactComponent": "MakeUUID"
        },
        {   "name": "title",
            "gql": "String!",
            "reactComponent": "TextField"
        },
        {   "name": "blogID",
            "gql": "ID!",
            "reactComponent": "hidden"
        },
        {   "name": "blog",
            "gql": {
                "type": "Blog",
                "connectionType": "oneToOneConnection",
                query: (id) => [
                    gql(listBlogs), 
                    {
                      pollInterval: 50,
                      variables: {
                          filter: {id: {eq: id}}
                      }
                    }
                  ]
            },
            "reactComponent": "ParentLink"
        },
        {   "name": "content",
            "gql": "String!",
            "reactComponent": "TextField"
        },
        {   "name": "comments",
            "gql": {
                "type": "[Comment]",
                "connectionType": "oneToManyConnection",
                "keyName": "byPost",
                query: (id) => [
                  gql(listComments), 
                  {
                    pollInterval: 50,
                    variables: {
                        filter: {postID: {eq: id}}
                    }
                  }
                ]
            },
            "reactComponent": "NodeList"
        }
      ]
  },
  "Pole": {
    createMutation: gql(createPole), // TODO
    updateMutation: gql(updatePole), // TODO
    listQuery: gql(listPoles), // TODO
    deleteMutation: gql(deletePole), // TODO
    "modelParameters" : {"name": "byBlog", "fields": ["blogID"]},
    "reactComponent": "NodeCard",
    "fields": [
        {"name": "id",
            "gql": "ID!",
            "reactComponent": "MakeUUID"
        },
        {"name": "title",
            "gql": "String!",
            "reactComponent": "TextField"
        },
        {"name": "blogID",
            "gql": "ID!",
            "reactComponent": "hidden"
        },
        {"name": "blog",
            "gql": {
                "type": "Blog",
                "connectionType": "oneToOneConnection",
                query: (id) => [
                    gql(listBlogs), 
                    {
                      pollInterval: 50,
                      variables: {
                          filter: {id: {eq: id}}
                      }
                    }
                  ]
            },
            "reactComponent": "ParentLink"
        },
        {"name": "content",
            "gql": "String!",
            "reactComponent": "TextField"
        }
      ]
},
  "Comment": {
      createMutation: gql(createComment), // TODO
      updateMutation: gql(updateComment), // TODO
      listQuery: gql(listComments), // TODO
      deleteMutation: gql(deleteComment), // TODO
      "reactComponent": "NodeCard",
      "modelParameters" : {"name": "byPost", "fields": ["postID", "content"]},
      "fields": [
        {   "name": "id",
            "gql": "ID!",
            "reactComponent": "MakeUUID"
        },
        {   "name": "postID",
            "gql": "ID!",
            "reactComponent": "hidden"
        },
        {   "name": "post",
            "gql": {
                "type": "Post",
                "connectionType": "oneToOneConnection",
                query: (id) => [
                    gql(listPosts), 
                    {
                      pollInterval: 50,
                      variables: {
                          filter: {id: {eq: id}}
                      }
                    }
                  ]
            },
            "reactComponent": "ParentLink"
        },
        {   "name": "content",
            "gql": "String!",
            "reactComponent": "TextField"
        },
      ]
  },
  "Reply": {
      createMutation: gql(createReply), // TODO
      updateMutation: gql(updateReply), // TODO
      listQuery: gql(listReplys), // TODO
      deleteMutation: gql(deleteReply), // TODO
      "reactComponent": "NodeCard",
      "modelParameters" : {"name": "byComment", "fields": ["commentID", "content"]},
      "fields": [
        {   "name": "id",
            "gql": "ID!",
            "reactComponent": "MakeUUID"
        },
        {   "name": "commentID",
            "gql": "ID!",
            "reactComponent": "hidden"
        },
        {   "name": "comment",
            "gql": {
                "type": "Comment",
                "connectionType": "oneToOneConnection",
                query: (id) => [
                    gql(listPosts), 
                    {
                      pollInterval: 50,
                      variables: {
                          filter: {id: {eq: id}}
                      }
                    }
                  ]
            },
            "reactComponent": "ParentLink"
        },
        {   "name": "content",
            "gql": "String!",
            "reactComponent": "TextField"
        }
      ]
    }
  }
