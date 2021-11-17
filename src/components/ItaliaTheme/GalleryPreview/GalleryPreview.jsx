import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';

import PropTypes from 'prop-types';
import Image from '@plone/volto/components/theme/Image/Image';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'design-react-kit/dist/design-react-kit';
import { Icon } from '@italia/components/ItaliaTheme';

const messages = defineMessages({
  view_prev: {
    id: 'gallery_view_prev',
    defaultMessage: 'Immagine precedente',
  },
  view_next: {
    id: 'gallery_view_next',
    defaultMessage: 'Immagine successiva',
  },
  close_preview: {
    id: 'gallery_close_preview',
    defaultMessage: "Chiudi l'anteprima",
  },
});

/**
 * GalleryPreview view component class.
 * @function GalleryPreview
 * @params {object} content Content object.
 * @params {string} folder name where to find images.
 * @returns {string} Markup of the component.
 */
const GalleryPreview = ({ id, viewIndex, setViewIndex, items }) => {
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setViewIndex(null);
  };

  useEffect(() => {
    if (viewIndex != null) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }
  }, [viewIndex]);

  return items?.length > 0 ? (
    <Modal
      isOpen={modalIsOpen}
      wrapClassName="public-ui"
      id={`gallery-preview-${id}`}
      size="xl"
      className="gallery-preview"
      onExit={() => {
        setViewIndex(null);
        setModalIsOpen(false);
      }}
      backdrop="static"
      centered={true}
      toggle={closeModal}
      scrollable={false}
    >
      {viewIndex != null && (
        <>
          <ModalHeader
            closeButton={true}
            closeAriaLabel={intl.formatMessage(messages.close_preview)}
            toggle={closeModal}
          >
            {items[viewIndex].title}{' '}
          </ModalHeader>
          <ModalBody>
            <div className="item-preview">
              <Button
                color="white"
                size="xs"
                title={intl.formatMessage(messages.view_prev)}
                onClick={() => {
                  setViewIndex(
                    viewIndex - 1 >= 0 ? viewIndex - 1 : items.length - 1,
                  );
                }}
                className="prev"
              >
                <Icon color="" icon="it-arrow-left" padding={false} />
              </Button>

              <div className="image">
                <Image
                  src={flattenToAppURL(
                    items[viewIndex].image.scales.larger.download,
                  )}
                  loading="lazy"
                />
              </div>

              <Button
                color="white"
                size="xs"
                title={intl.formatMessage(messages.view_next)}
                onClick={() => {
                  setViewIndex(
                    viewIndex + 1 < items.length ? viewIndex + 1 : 0,
                  );
                }}
                className="next"
              >
                <Icon color="" icon="it-arrow-right" padding={false} />
              </Button>
            </div>
          </ModalBody>
        </>
      )}
    </Modal>
  ) : null;
};

export default GalleryPreview;

GalleryPreview.propTypes = {
  id: PropTypes.string,
  viewIndex: PropTypes.number,
  setViewIndex: PropTypes.func,
  items: PropTypes.array,
};
