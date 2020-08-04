import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export default function FAB(props) {
  return (
      <Fab color="primary" aria-label="add" onClick={props.onClick}>
        <AddIcon />
      </Fab>
  );
}