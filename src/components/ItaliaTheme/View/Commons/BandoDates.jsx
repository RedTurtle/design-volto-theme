import { defineMessages, useIntl } from 'react-intl';
import React from 'react';

import PropTypes from 'prop-types';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { viewDate } from '@italia/helpers';

const messages = defineMessages({
  effective: {
    id: 'bando_effective',
    defaultMessage: 'Data di pubblicazione',
  },
  scadenza_bando: {
    id: 'scadenza_bando',
    defaultMessage: 'Scadenza dei termini per partecipare al bando',
  },
  scadenza_domande_bando: {
    id: 'scadenza_domande_bando',
    defaultMessage: 'Termine per le richieste di chiarimenti',
  },
  chiusura_procedimento_bando: {
    id: 'chiusura_procedimento_bando',
    defaultMessage: 'Chiusura del procedimento',
  },
});

/**
 * BandoDates view component class.
 * @function BandoDates
 * @params {object} Dates: object.
 * @returns {string} Markup of the component.
 */
const BandoDates = ({ content, moment: Moment, designReactKit }) => {
  const intl = useIntl();
  const moment = Moment.default;
  moment.locale(intl.locale);

  const effective = content?.effective
    ? viewDate(intl.locale, moment, content.effective)
    : null;
  const scadenza_domande_bando = content?.scadenza_domande_bando
    ? viewDate(intl.locale, moment, content.scadenza_domande_bando)
    : null;

  const scadenza_bando = content?.scadenza_bando
    ? viewDate(intl.locale, moment, content.scadenza_bando)
    : null;

  const chiusura_procedimento_bando = content?.chiusura_procedimento_bando
    ? viewDate(intl.locale, moment, content.chiusura_procedimento_bando)
    : null;

  const { Card, CardTitle, CardBody } = designReactKit;

  return content ? (
    <>
      <div className="point-list-wrapper my-4 mb-5">
        {effective && (
          <div className="point-list">
            <div className="point-list-aside point-list-warning">
              <div className="point-date text-monospace">
                {effective.format('DD')}
              </div>
              <div className="point-month text-monospace">
                {effective.format('MMM')}/{effective.format('YY')}
              </div>
            </div>
            <div className="point-list-content">
              <Card
                className="card card-teaser rounded shadow"
                noWrapper={true}
                tag="div"
              >
                <CardBody tag="div" className={'card-body'}>
                  <CardTitle tag="h5">
                    {intl.formatMessage(messages.effective)}
                  </CardTitle>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {scadenza_domande_bando && (
          <div className="point-list">
            <div className="point-list-aside point-list-warning">
              <div className="point-date text-monospace">
                {scadenza_domande_bando.format('DD')}
              </div>
              <div className="point-month text-monospace">
                {scadenza_domande_bando.format('MMM')}/
                {scadenza_domande_bando.format('YY')}
              </div>
            </div>
            <div className="point-list-content">
              <Card
                className="card card-teaser rounded shadow"
                noWrapper={true}
                tag="div"
              >
                <CardBody tag="div" className={'card-body'}>
                  <CardTitle tag="h5">
                    {`${scadenza_domande_bando.format('HH:mm')} - `}
                    {intl.formatMessage(messages.scadenza_domande_bando)}
                  </CardTitle>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {scadenza_bando && (
          <div className="point-list">
            <div className="point-list-aside point-list-warning">
              <div className="point-date text-monospace">
                {scadenza_bando.format('DD')}
              </div>
              <div className="point-month text-monospace">
                {scadenza_bando.format('MMM')}/{scadenza_bando.format('YY')}
              </div>
            </div>
            <div className="point-list-content">
              <Card
                className="card card-teaser rounded shadow"
                noWrapper={true}
                tag="div"
              >
                <CardBody tag="div" className={'card-body'}>
                  <CardTitle tag="h5">
                    {`${scadenza_bando.format('HH:mm')} - `}
                    {intl.formatMessage(messages.scadenza_bando)}
                  </CardTitle>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {chiusura_procedimento_bando && (
          <div className="point-list">
            <div className="point-list-aside point-list-warning">
              <div className="point-date text-monospace">
                {chiusura_procedimento_bando.format('DD')}
              </div>
              <div className="point-month text-monospace">
                {chiusura_procedimento_bando.format('MMM')}/
                {chiusura_procedimento_bando.format('YY')}
              </div>
            </div>
            <div className="point-list-content">
              <Card
                className="card card-teaser rounded shadow"
                noWrapper={true}
                tag="div"
              >
                <CardBody tag="div" className={'card-body'}>
                  <CardTitle tag="h5">
                    {intl.formatMessage(messages.chiusura_procedimento_bando)}
                  </CardTitle>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  ) : null;
};

export default injectLazyLibs(['moment', 'designReactKit'])(BandoDates);

BandoDates.propTypes = {
  content: PropTypes.object.isRequired,
};
