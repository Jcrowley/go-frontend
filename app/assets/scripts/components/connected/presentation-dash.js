'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes as T } from 'prop-types';
import { DateTime } from 'luxon';
import c from 'classnames';

import { environment } from '../../config';
import { getAppealsList, getAggregateAppeals } from '../../actions';

import Homestats from '../homestats';
import Homemap from '../homemap';
import HomeCharts from '../homecharts';

const enterFullscreen = () => {
  let i = document.querySelector('#presentation');
  if (i.requestFullscreen) {
    i.requestFullscreen();
  } else if (i.webkitRequestFullscreen) {
    i.webkitRequestFullscreen();
  } else if (i.mozRequestFullScreen) {
    i.mozRequestFullScreen();
  } else if (i.msRequestFullscreen) {
    i.msRequestFullscreen();
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

const isFullscreen = () => {
  return document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;
};

class PresentationDash extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fullscreen: false
    };

    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.onFullscreenChange = this.onFullscreenChange.bind(this);
  }

  componentDidMount () {
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.onFullscreenChange);

    this.props._getAppealsList();
    this.props._getAggregateAppeals(DateTime.local().minus({months: 11}).startOf('day').toISODate(), 'month');
    this.props._getAggregateAppeals('1990-01-01', 'year');
  }

  componentWillUnmount () {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.onFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.onFullscreenChange);
  }

  onFullscreenChange () {
    this.setState({fullscreen: isFullscreen()});
  }

  toggleFullscreen () {
    if (isFullscreen()) {
      exitFullscreen();
      this.setState({fullscreen: false});
    } else {
      enterFullscreen();
      this.setState({fullscreen: true});
    }
  }

  render () {
    const {
      appealsList,
      aggregate
    } = this.props;

    return (
      <section className={c('fold--stats', {presenting: this.state.fullscreen})} id='presentation'>
        <h1 className='visually-hidden'>Statistics</h1>
        <div className='inner'>
          <div className='presentation__actions'>
            <button className='button button--base-plain button--fullscreen' onClick={this.toggleFullscreen} title='View in fullscreen'><span>FullScreen</span></button>
          </div>
          <Homestats
            appealsList={appealsList} />
        </div>
        <Homemap
          appealsList={appealsList} />
        <div className='inner'>
          <HomeCharts
            aggregate={aggregate} />
        </div>
      </section>
    );
  }
}

if (environment !== 'production') {
  PresentationDash.propTypes = {
    _getAppealsList: T.func,
    _getAggregateAppeals: T.func,
    appealsList: T.object,
    aggregate: T.object
  };
}

// /////////////////////////////////////////////////////////////////// //
// Connect functions

const selector = (state) => ({
  appealsList: state.overallStats.appealsList,
  aggregate: state.overallStats.aggregate
});

const dispatcher = (dispatch) => ({
  _getAppealsList: (...args) => dispatch(getAppealsList(...args)),
  _getAggregateAppeals: (...args) => dispatch(getAggregateAppeals(...args))
});

export default connect(selector, dispatcher)(PresentationDash);
