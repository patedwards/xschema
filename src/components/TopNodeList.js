import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NodeCard from './NodeCard';
import { useQuery, useMutation } from '@apollo/client';
import { initialiseNode} from '../utils/nodeCreation';
import { XSchemaConsumer } from '../context/XSchema.context';
import { CreateNode } from '../utils/nodeCreation';


export default function TopNodeList(props) {
  console.log("Top level ", props)
  const nodeSchema = xschema[props.topLevelNode.name]
  console.log("Top level node schema ", nodeSchema)
  const { loading, error, data } = useQuery(nodeSchema.listQuery, {pollInterval: 50});

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log("data", data)

  // <NodeCard header={value.name || value.title} nodeContents={value} nodeName={props.nodeName}  />

  return (
        <Grid container justify="center" spacing={3}>
            {
                data["list" + props.topLevelNode.name + "s"].items.map((value) => (
                    <Grid key={value.id} item>
                        <XSchemaConsumer>
                            {
                                ({setTopLevelNode, topLevelNode, lowLevelNode, activeNodes}) => 
                                    <NodeCard 
                                    level={"top"}
                                    setActiveNode={setTopLevelNode} 
                                    setTopLevelNode={setTopLevelNode}
                                    header={props.topLevelNode.name} 
                                    nodeContents={value} 
                                    nodeName={props.topLevelNode.name}
                                    topLevelNode={topLevelNode}
                                    lowLevelNode={lowLevelNode}
                                    activeNodes={activeNodes}
                                     />
                            }
                        </XSchemaConsumer>
                    </Grid>
                ))
            }
            <XSchemaConsumer>
                {
                ({topLevelNode}) => 
                    <CreateNode topLevelNode={topLevelNode} nodeName={props.topLevelNode.name}  />
                }
            </XSchemaConsumer>
        </Grid>
    )
}