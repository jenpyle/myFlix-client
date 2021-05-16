import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)} //got the setFilter from the actions
      value={props.visibilityFilter}
      placeholder="filter"
    />
  );
}

//connected to the store
export default connect(null, { setFilter })(VisibilityFilterInput);
//exporting and connecting it to use anywhere
