import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useQuery, useMutation } from '@apollo/client';
import ChildrenMenu from './ChildrenMenu';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function NodeCard(props) {
  console.log("Node card", props)
  const classes = useStyles();
  const nodeName = props.nodeName; 
  const nodeSchema = props.xschema[nodeName];
 
  const [deleteMutate] = useMutation(nodeSchema.deleteMutation);
  const [updateMutate] = useMutation(nodeSchema.updateMutation);

  const [state, setState] = React.useState({
    ...props.nodeContents
  })

  function handleDelete() {
    console.log("Deleting ", state)
    deleteMutate({variables: {input: {id: state.id}}})
  }

  function handleUpdate(fieldName, value) {
    setState(
      {
        ...state, 
        fieldName: value
      }
    )
    const newData = {id: state.id}; // TODO: make this nicer
    newData[fieldName] = value

    console.log("handling update for", state);

    updateMutate(
        {
            variables: {
                input: 
                    newData
            }
        }
    )
  }

  return (
    <Card className={classes.root} onClick={() => props.setActiveNode(nodeName, state.id)}>
      <CardContent>
        <Typography variant="h5" component="h2"> {props.header} </Typography>
        {
          nodeSchema.fields.filter(field => field.component == "edit-field")
            .map((field) => <TextField 
              id="outlined-basic" 
              label={field.name} 
              variant="outlined" 
              defaultValue = {state[field.name]}
              onChange={(event) => handleUpdate(field.name, event.target.value)}
            />)
        }
        {
          nodeSchema.fields.filter(field => field.component == "children-list")
            .map((field) => <ChildrenMenu 
                xschema={props.xschema} 
                parentId={props.nodeContents.id} 
                parentNodeName={props.nodeName}
                nodeName={field.childrenNodeName} 
              />
            )
        }
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDelete}>
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}