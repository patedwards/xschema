import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { XSchemaConsumer} from '../context/XSchema.context';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import { xschema } from '../graphql/xschema';


const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

/*
function GenericNode(props) {

    // start-auto-boiler-plate
    const { loading, error, data } = useQuery(...props.nodeListQuery)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;    
    // end-auto-boiler-plate

    return data
}
*/

function LabelNode(props) {
    console.log("Label node", props)
    /* start-auto-boiler-plate*/
    const { loading, error, data } = useQuery(...props.nodeListQuery)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`; 
    /* end-auto-boiler-plate*/  

    const instances = data["list" + props.nodeName + "s"].items

    const handleSelect = () => {
        console.log("TREE A QUERY", props.nodeListQuery)
        props.setNodeListQuery(props.nodeListQuery)
        props.setSelectedNode(null, props.nodeName)
        props.setParentNode(props.parentNode.id, props.parentNode.name)
        
    }

    return (
     <TreeItem nodeId={props.nodeName} label={props.nodeName} onClick={handleSelect}>
         {instances.map(instance => 
            <XSchemaConsumer>{({ setSelectedNode, setNodeListQuery }) => 
                <InstanceNode 
                setNodeListQuery={setNodeListQuery}
                setSelectedNode={setSelectedNode} 
                  {...instance}
                queryForSiblings={props.nodeListQuery}
                />
            }
            </XSchemaConsumer>
        )}
     </TreeItem>
    )
}

function InstanceNode(props) {
    const descendantNodeFields = xschema[props.__typename].fields.filter(field => field.gql.connectionType == "oneToManyConnection")

    const handleSelect = () => {
        console.log("Setting selected...", props)
        props.setSelectedNode(props.id, props.__typename)
        props.setNodeListQuery(props.queryForSiblings)
    }

    return (
     <TreeItem nodeId={props.id} label={props.id} onClick={handleSelect}>
         {
            descendantNodeFields.map(field => 
            <XSchemaConsumer>
                {({setNodeListQuery, setSelectedNode, setParentNode}) =>  
                    <LabelNode 
                      
                    nodeName={_.upperFirst(_.camelCase(field.name)).slice(0, -1)}
                    nodeListQuery={field.gql.query(props.id)}
                    setNodeListQuery={setNodeListQuery}
                    setSelectedNode={setSelectedNode}
                    setParentNode={setParentNode} 
                    parentNode={{id: props.id, name: props.__typename}}
                    />}
            </XSchemaConsumer>
            )
         }
     </TreeItem>
    )
}


export default function NodeTree(props) {
  console.log("Node tree", props)
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    const toExpand = nodeIds
    console.log("TREE toggle", toExpand)
    setExpanded(toExpand);
  };

  const rootNode = "Blog"

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={[props.selectedNode.id]}
      onNodeToggle={handleToggle}
    >
      <XSchemaConsumer>{({ setNodeListQuery, setSelectedNode, setParentNode }) => 
        <LabelNode 
              
            nodeName={rootNode} 
            setNodeListQuery={setNodeListQuery}
            setSelectedNode={setSelectedNode}
            setParentNode={setParentNode}
            nodeListQuery={[xschema["Blog"].listQuery, {pollInterval: 50, variables: {}}]}
            parentNode={{id: null, name: null}}
        />
        }
    </XSchemaConsumer>
      
   </TreeView>
  );
}