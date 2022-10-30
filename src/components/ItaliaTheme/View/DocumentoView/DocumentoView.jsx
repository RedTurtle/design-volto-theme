/**
 * DocumentoView view component.
 * @module components/theme/View/DocumentoView
 */

import React, { useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  DocumentoDescrizione,
  DocumentoDocumenti,
  DocumentoPlaceholderAfterContent,
  DocumentoPlaceholderAfterRelatedItems,
  DocumentoUfficioResponsabile,
  DocumentoAreaResponsabile,
  DocumentoAccedereServizio,
  DocumentoDocAllegati,
  DocumentoUlterioriInformazioni,
  ContentImage,
  SideMenu,
  PageHeader,
  RelatedItems,
  RelatedItemInEvidence,
  SkipToMainContent,
  ContentTypeViewSections,
} from 'design-volto-theme/components/ItaliaTheme/View';

export const DocumentoViewSectionsOrder = [
  {
    /* HEADER IMAGE */
    component: ContentImage,
    props: { position: 'documentBody' },
  },
  { /* DESCRIZIONE*/ component: DocumentoDescrizione },
  { /* DOCUMENTI */ component: DocumentoDocumenti },
  { /* UFFICIO RESPONSABILE */ component: DocumentoUfficioResponsabile },
  { /* AREA RESPONSABILE */ component: DocumentoAreaResponsabile },
  { /* ACCEDERE AL SERVIZIO */ component: DocumentoAccedereServizio },
  { /* DOCUMENTI ALLEGATI */ component: DocumentoDocAllegati },
  { /* ULTERIORI INFORMAZIONI */ component: DocumentoUlterioriInformazioni },
];

/**
 * DocumentoView view component class.
 * @function DocumentoView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const DocumentoView = ({ content, location }) => {
  let documentBody = createRef();
  const [sideMenuElements, setSideMenuElements] = useState(null);
  //const userLogged = useSelector((state) => state.userSession);

  useEffect(() => {
    if (documentBody.current) {
      if (__CLIENT__) {
        setSideMenuElements(documentBody.current);
      }
    }
  }, [documentBody]);

  return (
    <>
      <div className="container px-4 my-4 newsitem-view">
        <SkipToMainContent />
        <PageHeader
          content={content}
          readingtime={null}
          showtassonomiaargomenti={true}
        />

        {/* HEADER IMAGE */}
        <ContentImage content={content} position="afterHeader" />

        <div className="row border-top row-column-border row-column-menu-left">
          <aside className="col-lg-4">
            {__CLIENT__ && (
              <SideMenu data={sideMenuElements} content_uid={content?.UID} />
            )}
          </aside>
          <section
            ref={documentBody}
            id="main-content-section"
            className="col-lg-8 it-page-sections-container"
          >
            {/* SEZIONI */}
            <ContentTypeViewSections
              content={content}
              defaultSections={DocumentoViewSectionsOrder}
            />
          </section>
        </div>
      </div>
      <DocumentoPlaceholderAfterContent content={content} />
      <RelatedItems content={content} />
      <RelatedItemInEvidence content={content} />
      <DocumentoPlaceholderAfterRelatedItems content={content} />
    </>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DocumentoView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.object,
    image_caption: PropTypes.string,
    items: PropTypes.array,
    modified: PropTypes.string,
    tassonomia_argomenti: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        token: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default DocumentoView;
