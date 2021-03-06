'use strict';
import React from 'react';
import { PropTypes as T } from 'prop-types';
import c from 'classnames';

import { environment } from '../config';

export default class Fold extends React.Component {
  renderHeader () {
    if (React.isValidElement(this.props.header)) {
      return this.props.header;
    } else if (typeof this.props.header === 'function') {
      return (
        <div className={c('fold__header', this.props.headerClass)}>
          {this.props.header()}
        </div>
      );
    } else {
      return (
        <div className={c('fold__header', this.props.headerClass)}>
          <h2 className='fold__title'>{this.props.title}</h2>
          {this.props.description && <p className='fold__description'>{this.props.description}</p>}
        </div>
      );
    }
  }

  renderFooter () {
    if (React.isValidElement(this.props.footer)) {
      return this.props.footer;
    } else if (typeof this.props.footer === 'function') {
      return (
        <div className={c('fold__footer', this.props.footerClass)}>
          {this.props.footer()}
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    return (
      <div className={c('fold', this.props.wrapperClass)} id={this.props.id}>
        <div className='inner'>
          {this.renderHeader()}
          <div className={c('fold__body', this.props.bodyClass)}>
            {this.props.children}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

if (environment !== 'production') {
  Fold.propTypes = {
    id: T.string,
    title: T.string,
    description: T.string,
    header: T.oneOfType([T.element, T.func]),
    footer: T.oneOfType([T.element, T.func]),
    wrapperClass: T.string,
    headerClass: T.string,
    bodyClass: T.string,
    footerClass: T.string,
    children: T.node
  };
}
