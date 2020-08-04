import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NodeCard from './NodeCard';
import { useQuery, useMutation } from '@apollo/client';
import { XSchemaConsumer } from '../context/XSchema.context';

export default function LowerNodeList(props) {
  console.log("Low level ", props)
  const nodeSchema = props.xschema[props.lowLevelNode.name]
  const { loading, error, data } = useQuery(nodeSchema.listQuery, {
      pollInterval: 50,
      variables: {
          filter: {blogID: {eq: props.topLevelNode.id}}
      }

    });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log("data lower", data)

  // <NodeCard header={value.name || value.title} nodeContents={value} nodeName={props.nodeName} xschema={props.xschema}/>

  return (
        <Grid container justify="center" spacing={3}>
            {
                data["list" + nodeSchema.name + "s"].items.map((value) => (
                    <Grid key={value.id} item>
                        <XSchemaConsumer>
                        {
                        ({lowLevelNode, xschema, setActiveNode}) => 
                            <NodeCard setActiveNode={setActiveNode} header={lowLevelNode.name} nodeContents={value} nodeName={props.lowLevelNode.name} xschema={props.xschema}/>
                        }
                        </XSchemaConsumer>
                    </Grid>
                ))
            }
        </Grid>
    )
}