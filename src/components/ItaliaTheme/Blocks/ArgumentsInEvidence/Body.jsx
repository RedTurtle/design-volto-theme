import React from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import {
  DNDSubblocks,
  SubblockEdit,
  Subblock,
} from '@italia/addons/volto-subblocks';
import Block from './Block';

class Body extends SubblockEdit {
  constructor(props) {
    super(props);
    this.state = {
      focusOn: 'title',
    };
    if (!__SERVER__) {
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Subblock subblock={this} className="subblock-edit">
        <Block
          data={this.props.data}
          index={this.props.index}
          key={this.props.index}
          inEditMode={this.props.inEditMode}
          selected={this.props.selected || this.state.focusOn === 'title'}
          block={this.props.block}
          focusOn={this.props.focusOn}
          intl={this.props.intl}
          onChange={this.onChange}
        />
      </Subblock>
    );
  }
}
export default React.memo(compose(injectIntl, ...DNDSubblocks)(Body));
