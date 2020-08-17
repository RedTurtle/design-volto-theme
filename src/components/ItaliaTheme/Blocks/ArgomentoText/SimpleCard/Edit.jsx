/**
 * Edit title block.
 * @module components/Blocks/TitleVM/Edit
 */

import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor, DefaultDraftBlockRenderMap, EditorState } from 'draft-js';
import { defineMessages, injectIntl } from 'react-intl';
import { TextEditorWidget } from '@design/components/DesignTheme';

const messages = defineMessages({
  simple_card_title: {
    id: 'Type the title…',
    defaultMessage: 'Type the title…',
  },
  simple_card_content: {
    id: 'Type description…',
    defaultMessage: 'Digita la descrizione…',
  },
  simple_card_click: {
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
      // let editorStateDescription;

      // Setup state for title
      if (props.data && props.data.simple_card_title) {
        editorState = EditorState.createWithContent(
          stateFromHTML(props.data.simple_card_title),
        );
      } else if (props.properties && props.properties.simple_card_title) {
        const contentState = stateFromHTML(props.properties.simple_card_title);
        editorState = EditorState.createWithContent(contentState);
      } else {
        editorState = EditorState.createEmpty();
      }

      // Setup state for description
      // if (props.data && props.data.description) {
      //   editorStateDescription = EditorState.createWithContent(
      //     stateFromHTML(props.data.description),
      //   );
      // } else if (props.properties && props.properties.description) {
      //   const contentStateDescription = stateFromHTML(
      //     props.properties.description,
      //   );
      //   editorStateDescription = EditorState.createWithContent(
      //     contentStateDescription,
      //   );
      // } else {
      //   editorStateDescription = EditorState.createEmpty();
      // }

      // setup component state
      this.state = {
        editorState,
        // editorStateDescription,
        focus: true,
        focus_description: false,
        focus_portata_di_click: false,
      };
    }

    //bind this in change handlers
    this.onChange = this.onChange.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // on mount set focus on title, and bind events on blur and focus to change
    // state
    if (this.node) {
      this.node.focus();
      this.node._onBlur = () => this.setState({ focus: false });
      this.node._onFocus = () => this.setState({ focus: true });
    }
    // if (this.node_description) {
    //   this.node_description._onBlur = () =>
    //     this.setState({ focus_description: false });
    //   this.node_description._onFocus = () =>
    //     this.setState({ focus_description: true });
    // }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps.properties.simple_card_title);
    console.log(this.props.properties.simple_card_title);
    if (
      nextProps.properties.simple_card_title &&
      this.props.properties.simple_card_title !==
        nextProps.properties.simple_card_title &&
      !this.state.focus
    ) {
      const contentState = stateFromHTML(
        nextProps.properties.simple_card_title,
      );
      this.setState({
        editorState: nextProps.properties.simple_card_title
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (!this.props.selected && nextProps.selected) {
      console.log('focus', this.props.selected, nextProps.selected);
      this.node.focus();
      this.setState({ focus: true });
    }

    // if (
    //   nextProps.properties.description &&
    //   this.props.properties.description !== nextProps.properties.description &&
    //   !this.state.focus_description
    // ) {
    //   const contentStateDescription = stateFromHTML(
    //     nextProps.properties.description,
    //   );
    //   this.setState({
    //     editorStateDescription: nextProps.properties.description
    //       ? EditorState.createWithContent(contentStateDescription)
    //       : EditorState.createEmpty(),
    //   });
    // }
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    this.setState({ editorState }, () => {
      this.props.onChangeField(
        'simple_card_title',
        editorState.getCurrentContent().getPlainText(),
      );
    });
  }

  // onChangeDescription(editorStateDescription) {
  //   this.setState({ editorStateDescription }, () => {
  //     this.props.onChangeField(
  //       'description',
  //       editorStateDescription.getCurrentContent().getPlainText(),
  //     );
  //   });
  // }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }
    console.log(this.props.data);
    console.log(this.properties);
    return (
      <div>
        <div>
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
            ref={node => {
              this.node = node;
            }}
          />
          <h4>Titolo</h4>
          <TextEditorWidget
            data={this.props.data}
            fieldName="simple_card_title"
            selected={true}
            block={this.props.block}
            onChangeBlock={data =>
              this.props.onChangeBlock(this.props.block, data)
            }
            placeholder={this.props.intl.formatMessage(
              messages.simple_card_title,
            )}
            showToolbar={true}
          />
        </div>
        <div>
          {/* <h4>A PORTATA DI CLICK</h4> */}
          <TextEditorWidget
            data={this.props.data}
            fieldName="simple_card_content"
            selected={true}
            block={this.props.block}
            onChangeBlock={data =>
              this.props.onChangeBlock(this.props.block, data)
            }
            placeholder={this.props.intl.formatMessage(
              messages.simple_card_content,
            )}
            showToolbar={true}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(Edit);
