//import {getPole, getPost, getComment, getReply, listBlogs, listPosts, listPoles, listComments, listReplys, } from '../graphql/queries';

//import {updateBlog, createBlog, deleteBlog, updatePost, createPost, deletePost, updatePole, createPole, deletePole, updateComment, createComment, deleteComment, updateReply, createReply, deleteReply, } from '../graphql/mutations';
import { gql } from 'apollo-boost'


const updateBlog = `
  mutation UpdateBlog($id: ID!, $name: String!) {
    updateBlog(id: $id, name: $name) {
      id
      name
    }
  }
`;

const createBlog = `
  mutation CreateBlog($id: ID!, $name: String!) {
    createBlog(id: $id, name: $name) {
      id
      name
    }
  }
`;

const deleteBlog = `
  mutation DeleteBlog($id: ID!, $name: String!) {
    deleteBlog(id: $id, name: $name) {
      id
      name
    }
  }
`;


const updatePost = `
  mutation UpdatePost($id: ID!, $title: String!, $content: String) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const createPost = `
  mutation CreatePost($id: ID!, $title: String!, $content: String, $blogID: ID!) {
    createPost(id: $id, title: $title, content: $content, blogID: $blogID) {
      id
      title
      content
      blogID
    }
  }
`;


const deletePost = `
  mutation DeletePost($id: ID!, $title: String!, $content: String, $blogID: ID!) {
    deletePost(id: $id, title: $title, content: $content, blogID: $blogID) {
      id
      title
      content
      blogID
    }
  }
