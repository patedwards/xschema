import React, { Component } from 'react';

export const XSchemaContext = React.createContext();

export class XSchemaProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeListQuery: null,
      selectedNode: {name: null, id: null},
      parentNode: {name: null, id: null},
    }
  }

  setNodeListQuery = (query) => {
    this.setState({
      nodeListQuery: query
    })
  }

  setSelectedNode = (id, name) => {
    console.log("Yes, Setting selected...", id);
    this.setState({
      selectedNode: {id: id, name: name}
    })
  }

  setParentNode = (id, name) => {
    console.log("Parent!", id, name)
    this.setState({
      parentNode: {id: id, name: name}
    })
  }
  


  render() {
    const { children } = this.props;
    console.log("xschema provider", children)

    return (
      <XSchemaContext.Provider
        value={{
            xschema: this.state.xschema,
            nodeListQuery: this.state.nodeListQuery,
            setNodeListQuery: this.setNodeListQuery,
            setSelectedNode: this.setSelectedNode,
            selectedNode: this.state.selectedNode,
            setParentNode: this.setParentNode,
            parentNode: this.state.parentNode
        }}
      >      
        {children}
      </XSchemaContext.Provider>
    );
  }
}

export const XSchemaConsumer = XSchemaContext.Consumer;