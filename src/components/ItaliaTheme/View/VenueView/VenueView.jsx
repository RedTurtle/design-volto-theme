/**
 * VenueView view component.
 * @module components/theme/View/VenueView
 */

import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  SideMenu,
  PageHeader,
  ContentImage,
  RelatedItems,
  VenuePlaceholderAfterContent,
  VenuePlaceholderAfterRelatedItems,
  RelatedItemInEvidence,
  SkipToMainContent,
  VenueDescription,
  VenueServices,
  VenueAccessMode,
  VenueWhere,
  VenuePublicTimetable,
  VenueContacts,
  VenueMoreInfos,
  ContentTypeViewSections,
} from '@italia/components/ItaliaTheme/View';

export const VenueViewSectionsOrder = [
  {
    /* HEADER IMAGE */

    component: ContentImage,
    props: { position: 'documentBody' },
  },

  { /* DESCRIZIONE */ component: VenueDescription },

  { /* SERVIZI CORRELATI */ component: VenueServices },

  { /* MODALITA DI ACCESSO */ component: VenueAccessMode },

  { /* MAPPA */ component: VenueWhere },

  { /* ORARIO AL PUBBLICO */ component: VenuePublicTimetable },

  { /* CONTATTI */ component: VenueContacts },

  { /* ULTERIORI INFORMAZIONI */ component: VenueMoreInfos },
];

/**
 * VenueView view component class.
 * @function VenueView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const VenueView = ({ content }) => {
  let documentBody = createRef();
  const [sideMenuElements, setSideMenuElements] = useState(null);

  useEffect(() => {
    if (documentBody.current) {
      if (__CLIENT__) {
        setSideMenuElements(documentBody.current);
      }
    }
  }, [documentBody]);

  useEffect(() => {
    if (
      content.nome_alternativo &&
      !content.title?.includes(content.nome_alternativo)
    ) {
      content.subtitle = content.nome_alternativo;
    }
  });

  return (
    <>
      <div className="container px-4 my-4 luogo-view">
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
            className="col-lg-8 it-page-sections-container"
            id="main-content-section"
            ref={documentBody}
          >
            {/* SEZIONI */}
            <ContentTypeViewSections
              content={content}
              defaultSections={VenueViewSectionsOrder}
            />
          </section>
        </div>
      </div>
      <VenuePlaceholderAfterContent content={content} />
      <RelatedItems
        list={[
          ...(content.relatedItems ?? []),
          ...(content.related_news ?? []),
        ]}
      />
      <RelatedItemInEvidence content={content} />
      <VenuePlaceholderAfterRelatedItems content={content} />
    </>
  );
};
VenueView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    orario_pubblico: PropTypes.object,
    elementi_di_interesse: PropTypes.object,
    circoscrizione: PropTypes.string,
    quartiere: PropTypes.string,
    modalita_accesso: PropTypes.object,
    venue_services: PropTypes.array,
    ulteriori_informazioni: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};
export default VenueView;
