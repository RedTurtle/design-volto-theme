/**
 * UOView view component.
 * @module components/theme/View/UOView
 */

import React, { createRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
  PageHeader,
  UOServices,
  RelatedItems,
  SideMenu,
  ContentImage,
  UOPlaceholderAfterContent,
  UOPlaceholderAfterRelatedItems,
  UOPeople,
  UOStructure,
  UOContacts,
  UODocuments,
  UOWhatDoesItDo,
  UOMoreInfos,
  RelatedItemInEvidence,
  SkipToMainContent,
  ContentTypeViewSections,
} from 'design-volto-theme/components/ItaliaTheme/View';

export const UOViewSectionsOrder = [
  {
    /* HEADER IMAGE */

    component: ContentImage,
    props: { position: 'documentBody' },
  },

  { /*** COSA FA ***/ component: UOWhatDoesItDo },

  { /*** STRUTTURA ***/ component: UOStructure },

  { /*** PERSONE ***/ component: UOPeople },

  { /*** SERVIZI ***/ component: UOServices },

  { /*** CONTATTI ***/ component: UOContacts },

  { /* DOCUMENTI */ component: UODocuments },

  { /* ULTERIORI INFORMAZIONI */ component: UOMoreInfos },
];

/**
 * UOView view component class.
 * @function UOView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const UOView = ({ content }) => {
  let documentBody = createRef();
  const [sideMenuElements, setSideMenuElements] = useState(null);

  useEffect(() => {
    if (documentBody.current && __CLIENT__) {
      setSideMenuElements(documentBody.current);
    }
  }, [documentBody]);

  return (
    <>
      <div className="container px-4 my-4 uo-view">
        <SkipToMainContent />
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          showdates={false}
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
              defaultSections={UOViewSectionsOrder}
            />
          </section>
        </div>
      </div>
      <UOPlaceholderAfterContent content={content} />
      <RelatedItems content={content} list={content?.related_news ?? []} />
      <RelatedItemInEvidence content={content} />
      <UOPlaceholderAfterRelatedItems content={content} />
    </>
  );
};

UOView.propTypes = {
  content: PropTypes.shape({
    assessore_riferimento: PropTypes.array,
    ulteriori_informazioni: PropTypes.shape({
      data: PropTypes.string,
    }),
    competenze: PropTypes.shape({
      data: PropTypes.string,
    }),
    description: PropTypes.string,
    geolocation: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    immagine: PropTypes.shape({
      download: PropTypes.string,
    }),
    legami_con_altre_strutture: PropTypes.array,
    related_news: PropTypes.array,
    persone_struttura: PropTypes.array,
    responsabile: PropTypes.array,
    sedi: PropTypes.array,
    contact_info: PropTypes.shape({
      data: PropTypes.string,
    }),
    servizi_offerti: PropTypes.array,
    tassonomia_argomenti: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        token: PropTypes.string,
      }),
    ),
    tipologia_organizzazione: PropTypes.shape({
      title: PropTypes.string,
      token: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
  }),
};

export default UOView;
