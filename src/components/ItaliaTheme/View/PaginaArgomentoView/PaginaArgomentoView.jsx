/**
 * PaginaArgomentoView view component.
 * @module components/theme/View/PaginaArgomentoView/PaginaArgomentoView
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Portal } from 'react-portal';
import cx from 'classnames';

import { UniversalLink } from '@plone/volto/components';
import {
  Card,
  CardBody,
  CardText,
} from 'design-react-kit/dist/design-react-kit';
import Image from '@plone/volto/components/theme/Image/Image';
import {
  BodyClass,
  flattenToAppURL,
  hasBlocksData,
} from '@plone/volto/helpers';
import { getContent, resetContent } from '@plone/volto/actions';
import {
  CardCategory,
  Breadcrumbs,
} from 'design-volto-theme/components/ItaliaTheme';
import {
  ArgumentIcon,
  PaginaArgomentoPlaceholderAfterContent,
  PaginaArgomentoPlaceholderAfterRelatedItems,
  TextOrBlocks,
  RichText,
  PaginaArgomentoViewNoBlocks,
  RelatedItems,
  RelatedItemInEvidence,
  richTextHasContent,
} from 'design-volto-theme/components/ItaliaTheme/View';

/**
 * PaginaArgomentoView view component class.
 * @function PaginaArgomentoView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */

const PaginaArgomentoView = ({ content }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchResults = useSelector((state) => state.content?.subrequests);

  // one request is made for every 'unita_amministrative_responsabili' selected
  useEffect(() => {
    if (content?.unita_amministrative_responsabili?.length > 0) {
      content.unita_amministrative_responsabili.forEach((x) => {
        const url = flattenToAppURL(x['@id']);
        const loaded =
          searchResults?.[url]?.loading || searchResults?.[url]?.loaded;
        if (!loaded) {
          dispatch(getContent(url, null, url));
        }
      });
    }

    return () => {
      if (content?.unita_amministrative_responsabili?.length > 0) {
        content.unita_amministrative_responsabili.forEach((x) => {
          dispatch(resetContent(x['@id']));
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const rightHeaderHasContent =
    richTextHasContent(content.ulteriori_informazioni) ||
    content?.unita_amministrative_responsabili?.length > 0;

  return hasBlocksData(content) ? (
    <div id="page-document">
      <div className="ui container px-4">
        <div className="ArgomentoTitleWrapper rounded shadow mt-5  mb-5">
          <div
            className={cx('title-description-wrapper', {
              'col-lg-6': rightHeaderHasContent,
              'col-lg-12': !rightHeaderHasContent,
            })}
          >
            <Breadcrumbs pathname={location.pathname} />

            <ArgumentIcon icon={content.icona} />
            <h1 className="mb-3">{content?.title}</h1>
            <p className="description">{content?.description}</p>
          </div>
          {rightHeaderHasContent && (
            <div className="col-lg-4 offset-lg-2">
              <RichText
                serif={false}
                content={content.ulteriori_informazioni}
              />

              {content?.unita_amministrative_responsabili?.length > 0 &&
                content?.unita_amministrative_responsabili?.map((u, index) => {
                  return (
                    <div className="row mb-3" key={index}>
                      <div className="w-100">
                        <Card
                          className={'listing-item card-bg border-left-card'}
                        >
                          <div className="d-flex">
                            <CardBody className="">
                              <CardCategory>
                                <span className="text font-weight-bold">
                                  <UniversalLink
                                    href={flattenToAppURL(u['@id'])}
                                  >
                                    {u.title || u.id}
                                  </UniversalLink>
                                </span>
                              </CardCategory>
                              <CardText>
                                {searchResults[u['@id']]?.data?.street}
                              </CardText>
                            </CardBody>
                            {searchResults[u['@id']]?.data?.image && (
                              <div className="image-container mr-3">
                                <Image
                                  image={searchResults[u['@id']].data?.image}
                                  alt={
                                    searchResults[u['@id'].data?.image_caption]
                                  }
                                  title={
                                    searchResults[u['@id'].data?.image_caption]
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </Card>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {content?.image && (
            <>
              <Portal
                node={
                  __CLIENT__ && document.getElementById('portal-header-image')
                }
              >
                <div>
                  <Image
                    image={content.image}
                    alt={content.caption ?? content.title}
                    title={content.caption ?? content.title}
                    key={content.image.download}
                  />
                </div>
              </Portal>
              <BodyClass className="has-image" />
            </>
          )}
        </div>

        <TextOrBlocks content={content} />

        <PaginaArgomentoPlaceholderAfterContent content={content} />
      </div>
      <RelatedItems content={content} />
      <RelatedItemInEvidence content={content} />
      <PaginaArgomentoPlaceholderAfterRelatedItems content={content} />
    </div>
  ) : (
    <PaginaArgomentoViewNoBlocks content={content} />
  );
};

export default PaginaArgomentoView;
