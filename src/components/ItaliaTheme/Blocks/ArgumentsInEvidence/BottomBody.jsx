import React from 'react'
import { defineMessages } from 'react-intl'
import { Link } from 'react-router-dom';
import {
  Chip,
  ChipLabel,
  Button
} from 'design-react-kit/dist/design-react-kit';
import { flattenToAppURL } from '@plone/volto/helpers';

const messages = defineMessages({
  view_all: {
    id: 'view_all',
    defaultMessage: 'Vedi tutti',
  },
  otherArguments: {
    id: 'otherArguments',
    defaultMessage: 'ALTRI ARGOMENTI',
  }
})

const BottomBody = ({data, intl}) => {
  return (
    <>
      <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-3 pt-5">
        <div className="row d-lg-inline-flex w-100">
          <div className="col-lg-3">
            <h6 className="text-uppercase text-center mt-1">{intl?.formatMessage(messages.otherArguments)}</h6>
          </div>
          <div className="col-lg-9">
            {
              data?.arguments?.map((argument, index) => (
                <Link
                  to={flattenToAppURL(argument['@id'])}
                  key={index}
                  title={argument.title}
                  className="text-decoration-none"
                >
                  <Chip
                    color="primary"
                    disabled={false}
                    large
                    simple
                    tag="div"
                    className="mr-2"
                  >
                    <ChipLabel tag="span">
                      {argument.title}
                    </ChipLabel>
                  </Chip>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
      <div className="link-button mt-5">
        <Link
          to={'/argomenti'}
          className="text-decoration-none">
          <Button
            color="primary"
            className="view-all"
            icon={false}
            tag="button"
          >
            {intl?.formatMessage(messages.view_all)}
          </Button>
        </Link>
      </div>
    </>
  )
}
export default BottomBody;