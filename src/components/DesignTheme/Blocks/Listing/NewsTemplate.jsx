import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardCategory,
  CardText,
} from 'design-react-kit/dist/design-react-kit';

const NewsTemplate = ({ items, isEditMode, title, linkMore }) => {
  return (
    <div className="news-template">
      {title && <h2>{title}</h2>}
      <Row className="items">
        {items.map((item, index) => (
          <Col md="4" key={item['@id']}>
            <Card
              className={cx('listing-item card-bg', {
                'card-img': index < 3 && item.image,
              })}
            >
              {index < 3 && item.image && (
                <div className="img-responsive-wrapper">
                  <div className="img-responsive img-responsive-panoramic">
                    <figure className="img-wrapper">
                      <img
                        className="listing-image"
                        src={item.image.scales.preview.download}
                        alt={item.title}
                      />
                    </figure>
                  </div>
                </div>
              )}
              <CardBody>
                <CardCategory date={moment(item.effective).format('LLLL')}>
                  {item.subjects.join(', ')}
                </CardCategory>
                <CardTitle tag="h4">
                  {item.title ? item.title : item.id}
                </CardTitle>
                {item.description && <CardText>{item.description}</CardText>}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      {linkMore?.href && (
        <div className="bottom">
          <ConditionalLink to={linkMore.href}>{linkMore.title}</ConditionalLink>
        </div>
      )}
    </div>
  );
};

NewsTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default NewsTemplate;
