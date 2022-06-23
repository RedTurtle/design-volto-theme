import React from 'react';

import Styles from '@plone/volto/config/RichTextEditor/Styles';

import ToHTMLRenderers from '@plone/volto/config/RichTextEditor/ToHTML';
import FromHTML from '@plone/volto/config/RichTextEditor/FromHTML';
import Plugins from '@plone/volto/config/RichTextEditor/Plugins';
import Blocks from '@plone/volto/config/RichTextEditor/Blocks';
//import FromHTMLCustomBlockFn from '@plone/volto/config/RichTextEditor/FromHTML';

import UnderlineButton from '@italia/config/RichTextEditor/ToolbarButtons/UnderlineButton';
import HeadingsButton from '@italia/config/RichTextEditor/ToolbarButtons/HeadingsButton';
import AlignButton from '@italia/config/RichTextEditor/ToolbarButtons/AlignButton';
import CalloutsButton from '@italia/config/RichTextEditor/ToolbarButtons/CalloutsButton';
import ButtonsButton from '@italia/config/RichTextEditor/ToolbarButtons/ButtonsButton';
import TextSizeButton from '@italia/config/RichTextEditor/ToolbarButtons/TextSizeButton';

const ItaliaRichTextEditorPlugins = (props) => [];
const ItaliaRichTextEditorInlineToolbarButtons = (props, plugins) => {
  const linkPlugin = plugins.filter((p) => p.LinkButton != null)[0];
  const Separator = props.draftJsInlineToolbarPlugin.Separator;

  const buttons = Styles(props);
  const {
    BoldButton,
    ItalicButton,
    // HeadlineTwoButton,
    // HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    // CalloutButton,
  } = buttons;

  return [
    AlignButton,
    Separator,
    BoldButton,
    ItalicButton,
    UnderlineButton(props),
    TextSizeButton(props),
    Separator,
    HeadingsButton(props),
    linkPlugin.LinkButton,
    ButtonsButton(props),
    Separator,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CalloutsButton(props),
  ];
};

const renderHTMLBlock = (child) => {
  return child.map((subchild) => {
    if (Array.isArray(subchild)) {
      return subchild.map((subchildren) => {
        if (typeof subchildren === 'string') {
          const last = subchildren.split('\n').length - 1;
          return subchildren.split('\n').map((item, index) => (
            <React.Fragment key={index}>
              {item}
              {index !== last && <br />}
            </React.Fragment>
          ));
        } else {
          return subchildren;
        }
      });
    } else {
      return subchild;
    }
  });
};
const ItaliaBlocksHtmlRenderers = {
  blockquote: (children, { keys }) =>
    children.map((child, i) => (
      <blockquote key={keys[i]}>{renderHTMLBlock(child)}</blockquote>
    )),
  'align-center': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="text-center">
        {renderHTMLBlock(child)}
      </p>
    )),
  'align-right': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="text-right">
        {renderHTMLBlock(child)}
      </p>
    )),
  'align-justify': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="text-justify">
        {renderHTMLBlock(child)}
      </p>
    )),
  callout: (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="callout" role="note">
        {renderHTMLBlock(child)}
      </p>
    )),
  'callout-bg': (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="callout-bg" role="note">
        {renderHTMLBlock(child)}
      </p>
    )),
  buttons: (children, { keys }) =>
    children.map((child, i) => (
      <p id={keys[i]} key={keys[i]} className="draftjs-buttons">
        {renderHTMLBlock(child)}
      </p>
    )),
};

const ItaliaInlineHtmlRenderers = {
  TEXT_LARGER: (children, { key }) => (
    <span key={key} className="draftjs-text-larger">
      {children}
    </span>
  ),
};

const ItaliaFromHTMLCustomBlockFn = (element) => {
  let ret = FromHTML(element); //get default from plone/volto

  if (!ret) {
    if (element.className === 'callout-bg') {
      ret = {
        type: 'callout-bg',
      };
    } else if (element.className === 'draftjs-buttons') {
      ret = {
        type: 'buttons',
      };
    } else if (element.className === 'draftjs-text-larger') {
      ret = {
        type: 'TEXT_LARGER',
      };
    }
  }
  return ret;
};

export default function applyConfig(config) {
  config.settings.richtextEditorSettings = (props) => {
    const { plugins /*, inlineToolbarButtons*/ } = Plugins(props); // volto plugins
    const { extendedBlockRenderMap, blockStyleFn, listBlockTypes } = Blocks(
      props,
    );

    const { immutableLib } = props;
    const { Map } = immutableLib;

    const blockRenderMap = Map({
      'align-center': {
        element: 'p',
      },
      'align-right': {
        element: 'p',
      },
      'align-justify': {
        element: 'p',
      },
      'callout-bg': {
        element: 'p',
      },
      buttons: {
        element: 'p',
      },
    });

    const italiaBlockStyleFunction = (contentBlock) => {
      const type = contentBlock.getType();

      let r = blockStyleFn(contentBlock) || '';
      r = r.length > 0 ? ' ' : r;

      const styles = {
        'align-center': 'text-center',
        'align-right': 'text-right',
        'align-justify': 'text-justify',
        callout: 'callout',
        'callout-bg': 'callout-bg',
        buttons: 'draftjs-buttons',
      };

      r += styles[type] ?? '';

      return r;
    };

    return {
      extendedBlockRenderMap: extendedBlockRenderMap
        .update('text-center', (element = 'p') => element)
        .merge(blockRenderMap),
      voltoBlockStyleFn: blockStyleFn,
      blockStyleFn: italiaBlockStyleFunction,
      listBlockTypes: listBlockTypes,
      richTextEditorPlugins: [
        ...plugins,
        ...ItaliaRichTextEditorPlugins(props),
      ],
      richTextEditorInlineToolbarButtons: ItaliaRichTextEditorInlineToolbarButtons(
        props,
        plugins,
      ), //[inlineToolbarButtons,...ItaliaRichTextEditorInlineToolbarButtons(props)]
      FromHTMLCustomBlockFn: ItaliaFromHTMLCustomBlockFn, //FromHTMLCustomBlockFn
      customStyleMap: {
        TEXT_LARGER: { fontSize: '1.75rem' },
      },
    };
  };

  // TODO: rimuovere questa customizzazione quando sistemano https://github.com/plone/volto/issues/1601
  config.settings.richtextViewSettings.ToHTMLRenderers = {
    ...config.settings.richtextViewSettings.ToHTMLRenderers,
    blocks: {
      ...ToHTMLRenderers.blocks,
      ...ItaliaBlocksHtmlRenderers,
    },
    inline: { ...ToHTMLRenderers.inline, ...ItaliaInlineHtmlRenderers },
  };

  return config;
}
