import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NodeCard from './NodeCard';
import { useQuery, useMutation } from '@apollo/client';
import { XSchemaConsumer } from '../context/XSchema.context';
import { CreateNode } from '../utils/nodeCreation';
import { xschema } from '../graphql/xschema';




export default function NodeList(props) {
  console.log("NodeList", props)
  const { loading, error, data } = useQuery(...props.nodeListQuery);
  console.log("nodelist", error)
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  

  return (
        <Grid container justify="center" spacing={3}>
            <XSchemaConsumer>
                {
                ({parentNode, selectedNode}) => 
                    <CreateNode parentNode={parentNode} selectedNode={selectedNode}  />
                }
            </XSchemaConsumer>
            {Object.values(data).map(foundValue =>
                foundValue.items.map((value) => (
                    <Grid key={value.id} item>
                        <XSchemaConsumer>{
                            ({selectedNode, setSelectedNode}) =>
                            <NodeCard 
                                header={"placeholder"} 
                                nodeContents={value} 
                                nodeName={value.__typename} 
                                 
                                selectedNode={selectedNode}
                                setSelectedNode={setSelectedNode}
                            />
                        }
                        </XSchemaConsumer>
                    </Grid>
                ))
            )}
        </Grid>
    )
}

/*
 <XSchemaConsumer>
                {
                ({parentNode}) => 
                    <CreateNode topLevelNode={topLevelNode} nodeName={props.lowLevelNode.name}  />
                }
            </XSchemaConsumer>
*/