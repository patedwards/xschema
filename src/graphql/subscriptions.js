/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog {
    onCreateBlog {
      id
      name
      posts {
        items {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      poles {
        items {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
      id
      name
      posts {
        items {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      poles {
        items {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
      id
      name
      posts {
        items {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      poles {
        items {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        poles {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        poles {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        poles {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePole = /* GraphQL */ `
  subscription OnCreatePole {
    onCreatePole {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        poles {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePole = /* GraphQL */ `
  subscription OnUpdatePole {
    onUpdatePole {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        poles {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePole = /* GraphQL */ `
  subscription OnDeletePole {
    onDeletePole {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        poles {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      postID
      post {
        id
        title
        blogID
        blog {
          id
          name
          createdAt
          updatedAt
        }
        content
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      reply {
        id
        commentID
        comment {
          id
          postID
          content
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      postID
      post {
        id
        title
        blogID
        blog {
          id
          name
          createdAt
          updatedAt
        }
        content
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      reply {
        id
        commentID
        comment {
          id
          postID
          content
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      postID
      post {
        id
        title
        blogID
        blog {
          id
          name
          createdAt
          updatedAt
        }
        content
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      reply {
        id
        commentID
        comment {
          id
          postID
          content
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply {
    onCreateReply {
      id
      commentID
      comment {
        id
        postID
        post {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        content
        reply {
          id
          commentID
          content
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply {
    onUpdateReply {
      id
      commentID
      comment {
        id
        postID
        post {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        content
        reply {
          id
          commentID
          content
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply {
    onDeleteReply {
      id
      commentID
      comment {
        id
        postID
        post {
          id
          title
          blogID
          content
          createdAt
          updatedAt
        }
        content
        reply {
          id
          commentID
          content
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
