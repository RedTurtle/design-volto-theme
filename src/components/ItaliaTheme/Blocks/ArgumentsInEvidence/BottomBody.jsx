import React from 'react';
import { defineMessages } from 'react-intl';
import { UniversalLink, ConditionalLink } from '@plone/volto/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const messages = defineMessages({
  view_all: {
    id: 'view_all',
    defaultMessage: 'Vedi tutti',
  },
  otherArguments: {
    id: 'otherArguments',
    defaultMessage: 'ALTRI ARGOMENTI',
  },
});

const BottomBody = ({ data, intl, designReactKit }) => {
  const { Chip, ChipLabel, Button, Container } = designReactKit;

  return data?.arguments?.length > 0 ? (
    <Container className="text-center">
      <div className="row d-lg-inline-flex pt-5">
        <div className="col-lg-3">
          <h6 className="text-uppercase text-center mt-1">
            {intl?.formatMessage(messages.otherArguments)}
          </h6>
        </div>
        <div className="col-lg-9 text-left">
          {data?.arguments?.map((argument, index) => (
            <Chip
              color="primary"
              disabled={false}
              large
              simple
              tag={ConditionalLink}
              condition={!!argument['@id']}
              item={argument}
              key={index}
              title={argument.title}
              className="mr-2 text-decoration-none"
            >
              <ChipLabel tag="span">{argument.title}</ChipLabel>
            </Chip>
          ))}
        </div>
      </div>

      <div className="link-button mt-5">
        <Button
          color="primary"
          icon={false}
          tag={UniversalLink}
          href="/argomenti"
          className="view-all text-decoration-none"
        >
          {intl?.formatMessage(messages.view_all)}
        </Button>
      </div>
    </Container>
  ) : null;
};
export default injectLazyLibs(['designReactKit'])(BottomBody);
