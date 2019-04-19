import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';

import {
  loadData,
  createRecord,
  updateRecord,
  deleteRecord
} from 'containers/App/actions';
import DataTable from 'components/DataTable';

import {columns, tableColumnExtensions} from './columns';
import {transformRows} from './utils'

class RecordingPage extends React.Component{

  constructor(props){
    super(props)
    this.handleUpdates = this.handleUpdates.bind(this)
  }
  componentDidMount(){
    this.props.onPageLoad();
  }
  handleUpdates( added, changed, deleted ){

    if (added.added){
      let obj = added.added[0]
      obj = {...obj, performers: obj.performers.split(',').map((m) => { return {name: m}})}
      console.log(obj)
      this.props.onRowAdded(obj)
    }

    else if (added.changed){
      let obj = added.changed
      let id = Object.keys(obj)[0]
      obj = {...this.props.data.find((f) => f.id == id), ...obj[id]}
      obj = {
        ...obj,
        performers: typeof obj.performers[0] == "string" ?
        obj.performers.split(',').map((m) => { return {name: m}}) :
        obj.performers.map((m) => { return {name: m.name}})
    }
      this.props.onRowUpdated(id, obj)
    }

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
          <title>Recording Page</title>
          <meta name="description" content="Browse your favourite recording"/>
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

RecordingPage.propTypes = {
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
    onPageLoad: evt => dispatch(loadData()),
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
  withConnect,
)(RecordingPage);
