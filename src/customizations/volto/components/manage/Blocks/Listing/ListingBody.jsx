/*
CUSTOMIZATIONS:
-added skeleton
- added additionalFilters
- 'background class' and 'block class'
*/
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import config from '@plone/volto/registry';
import withQuerystringResults from '@plone/volto/components/manage/Blocks/Listing/withQuerystringResults';
import {
  Pagination,
  Skeleton,
} from 'design-volto-theme/components/ItaliaTheme';

import { isEqual } from 'lodash';

const ListingBody = React.memo(
  withQuerystringResults(
    (props) => {
      const {
        data = {},
        isEditMode,
        listingItems,
        totalPages,
        itemsTotal,
        onPaginationChange,
        variation,
        currentPage,
        isFolderContentsListing,
        hasLoaded,
        hasQuery,
        addFilters,
        firstLoading,
        properties,
        loadingQuery,
        listingRef,
        additionalFilters,
      } = props;

      let ListingBodyTemplate;
      let templateConfig;
      // Legacy support if template is present
      const variations =
        config.blocks?.blocksConfig['listing']?.variations || [];
      const defaultVariation = variations.filter((item) => item.isDefault)?.[0];

      if (data.template && !data.variation) {
        let legacyTemplateConfig = variations.find(
          (item) => item.id === data.template,
        );

        if (!legacyTemplateConfig) {
          legacyTemplateConfig = defaultVariation;
        }
        templateConfig = legacyTemplateConfig;
        ListingBodyTemplate = legacyTemplateConfig.template;
      } else {
        templateConfig = variation ?? defaultVariation;
        ListingBodyTemplate = templateConfig?.template;
      }

      const SkeletonTemplate = templateConfig.skeleton || Skeleton;

      const getBackgroundClass = () => {
        const block = properties.blocks[data.block];
        if (!block?.show_block_bg) return '';

        let bg_color = data.bg_color ? `bg-${data.bg_color}` : '';

        if (block.template === 'gridGalleryTemplate') {
          return `section section-muted section-inset-shadow py-5 ${bg_color}`;
        } else {
          return `bg-light py-5 ${bg_color}`;
        }
      };

      const getBlockClasses = () => {
        let bg_color = getBackgroundClass();
        let items_color = data.items_color
          ? `items-color-${data.items_color}`
          : '';

        return `${bg_color} ${items_color}`;
      };

      return (
        <div className="public-ui">
          {loadingQuery && (
            <div className={`full-width ${getBlockClasses()}`} ref={listingRef}>
              <SkeletonTemplate {...data} />
            </div>
          )}
          {!loadingQuery &&
          (listingItems.length > 0 || additionalFilters?.length > 0) ? (
            <div className={`full-width ${getBlockClasses()}`} ref={listingRef}>
              <ListingBodyTemplate
                items={listingItems}
                isEditMode={isEditMode}
                {...data}
                addFilters={addFilters}
                additionalFilters={additionalFilters}
                items_total={itemsTotal}
                loading={loadingQuery}
                firstLoading={firstLoading}
              />
              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <Pagination
                    activePage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPaginationChange}
                  />
                </div>
              )}
            </div>
          ) : isEditMode ? (
            <div className="listing message">
              {isFolderContentsListing && (
                <FormattedMessage
                  id="No items found in this container."
                  defaultMessage="No items found in this container."
                />
              )}
              {hasLoaded && hasQuery && (
                <FormattedMessage
                  id="No results found."
                  defaultMessage="No results found."
                />
              )}
            </div>
          ) : null}
        </div>
      );
    },
    function areEqual(prevProps, nextProps) {
      return isEqual(prevProps.data, nextProps.data);
    },
  ),
);

export default injectIntl(ListingBody);
