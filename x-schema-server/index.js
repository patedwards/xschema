const { ApolloServer, gql } = require('apollo-server');
const { blogs, posts, poles, comments, replys } = require('./mockData')
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

    type Blog {
    id: ID!
    name: String!
    posts: [Post]
    poles: [Pole] 
    }

    type Post {
    id: ID!
    title: String!
    blogID: ID!
    blog: Blog 
    content: String!
    comments: [Comment] 
    }

    type Pole {
    id: ID!
    title: String!
    blogID: ID!
    blog: Blog
    content: String!
    }

    type Comment {
    id: ID!
    postID: ID!
    post: Post 
    content: String!
    replys: [Reply]
    }

    type Reply {
    id: ID!
    commentID: ID!
    comment: Comment 
    content: String
    nextToken: String
    }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    listBlogs: [Blog]
    listPosts(blogID: ID): [Post]
    listPoles(blogID: ID): [Pole]
    listComments(postID: ID): [Comment]
    listReplys(commentID: ID): [Reply]
    getBlog: [Blog]
    gistPost(blogID: ID): [Post]
    gistPole(blogID: ID): [Pole]
    gistComment(postID: ID): [Comment]
    gistReply(commentID: ID): [Reply]
  }

  type Mutation {
    createBlog(id: ID!, name: String): Blog
    createPost(id: ID!, title: String, content: String): Post
    createPole(id: ID!, title: String, content: String): Pole
    createComment(id: ID!, content: String): Comment
    createReply(id: ID!, content: String): Reply
    updateBlog(id: ID!, name: String): Blog
    updatePost(id: ID!, title: String, content: String): Post
    updatePole(id: ID!, title: String, content: String): Pole
    updateComment(id: ID!, content: String): Comment
    updateReply(id: ID!, content: String): Reply
    deleteBlog(id: ID!, name: String): Blog
    deletePost(id: ID!, title: String, content: String): Post
    deletePole(id: ID!, title: String, content: String): Pole
    deleteComment(id: ID!, content: String): Comment
    deleteReply(id: ID!, content: String): Reply
  }
`;




// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      listBlogs() {
        return blogs
      },
      listPosts(parent, args, context, info) {
        return posts.filter(post => post.blogID == args.blogID)
      },
      listPoles(parent, args, context, info) {
        return poles.filter(pole => pole.blogID == args.blogID)
      }
    },
    Mutation: {
      createBlog(parent, args, context, info) {
        console.log(args)
        blogs.push(args)
        return blogs[0]
      },
      createPost(parent, args, context, info) {
        posts.push(args)
        return posts[-1]
      },
      createPole(parent, args, context, info) {
        poles.push(args)
        return poles[-1]
      },
      createComment(parent, args, context, info) {
        comments.push(args)
        return comments[-1]
      },
      createReply(parent, args, context, info) {
        replys.push(args)
        return replys[-1]
      },
      updateBlog(parent, args, context, info) {
        const indexToUpdate = blogs.findIndex(obj => obj.id == args.id)
        blogs[indexToUpdate] = args
        return blogs[indexToUpdate]
      },
      updatePost(parent, args, context, info) {
        const indexToUpdate = posts.findIndex(obj => obj.id == args.id)
        console.log("Updating post at", indexToUpdate, args)
        posts[indexToUpdate] = {...posts[indexToUpdate], ...args}
        console.log("...", posts)
        return posts[indexToUpdate]
      },
      updatePole(parent, args, context, info) {
        const indexToUpdate = blogs.findIndex(obj => obj.id == args.id)
        poles[indexToUpdate] = args
        return poles[indexToUpdate]
      },
      updateComment(parent, args, context, info) {
        const indexToUpdate = blogs.findIndex(obj => obj.id == args.id)
        comments[indexToUpdate] = args
        return comments[indexToUpdate]
      },
      updateReply(parent, args, context, info) {
        const indexToUpdate = blogs.findIndex(obj => obj.id == args.id)
        replys[indexToUpdate] = args
        return replys[indexToUpdate]
      },
      deleteBlog(parent, args, context, info) {
        const indexToUpdate = blogs.findIndex(obj => obj.id == args.id)
        blogs[indexToUpdate] = args
        return blogs.pop(indexToUpdate)
      },
      deletePost(parent, args, context, info) {
        const indexToUpdate = posts.findIndex(obj => obj.id == args.id)
        console.log("Updating post at", indexToUpdate, args)
        posts[indexToUpdate] = {...posts[indexToUpdate], ...args}
        console.log("...", posts)
        return posts.pop(indexToUpdate)
      },
      updatePole(parent, args, context, info) {
        const indexToUpdate = blogs.findIndex(obj => obj.id == args.id)
        poles[indexToUpdate] = args
        return poles[indexToUpdate]
      },
      updateComment(parent, args, context, info) {
        const indexToUpdate = blogs.findIndex(obj => obj.id == args.id)
        comments[indexToUpdate] = args
        return comments[indexToUpdate]
      },
      updateReply(parent, args, context, info) {
        const indexToUpdate = blogs.findIndex(obj => obj.id == args.id)
        replys[indexToUpdate] = args
        return replys[indexToUpdate]
      }
    }
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});