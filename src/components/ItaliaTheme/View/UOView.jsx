/**
 * UOView view component.
 * @module components/theme/View/UOView
 */

import React, { createRef, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';
import PropTypes from 'prop-types';
import {
  WideImage,
  SideMenu,
  PageHeader,
  RichTextArticle,
  RichText,
  OfficeCard,
  Attachments,
  Metadata,
  RelatedNewsArticles,
  HelpBox,
  UOLocation,
  RelatedArticles,
} from '@italia/components/ItaliaTheme/View';

import { Chip, ChipLabel } from 'design-react-kit/dist/design-react-kit';

const messages = defineMessages({
  tipologia_organizzazione: {
    id: 'tipologia_organizzazione',
    defaultMessage: 'Tipologia organizzazione',
  },
  legami_altre_strutture: {
    id: 'legami_altre_strutture',
    defaultMessage: 'Legami con altre strutture',
  },
  assessore_riferimento: {
    id: 'assessore_riferimento',
    defaultMessage: 'Assessore di riferimento',
  },
  responsabile: {
    id: 'responsabile',
    defaultMessage: 'Responsabile',
  },
  persone_struttura: {
    id: 'persone_struttura',
    defaultMessage: 'Persone che compongono la struttura',
  },
  persone_contatto: {
    id: 'persone_contatto',
    defaultMessage: 'Persone da contattare',
  },
  uo_related_news: {
    id: 'uo_related_news',
    defaultMessage: 'Notizie in evidenza',
  },
  servizi_offerti: {
    id: 'servizi_offerti',
    defaultMessage: 'Servizi offerti',
  },
  related_items: {
    id: 'related_items',
    defaultMessage: 'Contenuti correlati',
  },
  orario_pubblico: {
    id: 'orario_pubblico',
    defaultMessage: 'Orario per il pubblico',
  },
  email_sede: {
    id: 'email_sede',
    defaultMessage: 'Email:',
  },
  pec_sede: {
    id: 'pec_sede',
    defaultMessage: 'PEC:',
  },
  telefono_sede: {
    id: 'telefono_sede',
    defaultMessage: 'Telefono:',
  },
});

/**
 * UOView view component class.
 * @function NewsItemView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const UOView = ({ content }) => {
  const intl = useIntl();
  let documentBody = createRef();
  const [sideMenuElements, setSideMenuElements] = useState(null);

  useEffect(() => {
    if (documentBody.current) {
      if (__CLIENT__) {
        setSideMenuElements(documentBody.current);
      }
    }
  }, [documentBody]);

  return (
    <>
      <div className="container px-4 my-4 uo-view">
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          imageinheader={false}
          imageinheader_field={null}
          showdates={false}
          showtassonomiaargomenti={true}
        />
        {content.image && (
          <WideImage
            title={content.title}
            image={content.image}
            caption={null}
          />
        )}
        <div className="row border-top row-column-border row-column-menu-left">
          <aside className="col-lg-4">
            {__CLIENT__ && <SideMenu data={sideMenuElements} />}
          </aside>
          <section
            ref={documentBody}
            className="col-lg-8 it-page-sections-container"
          >
            {content.sedi?.length > 0 ||
            content?.contact_info?.data.replace(/(<([^>]+)>)/g, '') ||
            content?.geolocation?.latitude ||
            content?.geolocation?.longitude ? (
              <UOLocation
                sedi={content?.sedi}
                contact_info={content?.contact_info}
                geolocation={content.geolocation}
                street={content.street}
                zip_code={content.zip_code}
                city={content.city}
                country={content.country}
              />
            ) : (
              ''
            )}
            {content.orario_pubblico_sede?.data.replace(/(<([^>]+)>)/g, '') && (
              <RichText
                content={content.orario_pubblico_sede?.data}
                tag_id={'orario_pubblico_sede'}
                add_class={'orario-pubblico'}
                title_size={'h6'}
                title={intl.formatMessage(messages.orario_pubblico)}
              />
            )}
            {content.riferimento_telefonico_sede ? (
              <>
                {content.riferimento_telefonico_sede ? (
                  <p className="text-serif contatti">
                    {intl.formatMessage(messages.telefono_sede)}
                    <a href={`tel:${content.riferimento_telefonico_sede}`}>
                      {content.riferimento_telefonico_sede}
                    </a>
                  </p>
                ) : (
                  ''
                )}
                {content.riferimento_email_sede ? (
                  <p className="text-serif contatti">
                    {intl.formatMessage(messages.email_sede)}
                    <a href={`mailto:${content.riferimento_email_sede}`}>
                      {content.riferimento_email_sede}
                    </a>
                  </p>
                ) : (
                  ''
                )}
                {content.riferimento_pec_sede ? (
                  <p className="text-serif contatti">
                    {intl.formatMessage(messages.pec_sede)}
                    <a href={`mailto:${content.riferimento_pec_sede}`}>
                      {content.riferimento_pec_sede}
                    </a>
                  </p>
                ) : (
                  ''
                )}
                {content.persone_contatto?.length > 0 && (
                  <>
                    <h6 className="text-serif font-weight-bold mt-4">
                      {intl.formatMessage(messages.persone_contatto)}
                    </h6>
                    {content.persone_contatto?.map((item, i) => (
                      <Link
                        to={flattenToAppURL(item['@id'])}
                        key={item['@id']}
                        title={item.title}
                        className="text-decoration-none mr-2"
                      >
                        <Chip
                          color="primary"
                          disabled={false}
                          large={false}
                          simple
                          tag="div"
                        >
                          <ChipLabel tag="span">{item.title}</ChipLabel>
                        </Chip>
                      </Link>
                    ))}
                  </>
                )}
              </>
            ) : (
              ''
            )}

            {content.tipologia_organizzazione && (
              <article
                id="organizzazione"
                className="it-page-section anchor-offset mt-5"
              >
                <h4 id="header-organizzazione" className="mb-3">
                  {intl.formatMessage(messages.tipologia_organizzazione)}
                </h4>
                <p className="text-serif">
                  {` ${content.tipologia_organizzazione.title}`}
                </p>
              </article>
            )}
            {content.competenze?.data.replace(/(<([^>]+)>)/g, '') && (
              <RichTextArticle
                content={content.competenze?.data}
                tag_id={'competenze'}
                title={'Competenze'}
              />
            )}
            {content.servizi_offerti.length > 0 ? (
              <RelatedArticles
                id="related-services"
                items={content.servizi_offerti}
                title={intl.formatMessage(messages.servizi_offerti)}
              />
            ) : null}
            {content.legami_con_altre_strutture.length > 0 ? (
              <article
                id="legami-altre-strutture"
                className="it-page-section anchor-offset mt-5"
              >
                <h4 id="header-legami-altre-strutture">
                  {intl.formatMessage(messages.legami_altre_strutture)}
                </h4>
                <div class="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal mb-3">
                  {content.legami_con_altre_strutture.map((item, i) => (
                    <OfficeCard key={item['@id']} office={item} />
                  ))}
                </div>
              </article>
            ) : null}
            {content.assessore_riferimento?.length > 0 ? (
              <article
                id="assessore-riferimento"
                className="it-page-section anchor-offset mt-5"
              >
                <h4 id="header-assessore-riferimento">
                  {intl.formatMessage(messages.assessore_riferimento)}
                </h4>
                {content.assessore_riferimento.map((item, i) => (
                  <Link
                    to={flattenToAppURL(item['@id'])}
                    key={item['@id']}
                    title={item.title}
                    className="text-decoration-none mr-2"
                  >
                    <Chip
                      color="primary"
                      disabled={false}
                      large={false}
                      simple
                      tag="div"
                    >
                      <ChipLabel tag="span">{item.title}</ChipLabel>
                    </Chip>
                  </Link>
                ))}
              </article>
            ) : null}
            {content.responsabile?.length > 0 ? (
              <article
                id="responsabile"
                className="it-page-section anchor-offset mt-5"
              >
                <h4 id="header-responsabile">
                  {intl.formatMessage(messages.responsabile)}
                </h4>
                {content.responsabile.map((item, i) => (
                  <Link
                    to={flattenToAppURL(item['@id'])}
                    key={item['@id']}
                    title={item.title}
                    className="text-decoration-none  mr-2"
                  >
                    <Chip
                      color="primary"
                      disabled={false}
                      large={false}
                      simple
                      tag="div"
                    >
                      <ChipLabel tag="span">{item.title}</ChipLabel>
                    </Chip>
                  </Link>
                ))}
              </article>
            ) : null}
            {content.persone_struttura.length > 0 ? (
              <article
                id="persone-struttura"
                className="it-page-section anchor-offset mt-5"
              >
                <h4 id="header-persone-struttura">
                  {intl.formatMessage(messages.persone_struttura)}
                </h4>
                {content.persone_struttura.map((item, i) => (
                  <Link
                    to={flattenToAppURL(item['@id'])}
                    key={item['@id']}
                    title={item.title}
                    className="text-decoration-none mr-2"
                  >
                    <Chip
                      color="primary"
                      disabled={false}
                      large={false}
                      simple
                      tag="div"
                    >
                      <ChipLabel tag="span">{item.title}</ChipLabel>
                    </Chip>
                  </Link>
                ))}
              </article>
            ) : null}
            {content?.items?.some((e) => e.id === 'allegati') && (
              <Attachments content={content} folder_name={'allegati'} />
            )}

            {content?.related_news?.length > 0 ? (
              <RelatedNewsArticles
                news={content?.related_news}
                title={intl.formatMessage(messages.uo_related_news)}
              />
            ) : null}
            {content.relatedItems.length > 0 ? (
              <RelatedArticles
                id="related-items"
                items={content?.relatedItems}
                title={intl.formatMessage(messages.related_items)}
                showimage={false}
              />
            ) : null}

            <Metadata content={content} showTags={false}>
              {content.ulteriori_informazioni?.data?.replace(
                /(<([^>]+)>)/g,
                '',
              ) && <HelpBox text={content.ulteriori_informazioni} />}
            </Metadata>
          </section>
        </div>
      </div>
    </>
  );
};

export default UOView;

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
    }).isRequired,
    title: PropTypes.string.isRequired,
  }),
};
