import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { UniversalLink } from '@plone/volto/components';

import { Container, Row, Col } from 'design-react-kit/dist/design-react-kit';

const SquaresImageTemplateSkeleton = ({
  isEditMode,
  title,
  linkMore,
  show_block_bg,
}) => {
  return (
    <div
      className={cx('squares-image-template', {
        'public-ui': isEditMode,
      })}
    >
      <div className="full-width">
        <Container className="px-4">
          <div className="skeleton-template">
            {title && (
              <Row>
                <Col>
                  <h2 className="mb-4">{title}</h2>
                </Col>
              </Row>
            )}

            <div className="grid mb-3 mt-5">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <UniversalLink
                  href="#"
                  key={i}
                  className="listing-item box bg-img card"
                >
                  <span className="title skeleton-item-title"> </span>
                </UniversalLink>
              ))}
            </div>
            {linkMore?.href && (
              <div className="link-more text-center my-5"></div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

SquaresImageTemplateSkeleton.propTypes = {
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default SquaresImageTemplateSkeleton;