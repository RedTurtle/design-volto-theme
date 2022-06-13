import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { getCalendarDayResults } from '@italia/actions';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { viewDate } from '@italia/helpers';

const messages = defineMessages({
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

const Item = ({
  day,
  path,
  query,
  inEditMode,
  moment: Moment,
  designReactKit,
}) => {
  const intl = useIntl();
  const moment = Moment.default;
  moment.locale(intl.locale);

  const { Spinner } = designReactKit;

  const calendarDayResults = useSelector(
    (state) => state.calendarDaySearch.subrequests,
  );
  const dispatch = useDispatch();

  const _day = viewDate(intl.locale, moment, day);
  const dayStart = _day.startOf('day').format('YYYY/MM/DD HH:mm');
  const dayEnd = _day.endOf('day').format('YYYY/MM/DD HH:mm');

  useDeepCompareEffect(() => {
    dispatch(
      getCalendarDayResults(
        path,
        {
          ...query,
          query: [
            ...query.query,
            {
              i: 'start',
              o: 'plone.app.querystring.operation.date.between',
              v: [dayStart, dayEnd],
            },
          ],
        },
        day,
      ),
    );
  }, [dayStart, dayEnd, query, day, dispatch, path]);

  return (
    <div>
      <div className="pl-3">
        <div className={cx('day', { 'mb-3': inEditMode })}>
          {_day.format('DD')}
        </div>
        <div className="day-week">{_day.format('ddd')}</div>
      </div>
      <div>
        <hr />
        {calendarDayResults[day] ? (
          calendarDayResults[day].items[day]?.map((item, index) => (
            <div key={index} className="calendar-item">
              <div className="pl-3">
                <div>{item?.type}</div>
                <span className="calendar-type">
                  <ConditionalLink
                    condition={!inEditMode}
                    href={flattenToAppURL(item['@id'] || '')}
                  >
                    {item.title}
                  </ConditionalLink>
                </span>

                {item.scadenza_domande_bando &&
                  _day.diff(item.scadenza_domande_bando, 'day') === 0 && (
                    <div className="scadenza_message">
                      {intl.formatMessage(messages.scadenza_domande_bando)}
                    </div>
                  )}
                {item.scadenza_bando &&
                  _day.diff(item.scadenza_bando, 'day') === 0 && (
                    <div className="scadenza_message">
                      {intl.formatMessage(messages.scadenza_bando)}
                    </div>
                  )}
                {item.chiusura_procedimento_bando &&
                  _day.diff(item.chiusura_procedimento_bando, 'day') === 0 && (
                    <div className="scadenza_message">
                      {intl.formatMessage(messages.chiusura_procedimento_bando)}
                    </div>
                  )}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <Spinner active />
          </div>
        )}
      </div>
    </div>
  );
};

export default injectLazyLibs(['moment', 'designReactKit'])(Item);
