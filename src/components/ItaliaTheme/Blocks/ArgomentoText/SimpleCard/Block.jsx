import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Container,
  Row,
  Col,
} from 'design-react-kit/dist/design-react-kit';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { TextEditorWidget } from '@italia/components/ItaliaTheme';

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

const styler = (content, entityMapping) => {
  if (!entityMapping) return content.text;
  switch (entityMapping.type) {
    case 'LINK':
      return (
        <a
          href={entityMapping.data.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.text}
        </a>
      );
    default:
      return;
  }
};

const Block = ({
  title,
  content,
  entityMap,
  inEditMode,
  data,
  block,
  onChange,
}) => {
  const intl = useIntl();
  console.log('block', entityMap, content);
  return (
    <Card
      color="white"
      className="card-bg rounded"
      noWrapper={false}
      space
      tag="div"
    >
      <CardBody>
        {inEditMode ? (
          <>
            <div>
              <TextEditorWidget
                data={data}
                fieldName="simple_card_title"
                selected={true}
                block={block}
                onChangeBlock={(data) => onChange(data, 'simple_card_title')}
                placeholder={intl.formatMessage(messages.simple_card_title)}
                showToolbar={true}
              />
            </div>
            <div>
              <TextEditorWidget
                data={data}
                fieldName="simple_card_content"
                selected={false}
                block={block}
                onChangeBlock={(data) => onChange(data, 'simple_card_content')}
                placeholder={intl.formatMessage(messages.simple_card_content)}
                showToolbar={true}
              />
            </div>
          </>
        ) : (
          <>
            <CardTitle tag="h5">{title}</CardTitle>
            {content?.map((ct, i) => {
              return (
                <CardText tag="p">
                  {styler(
                    ct,
                    entityMap[
                      ct.entityRanges.length > 0
                        ? ct.entityRanges[0].key.toString()
                        : null
                    ],
                  )}
                </CardText>
              );
            })}
          </>
        )}
      </CardBody>
    </Card>
  );
};

Block.propTypes = {
  entityMap: PropTypes.any,
  title: PropTypes.string,
  content: PropTypes.any,
};

export default Block;
