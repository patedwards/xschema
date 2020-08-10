import React from 'react';
import NodeList from './components/NodeList';
import './App.css';
import Grid from '@material-ui/core/Grid';
import { XSchemaConsumer} from './context/XSchema.context';
import NodeTree from './components/NodeTree';

/*

React context is here to stay. Manage all state through it, and you can choose whether to use GQL or apollo or whatever.

The purpose of using xschema is to provide a clear mapping from the GQL schema, to the presentational
react components.

The default behaviour is for the component props to be derived from a mixture of context and the data
in the corresponding GQL node.

For now, decorators in the GQL schema will indicate whether that data should be in the local state or not.

xschema apps are good for breadboarding and make the following assumptions:
- all components can be contained in another component, either singularly or in a collection
- all collection of components can be represented as lists
- new components can be created from within their collections
- a component can be contained within multiple types of components, and so nodes can have multiple types of parents
- component can contain logic to move to a higher level component, but the app may also have some view of the heirarchy 
  visible, and so xschema affords both for all components


The component doesn't need to know where it gets it's props from. It's parent determines that.

E.g, below, the Post component uses the bacon and updateBacon props, but only 

function Blog(props) {
  return (
    props.posts.map(
      (post) => {
        <consumer>
          {
            (apples, bacon, updateBacon) => <Post ...post apples bacon updateBacon/>
          }
        </consumer>
      }
    )
    
  )
}

Blog
  - id | ID!
  - name | String!           Post
  - posts--------------------- blogID! | ID!
                             - id | ID!
                             - title | String!                Comment
                             - comments -------------------- postID | ID!


Types of things:
- String --> Editable field
- ID --> text only
- Connection - link to other node
- List of Strings --> drop down menu with editable fields AND add button
- List of connections --> drop down menu with link to other nodes AND add button
*/


function App() {
  return (
    <Grid container direction="row" spacing={3} justify="flex-start" >
      <Grid item  style={{width:`20%`}}>
        <XSchemaConsumer>  
        {({ selectedNode }) => 
          <NodeTree selectedNode={selectedNode}/>
        }
        </XSchemaConsumer>
      </Grid>
      <Grid item  style={{width:`80%`}}>
        <XSchemaConsumer>  
          {({ nodeListQuery, selectedNode }) => 
            nodeListQuery != null ?
              <NodeList selectedNode={selectedNode} nodeListQuery={nodeListQuery}  /> :
              null
          }
          </XSchemaConsumer>
      
      </Grid>
    </Grid>
  );
}

export default App;
