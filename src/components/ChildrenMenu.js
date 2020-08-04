import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, useQuery } from '@apollo/client';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { gql } from 'apollo-boost'

import { initialiseNode} from '../utils/nodeCreation';


export default function ChildrenMenu(props) {
  console.log("Children menu", props)
  const nodeName = props.nodeName
  const nodeSchema = props.xschema[nodeName]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [createChileMutate] = useMutation(nodeSchema.createMutation)

  const linkingField = props.
                         xschema[props.nodeName].
                         fields.
                         filter(field => field.parent == props.parentNodeName)[0].
                         linkingField

  console.log("linkingField", linkingField)

  const filter = {}
  filter[linkingField] = {eq: props.parentId} 

  const { loading, error, data }  = useQuery(nodeSchema.listQuery, {
    variables: 
      {
        filter: filter
      }
    })

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log("data", data) // TODO move all of this into the menu item component

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function createChildNode() {
    const input = initialiseNode(nodeSchema)
    if (nodeName == "Post") {
        input.blogID = props.parentId
    }
    console.log("Initialising", input)
    createChileMutate(
        {
            variables: {
                input
            },
        }     
    )
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {"Choose a " + nodeName}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={createChildNode}>NEW</MenuItem>
        {data.listPosts.items.map(node => <MenuItem >{node.title}</MenuItem>)}
      </Menu>
    </div>
  )
}
