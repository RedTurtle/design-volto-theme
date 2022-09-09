/**
 * Edit icons block.
 * @module components/manage/Blocks/Title/Edit
 */

import React from 'react';
import { defineMessages } from 'react-intl';
import { SidebarPortal } from '@plone/volto/components';

import {
  withDNDContext,
  SubblocksEdit,
  SubblocksWrapper,
} from 'volto-subblocks';
import Sidebar from './Sidebar.jsx';
import EditBlock from './Block/EditBlock';
import Body from './Body';

const messages = defineMessages({
  addItem: {
    id: 'Add accordion item',
    defaultMessage: 'Aggiungi elemento',
  },
  titlePlaceholder: { id: 'Title', defaultMessage: 'Titolo' },
  noVideos: {
    id: 'noVideos',
    defaultMessage:
      'Nessun video selezionato. Aggiungi un elemento per mostrare un video',
  },
});
/**
 * Edit icons block class.
 * @class Edit
 * @extends Component
 */
class Edit extends SubblocksEdit {
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
      <div className="public-ui">
        <SubblocksWrapper node={this.node}>
          <Body {...this.props} nItems={this.state.subblocks?.length}>
            {this.state.subblocks.map((subblock, subindex) => (
              <div className="it-single-slide-wrapper" key={subblock.id}>
                <EditBlock
                  data={subblock}
                  index={subindex}
                  selected={this.isSubblockSelected(subindex)}
                  {...this.subblockProps}
                />
              </div>
            ))}
            {this.state.subblocks.length === 0 && (
              <div>{this.props.intl.formatMessage(messages.noVideos)}</div>
            )}
          </Body>
        </SubblocksWrapper>
        {this.props.selected && (
          <div className="add-block-wrapper">
            {this.renderAddBlockButton(
              this.props.intl.formatMessage(messages.addItem),
            )}
          </div>
        )}
        <SidebarPortal selected={this.props.selected || false}>
          <Sidebar
            {...this.props}
            data={this.props.data}
            block={this.props.block}
            onChangeBlock={this.props.onChangeBlock}
            onChangeSubBlock={this.onChangeSubblocks}
            selected={this.state.subIndexSelected}
            setSelected={this.onSubblockChangeFocus}
            openObjectBrowser={this.props.openObjectBrowser}
          />
        </SidebarPortal>
      </div>
    );
  }
}

export default React.memo(withDNDContext(Edit));
