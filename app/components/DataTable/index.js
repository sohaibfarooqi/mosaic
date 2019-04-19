import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow,
  TableEditColumn, PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import {
  EditingState, PagingState, IntegratedPaging
} from '@devexpress/dx-react-grid';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';

import ActionButton from 'components/ActionButton'

const getRowId = row => row.id;

/*
Action button definition
*/
const AddButton = ({ onExecute }) => (
    <ActionButton onExecute={onExecute} kind='add' title="Create new row"/>
);

const EditButton = ({ onExecute }) => (
  <ActionButton onExecute={onExecute} kind='edit' title="Edit Row"/>
);

const DeleteButton = ({ onExecute }) => (
  <ActionButton onExecute={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
    kind='delete' title="Delete Row"/>
);

const CommitButton = ({ onExecute }) => (
  <ActionButton onExecute={onExecute} kind='commit' title="Save Row"/>
);

const CancelButton = ({ onExecute }) => (
  <ActionButton onExecute={onExecute} kind='cancel' title="Cancel changes"/>
);

/*
End action button definition
*/
const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton onExecute={onExecute} />
  );
};

const Cell = (props) => {return <Table.Cell {...props} />};
const EditCell = (props) => {return <TableEditRow.Cell {...props} />};

class DataTable extends React.Component{

  render(){

    const {columns, rows, tableColumnExtensions, handleUpdates} = this.props

    return(
      <Paper>
        <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}>

            <EditingState onCommitChanges={handleUpdates}/>

            <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}/>

            <TableHeaderRow/>

            <TableEditRow cellComponent={EditCell}/>

          <TableEditColumn
            width={170}
            showAddCommand
            showEditCommand
            showDeleteCommand
            commandComponent={Command}/>

        </Grid>
      </Paper>
    )
  }
}

DataTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  tableColumnExtensions: PropTypes.array,
  handleUpdates: PropTypes.func,
}

export default DataTable
