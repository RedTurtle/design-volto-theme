/**
 * Edit title block.
 * @module components/Blocks/TitleVM/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from './Block';
import { injectIntl } from 'react-intl';
import { isEqual } from 'lodash';

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
      // let editorState;
      // // Setup state for title
      // if (props.data && props.data.simple_card_title) {
      //   editorState = EditorState.createWithContent(
      //     stateFromHTML(props.data.simple_card_title.text),
      //   );
      // } else {
      //   editorState = EditorState.createEmpty();
      // }
      // if (props.data) {
      //   if (!props.data.blockRenderMap) {
      //     props.data.blockRenderMap = settings.extendedBlockRenderMap;
      //   }
      // }
      // // setup component state
      // this.state = {
      //   editorState,
      //   focus_title: true,
      //   // focus_portata_di_click: false,
      // };
    }

    //bind this in change handlers
    // this.onChange = this.onChange.bind(this);
  }

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // on mount set focus on title, and bind events on blur and focus to change
    // state
    // if (this.node) {
    //   this.node.focus();
    //   this.node._onBlur = () => this.setState({ focus_title: false });
    //   this.node._onFocus = () => this.setState({ focus_title: true });
    // }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.properties.simple_card_title);
  //   console.log(this.props.properties.simple_card_title);
  //   if (
  //     nextProps.properties.simple_card_title &&
  //     this.props.properties.simple_card_title !==
  //       nextProps.properties.simple_card_title &&
  //     !this.state.focus_title
  //   ) {
  //     const contentState = stateFromHTML(
  //       nextProps.properties.simple_card_title,
  //     );
  //     debugger;
  //     this.setState({
  //       editorState: nextProps.properties.simple_card_title
  //         ? EditorState.createWithContent(contentState)
  //         : EditorState.createEmpty(),
  //     });
  //   }

  //   if (!this.props.selected && nextProps.selected) {
  //     console.log('focus', this.props.selected, nextProps.selected);
  //     this.node.focus();
  //     this.setState({ focus_title: true });
  //   }
  // }

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

    console.log(this.props.data.simple_card_title);
    console.log(this.state);
    return (
      <Block
        title={this.props.data?.simple_card_title?.blocks[0]?.text}
        content={this.props.data?.simple_card_content?.blocks}
        entityMap={this.props.data?.simple_card_content?.entityMap}
        data={this.props.data}
        block={this.props.block}
        onChange={this.props.onChange}
        inEditMode={true}
      />
    );
  }
}

export default injectIntl(Edit);
