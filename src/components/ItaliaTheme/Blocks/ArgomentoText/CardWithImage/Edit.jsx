/**
 * Edit title block.
 * @module components/Blocks/TitleVM/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { isEqual } from 'lodash';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar.jsx';
import BodyWrapper from './BodyWrapper.jsx';
import Block from './Block';

/**
 * Edit title block class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
    selected: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onChangeField: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onAddBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    block: PropTypes.string.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs ArgomentoTitle Edit block
   */
  constructor(props) {
    super(props);

    if (!__SERVER__) {
    }
  }

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {}

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(obj, fieldname) {
    if (!isEqual(obj[fieldname], this.props.data[fieldname])) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        [fieldname]: obj[fieldname],
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }

    return (
      <div>
        <BodyWrapper data={this.props.data} inEditMode={true}>
          <Block
            data={this.props.data}
            block={this.props.block}
            onChange={(obj, fieldname) => this.onChange(obj, fieldname)}
            inEditMode={true}
          />
        </BodyWrapper>

        <SidebarPortal selected={this.props.selected || false}>
          <Sidebar
            {...this.props}
            data={this.props.data}
            block={this.props.block}
            onChangeBlock={this.props.onChangeBlock}
          />
        </SidebarPortal>
      </div>
    );
  }
}

export default injectIntl(Edit);
