/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';

import { Icon } from '@plone/volto/components';
import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';

import homeSVG from '@plone/volto/icons/home.svg';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
});

/**
 * Breadcrumbs container class.
 * @class Breadcrumbs
 * @extends Component
 */
class Breadcrumbs extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getBreadcrumbs: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getBreadcrumbs(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getBreadcrumbs(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <>
        {this.props.items ? (
          <section id="briciole" className="container px-4 my-4">
            <div className="row">
              <div className="col px-lg-4">
                <nav aria-label="breadcrumb" className="breadcrumb-container">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link
                        to="/"
                        title={this.props.intl.formatMessage(messages.home)}
                      >
                        {this.props.intl.formatMessage(messages.home)}
                      </Link>
                      <span className="separator">/</span>
                    </li>

                    {this.props.items.map((item, index, items) => [
                      null,
                      index < items.length - 1 ? (
                        <li className="breadcrumb-item" key={item.url}>
                          <Link to={item.url}>{item.title}</Link>
                          <span className="separator">/</span>
                        </li>
                      ) : (
                        <li
                          key={item.url}
                          aria-current="page"
                          className="breadcrumb-item active"
                        >
                          {item.title}
                        </li>
                      ),
                    ])}
                  </ol>
                </nav>
              </div>
            </div>
          </section>
        ) : null}
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    state => ({
      items: state.breadcrumbs.items,
    }),
    { getBreadcrumbs },
  ),
)(Breadcrumbs);
