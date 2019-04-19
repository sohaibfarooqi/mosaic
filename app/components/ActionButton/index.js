import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

/*
Action button component. Used inside table for editing.
*/
class ActionButton extends React.Component{

  render(){
    const { title, kind, onExecute } = this.props;

    let icon;

    switch(kind){
      case 'add':
      icon = <AddIcon/>
      break

      case 'edit':
      icon = <EditIcon/>
      break

      case 'delete':
      icon = <DeleteIcon/>
      break

      case 'commit':
      icon = <SaveIcon/>
      break

      case 'cancel':
      icon = <CancelIcon/>
      break
    }

    return (
      <IconButton onClick={onExecute} title={title}>
        {icon}
      </IconButton>
    );
  }
}

ActionButton.propTypes = {
  onExecute: PropTypes.func,
  title: PropTypes.string,
  kind: PropTypes.string
};

export default ActionButton
