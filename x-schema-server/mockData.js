const blogs = [
    {
      id: 'blog-001',
      name: 'Blog 1',
      __typename: "Blog"
    },
    {
      id: 'blog-002',
      name: 'Blog-2',
      __typename: "Blog"
    },
  ];

const posts = [
  {
    id: 'post-001',
    title: 'Title 1',
    blogID: 'blog-001',
    __typename: "Post"
  },
  {
    id: 'post-002',
    title: 'Title 2',
    blogID: 'blog-002',
    __typename: "Post"
  },
];

const poles = [
  {
    id: 'pole-001',
    title: 'Title 1',
    blogID: 'blog-001',
    __typename: "Pole"
  },
  {
    id: 'pole-002',
    title: 'Title 2',
    blogID: 'blog-001',
    __typename: "Pole"
  },
  {
    id: 'pole-003',
    title: 'Title 3',
    blogID: 'blog-002',
    __typename: "Pole"
  },
];

const comments = []
const replys = []

module.exports = { blogs, posts, poles, comments, replys }