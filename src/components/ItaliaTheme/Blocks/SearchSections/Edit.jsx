import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SidebarPortal } from '@plone/volto/components';
import {
  BlockSearchSectionsSidebar,
  BlockSearchSectionsBody,
} from 'design-volto-theme/components/ItaliaTheme';
import { SearchUtils } from 'design-volto-theme/components';

const Edit = ({
  data,
  id,
  block,
  onChangeBlock,
  openObjectBrowser,
  selected,
}) => {
  const { parseFetchedSections } = SearchUtils;
  const location = useLocation();

  const fetched_sections = useSelector(
    (state) => state?.searchFilters?.result?.sections,
  );

  const sections = fetched_sections
    ? parseFetchedSections(fetched_sections, location)
    : [];

  return (
    <>
      <div className="block full-width">
        <BlockSearchSectionsBody block={data} sections={sections} />
      </div>
      <SidebarPortal selected={selected}>
        <BlockSearchSectionsSidebar
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
          openObjectBrowser={openObjectBrowser}
          sections={sections}
        />
      </SidebarPortal>
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
};

export default Edit;