`;


const updatePole = `
  mutation UpdatePole($id: ID!, $title: String!, $content: String) {
    updatePole(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const createPole = `
  mutation CreatePole($id: ID!, $title: String!, $content: String, $blogID: ID!) {
    createPole(id: $id, title: $title, content: $content, blogID: $blogID) {
      id
      title
      content
      blogID
    }
  }
`;

const deletePole = `
  mutation DeletePole($id: ID!, $title: String!, $content: String, $blogID: ID!) {
    createPole2(id: $id, title: $title, content: $content, blogID: $blogID) {
      id
      title
      content
      blogID
    }
  }
`;

const updateComment = `
  mutation UpdateComment($id: ID!, $content: String) {
    updateComment(id: $id, content: $content) {
      id
      content
    }
  }
`;

const createComment = `
  mutation CreateComment($id: ID!, $content: String, $postID: ID!) {
    createComment(id: $id, content: $content, postID: $postID) {
      id
      content
      postID
    }
  }
`;

const deleteComment = `
  mutation CreateComment2($id: ID!, $content: String, $postID: ID!) {
    createComment2(id: $id, content: $content, postID: $postID) {
      id
      content
      postID
    }
  }
`;

const updateReply = `
  mutation UpdateReply($id: ID!, $content: String) {
    updateReply(id: $id, content: $content) {
      id
      content
    }
  }
`;

const createReply = `
  mutation CreateReply($id: ID!, $content: String, $commentID: ID!) {
    createReply(id: $id, content: $content, commentID: $commentID) {
      id
      content
      commentID
    }
  }
`;

const deleteReply = `
  mutation DeleteReply($id: ID!, $content: String, $commentID: ID!) {
    deleteReply(id: $id, content: $content, commentID: $commentID) {
      id
      content
      commentID
    }
  }
`;

const listBlogs = `
query ListBlogs {
  listBlogs {
      id
      name
  }
}
`;

const getBlog = `
query GetBlog {
  getBlog {
      id
      name
  }
}
`;

const listPosts = `
query ListPosts($blogID: ID!) {
  listPosts(blogID: $blogID) {
      id
      title
      content
  }
}
`;

const getPost = `
query GetPost($blogID: ID!) {
  getPost(blogID: $blogID) {
      id
      title
      content
  }
}
`;

const listPoles = `
query ListPoles($blogID: ID!) {
  listPoles(blogID: $blogID) {
      id
      title
      content
  }
}
`;

const getPole = `
query GetPole($blogID: ID!) {
  getPole(blogID: $blogID) {
      id
      title
      content
  }
}
`;

const listComments = `
query ListComments($postID: ID!) {
  listComments(postID: $postID) {
      id
      content
  }
}
`;

const getComment = `
query GetComment($postID: ID!) {
  getComment(postID: $postID) {
      id
      content
  }
}
`;

const listReplys = `
query ListReplys($replyID: ID!) {
  listReplys(replyID: $replyID) {
      id
      content
  }
}
`;

const getReply = `
query GetReply($replyID: ID!) {
  getReply(replyID: $replyID) {
      id
      content
  }
}
`;


export const xschema = { Blog: {
  createMutation: gql(createBlog),
  updateMutation: gql(updateBlog),
  deleteMutation: gql(deleteBlog),
  listQuery: gql(listBlogs),
  fields: [
    {name: 'id', gqlType: {type: "ID!"}},
    {name: 'name', gqlType: {type: "String!"}},
    //{name: 'posts', gqlType: {type: "['Post']" ,connectionType: 'oneToManyConnection', query: (id) => [gql(listPosts), {pollInterval: 50, variables: {filter: {blogID: {eq: id}}}}]}},
    {name: 'posts', gqlType: {type: "['Post']" ,connectionType: 'oneToManyConnection', query: (id) => [gql(listPosts), {variables: {blogID: id}}]}},
    //{name: 'poles', gqlType: {type: "['Pole']" ,connectionType: 'oneToManyConnection', query: (id) => [gql(listPoles), {pollInterval: 50, variables: {filter: {blogID: {eq: id}}}}]}},
    {name: 'poles', gqlType: {type: "['Poles']" ,connectionType: 'oneToManyConnection', query: (id) => [gql(listPoles), {variables: {blogID: id}}]}},
    ]
  },
Post: {
  createMutation: gql(createPost),
  updateMutation: gql(updatePost),
  deleteMutation: gql(deletePost),
  listQuery: gql(listPosts),
  fields: [
    {name: 'id', gqlType: {type: "ID!"}},
    {name: 'title', gqlType: {type: "String!"}},
    {name: 'blogID', gqlType: {type: "ID!"}},
    {name: 'blog', gqlType: {type: "Blog" ,connectionType: 'oneToOneConnection', query: (id) => [gql(getPole), {pollInterval: 50, variables: {id:  {eq: id}}}]}},
    {name: 'content', gqlType: {type: "String!"}},
    {name: 'comments', gqlType: {type: "['Comment']" ,connectionType: 'oneToManyConnection', query: (id) => [gql(listComments), {pollInterval: 50, variables: {filter: {postID: {eq: id}}}}]}},
    ]
  },
Pole: {
  createMutation: gql(createPole),
  updateMutation: gql(updatePole),
  deleteMutation: gql(deletePole),
  listQuery: gql(listPoles),
  fields: [
    {name: 'id', gqlType: {type: "ID!"}},
    {name: 'title', gqlType: {type: "String!"}},
    {name: 'blogID', gqlType: {type: "ID!"}},
    {name: 'blog', gqlType: {type: "Blog" ,connectionType: 'oneToOneConnection', query: (id) => [gql(getComment), {pollInterval: 50, variables: {id:  {eq: id}}}]}},
    {name: 'content', gqlType: {type: "String!"}},
    ]
  },
Comment: {
  createMutation: gql(createComment),
  updateMutation: gql(updateComment),
  deleteMutation: gql(deleteComment),
  listQuery: gql(listComments),
  fields: [
    {name: 'id', gqlType: {type: "ID!"}},
    {name: 'postID', gqlType: {type: "ID!"}},
    {name: 'post', gqlType: {type: "Post" ,connectionType: 'oneToOneConnection', query: (id) => [gql(getComment), {pollInterval: 50, variables: {id:  {eq: id}}}]}},
    {name: 'content', gqlType: {type: "String!"}},
    {name: 'replys', gqlType: {type: "['Reply']" ,connectionType: 'oneToManyConnection', query: (id) => [gql(listReplys), {pollInterval: 50, variables: {filter: {commentID: {eq: id}}}}]}},
    ]
  },
Reply: {
  createMutation: gql(createReply),
  updateMutation: gql(updateReply),
  deleteMutation: gql(deleteReply),
  listQuery: gql(listReplys),
  fields: [
    {name: 'id', gqlType: {type: "ID!"}},
    {name: 'commentID', gqlType: {type: "ID!"}},
    {name: 'comment', gqlType: {type: "Comment" ,connectionType: 'oneToOneConnection', query: (id) => [gql(getReply), {pollInterval: 50, variables: {id:  {eq: id}}}]}},
    {name: 'content', gqlType: {type: "String"}},
    ]
  },

}