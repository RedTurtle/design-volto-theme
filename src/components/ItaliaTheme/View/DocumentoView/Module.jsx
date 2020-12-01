/**
 * Modules view component.
 * @module components/theme/View/DocumentoView/Modules
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { getContent, resetContent } from '@plone/volto/actions';

import {
  Card,
  CardBody,
  CardTitle,
} from 'design-react-kit/dist/design-react-kit';

import { DownloadFileFormat } from '@italia/components/ItaliaTheme/View';

/**
 * Module view component class.
 * @function Modules
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const Module = ({ item }) => {
  const dispatch = useDispatch();
  const subrequests = useSelector((state) => state.content.subrequests);
  const key = 'module_' + item['@id'];

  useEffect(() => {
    dispatch(getContent(item['@id'], null, key));
    return () => dispatch(resetContent(key));
  }, [dispatch]);

  let modulo = subrequests[key]?.data;

  return modulo ? (
    <Card
      className="card card-teaser shadow p-4 mt-3 rounded modulo"
      noWrapper={true}
      tag="div"
    >
      <CardBody tag="div">
        <CardTitle tag="h5">
          {modulo.file_principale ? (
            <a
              href={flattenToAppURL(modulo.file_principale.download)}
              title={modulo.title ?? modulo.file_principale.filename}
            >
              {modulo.title ?? modulo.file_principale.filename}
            </a>
          ) : modulo['@type'] === 'Link' ? (
            <UniversalLink href={modulo['@id']} title={modulo.title}>
              {modulo.title}
            </UniversalLink>
          ) : (
            modulo.title
          )}
        </CardTitle>

        {modulo.description && <p>{modulo.description}</p>}
        <div className="download-formats">
          <DownloadFileFormat
            file={modulo.file_principale}
            showLabel={true}
            className="mb-4"
          />
          <DownloadFileFormat
            file={modulo.formato_alternativo_1}
            showLabel={true}
            className="mb-4"
          />
          <DownloadFileFormat
            file={modulo.formato_alternativo_2}
            showLabel={true}
          />
        </div>
      </CardBody>
    </Card>
  ) : null;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Module.propTypes = {
  item: PropTypes.shape({
    '@id': PropTypes.string,
  }).isRequired,
};

export default Module;
