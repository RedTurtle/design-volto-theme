import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'design-react-kit/dist/design-react-kit';
import { Icon } from 'design-volto-theme/components/ItaliaTheme';

import {
  richTextHasContent,
  RichTextArticle,
  RichText,
  GenericCard,
  ContactLink,
} from 'design-volto-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  contatti: {
    id: 'contatti',
    defaultMessage: 'Contatti',
  },
  riferimento_telefonico_luogo: {
    id: 'riferimento_telefonico_luogo',
    defaultMessage: 'Telefono',
  },
  riferimento_fax_luogo: {
    id: 'riferimento_fax_luogo',
    defaultMessage: 'Fax',
  },
  riferimento_mail_luogo: {
    id: 'riferimento_mail_luogo',
    defaultMessage: 'E-mail',
  },
  riferimento_pec_luogo: {
    id: 'riferimento_pec_luogo',
    defaultMessage: 'PEC',
  },
  riferimento_web: {
    id: 'riferimento_web',
    defaultMessage: 'Web',
  },
  struttura_responsabile: {
    id: 'struttura_responsabile',
    defaultMessage: 'Struttura responsabile',
  },
  riferimento_telefonico_struttura: {
    id: 'riferimento_telefonico_struttura',
    defaultMessage: 'Telefono',
  },
  riferimento_fax_struttura: {
    id: 'riferimento_fax_struttura',
    defaultMessage: 'Fax',
  },
  riferimento_mail_struttura: {
    id: 'riferimento_mail_struttura',
    defaultMessage: 'E-mail',
  },
  riferimento_pec_struttura: {
    id: 'pec',
    defaultMessage: 'PEC',
  },
});

const VenueContacts = ({ content }) => {
  const intl = useIntl();

  return content?.telefono ||
    content?.email ||
    content?.pec ||
    content?.web ||
    content?.struttura_responsabile_correlati?.length > 0 ||
    richTextHasContent(content?.struttura_responsabile) ||
    content?.riferimento_telefonico_struttura ||
    content?.riferimento_fax_struttura ||
    content?.riferimento_mail_struttura ||
    content?.riferimento_pec_struttura ? (
    <RichTextArticle
      tag_id="contatti"
      title={intl.formatMessage(messages.contatti)}
    >
      {/* CONTATTI LUOGO */}
      {(content?.telefono ||
        content?.email ||
        content?.fax ||
        content?.pec ||
        content?.web) && (
        <Card
          className="card card-teaser rounded shadow mt-3 mb-3"
          noWrapper={true}
          tag="div"
        >
          <CardTitle tag="h5">
            <Icon icon="it-telephone" padding={true} />
          </CardTitle>
          <CardBody tag="div" className={'card-body pr-3'}>
            {content.telefono && (
              <p className="card-text mt-3">
                {intl.formatMessage(messages.riferimento_telefonico_luogo)}
                : <ContactLink tel={content.telefono} label={false} />
              </p>
            )}

            {content.fax && (
              <p className="card-text mt-3">
                {intl.formatMessage(messages.riferimento_fax_luogo)}
                : <ContactLink fax={content.fax} label={false} />
              </p>
            )}

            {content.email && (
              <p className="card-text mt-3">
                {intl.formatMessage(messages.riferimento_mail_luogo)}:{' '}
                <ContactLink email={content.email} label={false} />
              </p>
            )}

            {content.pec && (
              <p className="card-text mt-3">
                {intl.formatMessage(messages.riferimento_pec_luogo)}:{' '}
                <ContactLink email={content.pec} label={false} />
              </p>
            )}

            {content.web && (
              <p className="card-text mt-3">
                {intl.formatMessage(messages.riferimento_web)}:{' '}
                <a
                  href={
                    content.web.match(/^(http:\/\/|https:\/\/)/gm)
                      ? content.web
                      : `http://${content.web}`
                  }
                >
                  {content.web}
                </a>
              </p>
            )}
          </CardBody>
        </Card>
      )}
      {/*
    STRUTTURE RESPONSABILI
    Se è presente una struttura_responsabile_correlati metto quella altrimenti metto una card con i campi singoli, se presenti
  */}
      {(content?.struttura_responsabile_correlati?.length > 0 ||
        richTextHasContent(content?.struttura_responsabile) ||
        content?.riferimento_telefonico_struttura ||
        content?.riferimento_fax_struttura ||
        content?.riferimento_mail_struttura ||
        content?.riferimento_pec_struttura) && (
        <div className="mt-5 mb-5">
          <h5>{intl.formatMessage(messages.struttura_responsabile)}</h5>

          {content.struttura_responsabile_correlati?.length > 0 ? (
            //STRUTTURE RESPONSABILI CORRELATE
            <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
              {content?.struttura_responsabile_correlati?.map((item, i) => (
                <GenericCard key={item['@id']} item={item} />
              ))}
            </div>
          ) : (
            //STRUTTURA RESPONSABILE
            <>
              {(richTextHasContent(content.struttura_responsabile) ||
                content.riferimento_telefonico_struttura ||
                content.riferimento_fax_struttura ||
                content.riferimento_mail_struttura ||
                content.riferimento_pec_struttura) && (
                <Card className="genericcard card card-teaser shadow p-4 mt-3 rounded">
                  <CardBody>
                    {richTextHasContent(content.struttura_responsabile) && (
                      <CardTitle>
                        <h5 className="card-title">
                          <RichText content={content.struttura_responsabile} />
                        </h5>
                      </CardTitle>
                    )}
                    <CardText>
                      {content.riferimento_telefonico_struttura && (
                        <div>
                          <span className="font-weight-semibold">
                            {intl.formatMessage(
                              messages.riferimento_telefonico_struttura,
                            )}
                            :
                          </span>{' '}
                          <ContactLink
                            tel={content.riferimento_telefonico_struttura}
                            label={false}
                          />
                        </div>
                      )}
                      {content.riferimento_fax_struttura && (
                        <div className="mt-2">
                          <span className="font-weight-semibold">
                            {intl.formatMessage(
                              messages.riferimento_fax_struttura,
                            )}
                            :
                          </span>{' '}
                          <ContactLink
                            tel={content.riferimento_fax_struttura}
                            label={false}
                          />
                        </div>
                      )}
                      {content.riferimento_mail_struttura && (
                        <div className="mt-2">
                          <span className="font-weight-semibold">
                            {intl.formatMessage(
                              messages.riferimento_mail_struttura,
                            )}
                            :
                          </span>{' '}
                          <ContactLink
                            email={content.riferimento_mail_struttura}
                            label={false}
                          />
                        </div>
                      )}
                      {content.riferimento_pec_struttura && (
                        <div className="mt-2">
                          <span className="font-weight-semibold">
                            {intl.formatMessage(
                              messages.riferimento_pec_struttura,
                            )}
                            :
                          </span>{' '}
                          <ContactLink
                            email={content.riferimento_pec_struttura}
                            label={false}
                          />
                        </div>
                      )}
                    </CardText>
                  </CardBody>
                </Card>
              )}
            </>
          )}
        </div>
      )}
    </RichTextArticle>
  ) : (
    <></>
  );
};

export default VenueContacts;
