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

const Block = ({ content, entityMap, isEditMode, hasImage }) => {
  const intl = useIntl();
  console.log('block', entityMap, content, hasImage);
  return content && entityMap ? (
    <Card
      color="white"
      className="card-bg rounded"
      noWrapper={false}
      space
      tag="div"
    >
      <CardBody>
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
      </CardBody>
    </Card>
  ) : null;
};

Block.propTypes = {
  entityMap: PropTypes.any,
  title: PropTypes.string,
  content: PropTypes.any,
};

export default Block;
