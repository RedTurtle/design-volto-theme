/**
 * UOView view component.
 * @module components/theme/View/UOView
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { WideImage } from './Commons';
import { SideMenu } from './Commons';
import { PageHeader } from './Commons';
import { RichTextArticle } from './Commons';
import { OfficeCard } from './Commons';
import { Attachments } from './Commons';
import { Metadata } from './Commons';

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
    defaultMessage: 'Reposanbile',
  },
  persone_struttura: {
    id: 'persone_struttura',
    defaultMessage: 'Persone che compongono la struttura',
  },
  ulteriori_informazioni: {
    id: 'ulteriori_informazioni',
    defaultMessage: 'Ulteriori informazioni',
  },
  box_aiuto: {
    id: 'box_aiuto',
    defaultMessage: "Box d'aiuto",
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
  return (
    <>
      <div className="container px-4 my-4 newsitem-view">
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          showdates={false}
          showtassonomiaargomenti={true}
        />
        {content.immagine && (
          <WideImage
            title={content.title}
            image={content.immagine}
            caption={null}
          />
        )}
        <div className="row border-top row-column-border row-column-menu-left">
          <aside className="col-lg-4">
            <SideMenu />
          </aside>
          <section className="col-lg-8 it-page-sections-container">
            {content.tipologia_organizzazione && (
              <>
                <h4 className="mb-3">
                  {intl.formatMessage(messages.tipologia_organizzazione)}
                </h4>
                <p>{content.tipologia_organizzazione.title}</p>
              </>
            )}
            {content.competenze.data && (
              <RichTextArticle
                content={content.competenze.data}
                tag_id={'competenze'}
                title={'Competenze'}
              />
            )}
            {content.legami_con_altre_strutture && (
              <article
                id="legami-altre-strutture"
                className="it-page-section anchor-offset mt-5"
              >
                <h4>{intl.formatMessage(messages.legami_altre_strutture)}</h4>
                {content.legami_con_altre_strutture.map((item, i) => (
                  <OfficeCard key={i} office={item} content={content} />
                ))}
              </article>
            )}
            {content.assessore_riferimento && (
              <article
                id="assessore-riferimento"
                className="it-page-section anchor-offset mt-5"
              >
                <h4>{intl.formatMessage(messages.assessore_riferimento)}</h4>
                {content.assessore_riferimento.map((item, i) => (
                  <a key={i} href={item['@id']}>
                    <div className="chip chip-simple chip-primary">
                      <span className="chip-label">{item.title}</span>
                    </div>
                  </a>
                ))}
              </article>
            )}
            {content.responsabile && (
              <article
                id="assessore-responsabile"
                className="it-page-section anchor-offset mt-5"
              >
                <h4>{intl.formatMessage(messages.responsabile)}</h4>
                {content.responsabile.map((item, i) => (
                  <a key={i} href={item['@id']}>
                    <div className="chip chip-simple chip-primary">
                      <span className="chip-label">{item.title}</span>
                    </div>
                  </a>
                ))}
              </article>
            )}
            {content.responsabile && (
              <article
                id="persone-struttura"
                className="it-page-section anchor-offset mt-5"
              >
                <h4>{intl.formatMessage(messages.persone_struttura)}</h4>
                {content.persone_struttura.map((item, i) => (
                  <a key={i} href={item['@id']}>
                    <div className="chip chip-simple chip-primary">
                      <span className="chip-label">{item.title}</span>
                    </div>
                  </a>
                ))}
              </article>
            )}
            {content?.items.some(e => e.id === 'allegati') && (
              <Attachments content={content} folder_name={'allegati'} />
            )}
            {content.ulteriori_informazioni && (
              <RichTextArticle
                content={content.ulteriori_informazioni.data}
                tag_id="ulteriori_informazioni"
                title={intl.formatMessage(messages.ulteriori_informazioni)}
              />
            )}
            {content.box_aiuto && (
              <RichTextArticle
                content={content.box_aiuto.data}
                tag_id="box_aiuto"
                title={intl.formatMessage(messages.box_aiuto)}
              />
            )}
            <Metadata />
          </section>
        </div>
      </div>
    </>
  );
};

export default UOView;
