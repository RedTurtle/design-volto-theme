/**
 * Edit title block.
 * @module components/Blocks/TitleVM/Edit
 */

import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { stateFromHTML } from 'draft-js-import-html';
import {
  Editor,
  DefaultDraftBlockRenderMap,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import { defineMessages, injectIntl } from 'react-intl';
import { TextEditorWidget } from '@italia/components/ItaliaTheme';
import { isEqual } from 'lodash';
import { settings } from '@italia/config';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar.jsx';
import BodyWrapper from './BodyWrapper.jsx';

const messages = defineMessages({
  image_card_title: {
    id: 'Type the title…',
    defaultMessage: 'Type the title…',
  },
  image_card_content: {
    id: 'Type description…',
    defaultMessage: 'Digita la descrizione…',
  },
  image_card_click: {
    id: 'Type text…',
    defaultMessage: 'Digita il testo…',
  },
});

const blockRenderMap = Map({
  unstyled: {
    element: 'h2',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

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
      let editorState;

      // Setup state for title
      if (props.data && props.data.image_card_title) {
        editorState = EditorState.createWithContent(
          stateFromHTML(props.data.image_card_title),
        );
      } else {
        editorState = EditorState.createEmpty();
      }

      if (props.data) {
        if (!props.data.blockRenderMap) {
          props.data.blockRenderMap = settings.extendedBlockRenderMap;
        }
      }

      // setup component state
      this.state = {
        editorState,
        focus_title: true,
        // focus_portata_di_click: false,
      };
    }

    //bind this in change handlers
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // on mount set focus on title, and bind events on blur and focus to change
    // state
    console.log(this.props);
    // debugger;
    if (this.node) {
      this.node.focus();
      this.node._onBlur = () => this.setState({ focus_title: false });
      this.node._onFocus = () => this.setState({ focus_title: true });
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps.properties.image_card_title);
    console.log(this.props.properties.image_card_title);
    if (
      nextProps.properties.image_card_title &&
      this.props.properties.image_card_title !==
        nextProps.properties.image_card_title &&
      !this.state.focus_title
    ) {
      const contentState = stateFromHTML(nextProps.properties.image_card_title);

      this.setState({
        editorState: nextProps.properties.image_card_title
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (!this.props.selected && nextProps.selected) {
      console.log('focus', this.props.selected, nextProps.selected);
      this.node.focus();
      this.setState({ focus_title: true });
    }
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    if (
      !isEqual(
        convertToRaw(editorState.getCurrentContent()),
        convertToRaw(this.state.editorState.getCurrentContent()),
      )
    ) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        image_card_title: convertToRaw(editorState.getCurrentContent()),
      });
      this.setState({ editorState });
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
        <div>
          <div className="public-ui">
            <BodyWrapper data={this.props.data} inEditMode={false}>
              <Editor
                onChange={this.onChange}
                editorState={this.state.editorState}
                blockRenderMap={extendedBlockRenderMap}
                handleReturn={() => {
                  this.props.onSelectBlock(
                    this.props.onAddBlock('text', this.props.index + 1),
                  );
                  return 'handled';
                }}
                placeholder={this.props.intl.formatMessage(
                  messages.image_card_title,
                )}
                ref={(node) => {
                  this.node = node;
                }}
              />
              {/* <TextEditorWidget
            data={this.props.data}
            fieldName="image_card_title"
            selected={true}
            block={this.props.block}
            onChangeBlock={(data) =>
              this.props.onChangeBlock(this.props.block, data)
            }
            placeholder={this.props.intl.formatMessage(
              messages.image_card_title,
            )}
            showToolbar={true}
            ref={(node) => (this.node = node)} */}
              {/* /> */}

              <div>
                <TextEditorWidget
                  data={this.props.data}
                  fieldName="image_card_content"
                  selected={false}
                  block={this.props.block}
                  onChangeBlock={(data) =>
                    this.props.onChangeBlock(this.props.block, data)
                  }
                  placeholder={this.props.intl.formatMessage(
                    messages.image_card_content,
                  )}
                  showToolbar={true}
                />
              </div>
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
        </div>
      </div>
    );
  }
}

export default injectIntl(Edit);
