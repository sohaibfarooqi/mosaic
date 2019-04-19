import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
  makeSelectSuccess,
  makeSelectPayload
} from 'containers/App/selectors';

import {
  loadData,
  createRecord,
  updateRecord,
  deleteRecord
} from 'containers/App/actions';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import DataTable from 'components/DataTable';

import {columns, tableColumnExtensions} from './columns';
import {transformRows} from './utils'

class CompositionPage extends React.Component{

  componentDidMount(){
    this.props.onLoadData();
    this.handleUpdates = this.handleUpdates.bind(this); //Table updation handler
  }
  /*
  Main function to perform all updates of Composition resource.
  */
  handleUpdates( added, changed, deleted ){
    // when new object is created.
    if (added.added){
      let obj = added.added[0]
      obj = {...obj, movements: obj.movements.split(',').map((m) => { return {title: m}})}
      this.props.onRowAdded(obj)
    }
    // when object is modified.
    else if (added.changed){
      let obj = added.changed
      let id = Object.keys(obj)[0]
      obj = {...this.props.data.find((f) => f.id == id), ...obj[id]}
      obj = {...obj, movements: typeof obj.movements[0] == "string" ? obj.movements.split(',').map((m) => { return {title: m}}) : obj.movements.map((m) => { return {title: m.title}})}
      this.props.onRowUpdated(id, obj)
    }
    // when object is deleted.
    else if (added.deleted){
      let id = added.deleted[0]
      this.props.onRowDeleted(id)
    }
  }

  render(){
    const {loading, error, data} = this.props

    return (
      <article>
        <Helmet>
          <title>Composition Page</title>
          <meta name="description" content="Browse your favourite compositions"/>
        </Helmet>
          <div>
            <DataTable
            columns={columns}
            rows={transformRows(data) || []}
            tableColumnExtensions={tableColumnExtensions}
            handleUpdates={this.handleUpdates}/>
        </div>
      </article>
    )
  }
}

CompositionPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: evt => dispatch(loadData()),
    onRowAdded: row => dispatch(createRecord(row)),
    onRowUpdated: (id, row) => dispatch(updateRecord(id, row)),
    onRowDeleted: id => dispatch(deleteRecord(id)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'composition', reducer });
const withSaga = injectSaga({ key: 'composition', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(CompositionPage);
