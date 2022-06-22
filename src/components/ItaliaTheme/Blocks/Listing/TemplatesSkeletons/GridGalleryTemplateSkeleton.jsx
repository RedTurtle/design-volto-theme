import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { UniversalLink } from '@plone/volto/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const GridGalleryTemplateSkeleton = ({
  isEditMode,
  title,
  linkHref,
  show_block_bg,
  designReactKit,
}) => {
  const { Container, Row, Col } = designReactKit;

  return (
    <div className="grid-gallery-template">
      <Container className="px-4">
        <div className="skeleton-template">
          {title && (
            <Row>
              <Col>
                <h2 className="mb-4">{title}</h2>
              </Col>
            </Row>
          )}

          <div className="grid-gallery-grid">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={cx('grid-gallery-item', `item-${i % 7}`)}>
                <UniversalLink href="#">
                  <h3 className="skeleton-item-title"> </h3>
                </UniversalLink>
              </div>
            ))}
          </div>
          {linkHref && <div className="link-more text-center my-5"></div>}
        </div>
      </Container>
    </div>
  );
};

GridGalleryTemplateSkeleton.propTypes = {
  linkHref: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default injectLazyLibs(['designReactKit'])(GridGalleryTemplateSkeleton);
