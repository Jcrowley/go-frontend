'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import { PropTypes as T } from 'prop-types';

import App from './app';
import FieldReportsTable from '../components/connected/field-reports-table';
import EmergenciesDash from '../components/connected/emergencies-dash';
import EmergenciesTable from '../components/connected/emergencies-table';

import { getLastMonthsEmergencies, getAggregateEmergencies } from '../actions';
import { environment } from '../config';

class Emergencies extends React.Component {
  componentDidMount () {
    this.props._getLastMonthsEmergencies();
    this.props._getAggregateEmergencies(DateTime.local().minus({months: 11}).startOf('day').toISODate(), 'month');
  }

  render () {
    return (
      <App className='page--emergencies'>
        <section className='inpage'>
          <EmergenciesDash />
          <div className='inpage__body'>
            <div className='inner'>
              <EmergenciesTable />
            </div>
            <div className='inner'>
              <FieldReportsTable />
            </div>
          </div>
        </section>
      </App>
    );
  }
}

if (environment !== 'production') {
  Emergencies.propTypes = {
    _getLastMonthsEmergencies: T.func,
    _getAggregateEmergencies: T.func,
    lastMonth: T.object,
    aggregate: T.object
  };
}

// /////////////////////////////////////////////////////////////////// //
// Connect functions

const selector = (state) => ({
  lastMonth: state.emergencies.lastMonth,
  aggregate: state.emergencies.aggregate
});

const dispatcher = (dispatch) => ({
  _getAggregateEmergencies: (...args) => dispatch(getAggregateEmergencies(...args)),
  _getLastMonthsEmergencies: () => dispatch(getLastMonthsEmergencies())
});

export default connect(selector, dispatcher)(Emergencies);
