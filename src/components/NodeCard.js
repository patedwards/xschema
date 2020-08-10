import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/client';
import { xschema } from '../graphql/xschema';
import { XSchemaConsumer } from '../context/XSchema.context';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  card: {
    border: 0,
    borderRadius: 3,
    maxWidth: 600,
  },
  regularCardHeader: {
    background: "#fff",
    color: "#fff",
    subheader: {
      color: "#fff",
    },
    height: 112
  },
  activeTopCardHeader: {
    background: theme.palette.primary.main,
    color: "#fff",
    subheader: {
      color: "#fff",
    },
    height: 112
  },
  activeLowCardHeader: {
    background: theme.palette.secondary.main,
    color: "#fff",
    subheader: {
      color: "#fff",
    },
    height: 112
  },
})
);

function ParentLink(props) {

  console.log("Parenting", props)
  function handleParentClick() {
    props.setSelectedNode(props.parentNode.id, props.parentNode.name);
    props.setNodeListQuery(props.field.gql.query(props.parentNode.id))
  }

  return (
    <Button onClick={handleParentClick}>
      Text
    </Button>
  )
}

export default function NodeCard(props) {
  console.log("Node card", props)
  const classes = useStyles();
  const nodeName = props.nodeName; 
  const nodeSchema = xschema[nodeName];

 
  const [deleteMutate] = useMutation(nodeSchema.deleteMutation);
  const [updateMutate] = useMutation(nodeSchema.updateMutation);

  const [state, setState] = React.useState({
    ...props.nodeContents
  })

  function handleDelete() {
    console.log("Deleting ", state)
    deleteMutate({variables: {input: {id: state.id}}})
  }

  function handleHeaderClick() {
    props.setSelectedNode(state.id, props.nodeName)
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
  


  const cardStyle = props.selectedNode.id == state.id ? classes.activeTopCardHeader : classes.regularCardHeader
  
  const activeNode = {}
  activeNode[nodeName] = state.id

  return (
    <Card className={classes.card} >
      <CardHeader className={cardStyle} onClick={handleHeaderClick}>
        {props.header}
      </CardHeader>
      <CardContent>
        <Typography variant="h5" component="h2"> {props.header} </Typography>
        {
          nodeSchema.fields.filter(field => field.gql == "String!")
            .map((field) => <TextField 
              id="outlined-basic" 
              label={field.name} 
              variant="outlined" 
              defaultValue = {state[field.name]}
              onChange={(event) => handleUpdate(field.name, event.target.value)}
            />)
        }
        {
          nodeSchema.fields.filter(field => field.gql.connectionType == "oneToOneConnection")
            .map((field) => 
              <XSchemaConsumer>{
                ({setSelectedNode, parentNode, setNodeListQuery}) => <ParentLink 
                  parentNode={parentNode} 
                  setSelectedNode={setSelectedNode}
                  setNodeListQuery={setNodeListQuery}
                  field={field}
                  id={state.id}
                  />
              }</XSchemaConsumer>)
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