import React, { useEffect } from 'react';
import { defineMessages } from 'react-intl';
import { TextEditorWidget } from '@italia/components/ItaliaTheme';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardReadMore,
} from 'design-react-kit/dist/design-react-kit';
import { settings } from '@italia/config';
import redraft from 'redraft';
import { getContent, resetContent } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';
import { ArgumentIcon } from '@italia/components/ItaliaTheme/View'

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Digita un testo…',
  },
  exploreArgument: {
    id: 'exploreArgument',
    defaultMessage: 'Esplora argomento',
  },
});

const Block = ({
  data,
  inEditMode,
  selected,
  focusOn,
  block,
  onChange,
  intl,
}) => {
  const argument = data?.argument ? data?.argument[0] : null;
  const searchResults = useSelector((state) => state.content?.subrequests);
  const dispatch = useDispatch();

  // one request is made for every 'unita_amministrativa_responsabile' selected
  useEffect(() => {
    dispatch(getContent(flattenToAppURL(argument['@id']), null, argument['@id']));
    return () => {
      dispatch(resetContent(argument['@id']));
    };
  }, [dispatch, argument]);


  return (
    <Card className="card-bg" noWrapper={true} tag="div">
      <CardBody tag="div">
        <ArgumentIcon icon={searchResults[argument['@id']]?.data?.icona}/>
        <CardTitle tag="h3">{searchResults[argument['@id']]?.data?.title}</CardTitle>
        <CardText tag="p">{searchResults[argument['@id']]?.data?.description}</CardText>
        {inEditMode ? (
          <TextEditorWidget
            data={data}
            fieldName="title"
            selected={selected}
            block={block}
            onChangeBlock={onChange}
            placeholder={intl.formatMessage(messages.text)}
            focusOn={focusOn}
          />
        ) : (
          <div>
            {redraft(
              data.title,
              settings.ToHTMLRenderers,
              settings.ToHTMLOptions,
            )}
          </div>
        )}
        {argument && (
          <CardReadMore
            className="darker"
            iconName="it-arrow-right"
            tag="a"
            text={intl.formatMessage(messages.exploreArgument)}
            href={argument['@id']}
          />
        )}
      </CardBody>
    </Card>
  );
};
export default Block;
