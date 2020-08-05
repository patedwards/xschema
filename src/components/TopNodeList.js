import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NodeCard from './NodeCard';
import FAB from '../widgets/FAB';
import { useQuery, useMutation } from '@apollo/client';
import { initialiseNode} from '../utils/nodeCreation';
import { XSchemaConsumer } from '../context/XSchema.context';

function CreateNode(props) {
    console.log("Create node", props)
    const nodeSchema = props.xschema[props.nodeName]
    const [mutate] = useMutation(nodeSchema.createMutation);

    function handleClick() {
        const input = initialiseNode(props.xschema)
        if (nodeSchema.name == "Post") {
            input.blogID = "7eb43e63-8bd1-4e5d-8a88-dc1c084714d0"
        }
        console.log("Initialising", input)
        mutate(
            {
                variables: {
                    input
                }
            }     
        )
    }

    return (
        <FAB onClick={handleClick}/>
    )
}

export default function TopNodeList(props) {
  console.log("Top level ", props)
  const nodeSchema = props.xschema[props.topLevelNode.name]
  console.log("Top level node schema ", nodeSchema)
  const { loading, error, data } = useQuery(nodeSchema.listQuery, {pollInterval: 50});

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log("data", data)

  // <NodeCard header={value.name || value.title} nodeContents={value} nodeName={props.nodeName} xschema={props.xschema}/>

  return (
        <Grid container justify="center" spacing={3}>
            {
                data["list" + nodeSchema.name + "s"].items.map((value) => (
                    <Grid key={value.id} item>
                        <XSchemaConsumer>
                            {
                                ({setActiveNode}) => 
                                    <NodeCard setActiveNode={setActiveNode} header={props.topLevelNode.name} nodeContents={value} nodeName={props.topLevelNode.name} xschema={props.xschema}/>
                            }
                        </XSchemaConsumer>
                    </Grid>
                ))
            }
            <CreateNode nodeName={props.topLevelNode.name} xschema={props.xschema}/>
        </Grid>
    )
}