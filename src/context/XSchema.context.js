import React, { Component } from 'react';
import { listBlogs, listPosts } from '../graphql/queries';
import { updateBlog, createBlog, deleteBlog, createPost, updatePost, deletePost } from '../graphql/mutations'

import { gql } from 'apollo-boost'

export const XSchemaContext = React.createContext();

export class XSchemaProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
        topLevelNode: {
            name: "Blog",
            id: null
        },

        lowLevelNode: {
            name: "Post",
            parentLinkID: "blogID",
        },
        xschema: {
            "Blog": {
              createMutation: gql(createBlog), // TODO
              updateMutation: gql(updateBlog), // TODO
              listQuery: gql(listBlogs), // TODO
              deleteMutation: gql(deleteBlog), // TODO
              name: "Blog", // TODO
              "fields": [
                {
                  "name": "id",
                  "type": "id",
                  "component": "read-only" // TODO
                },
                {
                  "name": "name",
                  "component": "edit-field" // TODO
                },
                {
                  "name": "posts",
                  "childrenNodeName": "Post",
                  "component": "children-list", // TODO
                  "linkingField": "id" // TODO
                  // posts: [Post] @connection(keyName: "byBlog", fields: ["id"])
          
                }
              ]
            },
            "Post": {
              createMutation: gql(createPost), // TODO
              updateMutation: gql(updatePost), // TODO
              listQuery: gql(listPosts), // TODO
              deleteMutation: gql(deletePost), // TODO
              name: "Post", // TODO
              "fields": [
                {
                  "name": "id",
                  "type": "id",
                  "component": "read-only" // TODO
                },
                {
                  "name": "title",
                  "component": "edit-field"
                },
                {
                  "name": "blogID",
                  "component": "edit-field"
                },
                {
                  "name": "blog",
                  "component": "parent-link", // TODO
                  "parent": "Blog",
                  "linkingField": "blogID" // TODO
                },
                {
                  "name": "comments",
                  "childrenNodeName": "Comment",
                  "component": "children-list-not-yet" // TODO
                }
              ]
            }
        }
    }
  }

  setActiveNode = (nodeName, id) => {
    this.setState({
        topLevelNode: {
            name: nodeName,
            id: id
        }
    })
  }

  render() {
    const { children } = this.props;
    console.log("xschema provider", children)

    return (
      <XSchemaContext.Provider
        value={{
            topLevelNode: this.state.topLevelNode,
            lowLevelNode: this.state.lowLevelNode,
            xschema: this.state.xschema,
            setActiveNode: this.setActiveNode
        }}
      >      
        {children}
      </XSchemaContext.Provider>
    );
  }
}

export const XSchemaConsumer = XSchemaContext.Consumer;