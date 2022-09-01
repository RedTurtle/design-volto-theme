import React from 'react';
import BodyWrapper from '@italia/components/ItaliaTheme/Blocks/ArgumentsInEvidence/BodyWrapper';
import PropTypes from 'prop-types';
import BottomBody from '@italia/components/ItaliaTheme/Blocks/ArgumentsInEvidence/BottomBody';
import Body from '@italia/components/ItaliaTheme/Blocks/ArgumentsInEvidence/Body';
import {
  withDNDContext,
  SubblocksEdit,
  SubblocksWrapper,
} from '@italia/addons/volto-subblocks';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from '@italia/components/ItaliaTheme/Blocks/ArgumentsInEvidence/Sidebar.jsx';
import { ArgumentsInEvidenceBackground } from '@italia/components/ItaliaTheme';

class Edit extends SubblocksEdit {
  render() {
    return (
      <div className="argumentInEvidence public-ui">
        <ArgumentsInEvidenceBackground inEditMode={true} />
        <SubblocksWrapper node={this.node}>
          <BodyWrapper data={this.props.data} inEditMode={false}>
            {this.state.subblocks.map((subblock, subindex) => (
              <Body
                data={subblock}
                index={subindex}
                key={subblock.id}
                inEditMode={true}
                selected={this.isSubblockSelected(subindex)}
                {...this.subblockProps}
                intl={this.props.intl}
                openObjectBrowser={this.props.openObjectBrowser}
                onChangeFocus={this.onSubblockChangeFocus}
              />
            ))}
            {this.props.selected && this.renderAddBlockButton()}
          </BodyWrapper>
        </SubblocksWrapper>

        <SidebarPortal selected={this.props.selected || false}>
          <Sidebar
            {...this.props}
            data={this.props.data}
            block={this.props.block}
            onChangeBlock={this.props.onChangeBlock}
            onChangeSubBlock={this.onChangeSubblocks}
            selected={this.state.subIndexSelected}
            setSelected={this.onSubblockChangeFocus}
          />
        </SidebarPortal>

        <BottomBody data={this.props.data} intl={this.props.intl} />
      </div>
    );
  }
}
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  block: PropTypes.string.isRequired,
  selected: PropTypes.any,
  intl: PropTypes.any,
  onChangeBlock: PropTypes.func.isRequired,
};

export default React.memo(withDNDContext(Edit));
