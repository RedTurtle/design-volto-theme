/**
 * FileView view component.
 * @module components/theme/View/FileView
 */

import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'design-react-kit/dist/design-react-kit';

import {
  PageHeader,
  RelatedItems,
  PagePlaceholderAfterContent,
  FileViewPlaceholderAfterContent,
  FileViewPlaceholderAfterRelatedItems,
  RelatedItemInEvidence,
} from '@italia/components/ItaliaTheme/View';

import { Icon } from '@italia/components/ItaliaTheme';

/**
 * FileView view component class.
 * @function FileView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */

const FileView = ({ content }) => {
  return (
    <>
      <div className="container px-4 my-4 file-view">
        <PageHeader content={content} />
        {content.file?.download && (
          <Card>
            <CardBody>
              <CardText>
                <Icon icon="it-download"></Icon>
              </CardText>
              <CardTitle>
                <a href={flattenToAppURL(content.file.download)}>
                  {content.file.filename}
                </a>
              </CardTitle>
            </CardBody>
          </Card>
        )}
      </div>

      <FileViewPlaceholderAfterContent content={content} />
      <PagePlaceholderAfterContent content={content} />

      <RelatedItems content={content} />
      <RelatedItemInEvidence content={content} />

      <FileViewPlaceholderAfterRelatedItems content={content} />
    </>
  );
};

export default FileView;
