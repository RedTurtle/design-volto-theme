import React from 'react';
import { Card, CardBody } from 'design-react-kit/dist/design-react-kit';
import { UniversalLink } from '@plone/volto/components';
import Highlighter from 'react-highlight-words';

const ResultItem = ({ item, index, section, searchableText }) => {
  const filteredWords = searchableText.split(' ');

  return (
    <Card teaser noWrapper={true} className="mt-3 mb-2">
      <CardBody>
        {section}
        <h4 className="card-title">
          <UniversalLink item={item}>
            <Highlighter
              highlightClassName="highlighted-text"
              searchWords={filteredWords}
              autoEscape={true}
              textToHighlight={item.title}
            />
          </UniversalLink>
        </h4>
        <p className="card-text">
          <Highlighter
            highlightClassName="highlighted-text"
            searchWords={filteredWords}
            autoEscape={true}
            textToHighlight={item.description}
          />
        </p>
      </CardBody>
    </Card>
  );
};
export default ResultItem;
