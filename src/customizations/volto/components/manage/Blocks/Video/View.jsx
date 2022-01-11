/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 *
 * Customizations:
 * - support external sources for preview image
 * - added ConditionalEmbed
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Embed } from 'semantic-ui-react';
import cx from 'classnames';
import {
  isInternalURL,
  getParentUrl,
  flattenToAppURL,
} from '@plone/volto/helpers';
import { ConditionalEmbed } from 'volto-gdpr-privacy';
import config from '@plone/volto/registry';

/**
 * View video block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  const allowsExternals =
    data.allowExternals !== undefined
      ? !!data.allowExternals
      : !!config.settings.videoAllowExternalsDefault;

  return (
    <div
      className={cx(
        'block video align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {data.url && (
        <div
          className={cx('video-inner', {
            'full-width': data.align === 'full',
          })}
        >
          <ConditionalEmbed url={data.url}>
            {data.url.match('youtu') ? (
              <>
                {data.url.match('list') ? (
                  data.preview_image ? (
                    <Embed
                      url={`https://www.youtube.com/embed/videoseries?list=${
                        data.url.match(/^.*\?list=(.*)$/)[1]
                      }`}
                      placeholder={
                        isInternalURL(data.preview_image)
                          ? `${flattenToAppURL(
                              data.preview_image,
                            )}/@@images/image`
                          : data.preview_image
                      }
                      defaultActive
                      autoplay={false}
                    />
                  ) : (
                    <Embed
                      url={`https://www.youtube.com/embed/videoseries?list=${
                        data.url.match(/^.*\?list=(.*)$/)[1]
                      }`}
                      icon="play"
                      defaultActive
                      autoplay={false}
                    />
                  )
                ) : data.preview_image ? (
                  <Embed
                    id={
                      data.url.match(/.be\//)
                        ? data.url.match(/^.*\.be\/(.*)/)[1]
                        : data.url.match(/^.*\?v=(.*)$/)[1]
                    }
                    source="youtube"
                    placeholder={
                      isInternalURL(data.preview_image)
                        ? `${flattenToAppURL(
                            data.preview_image,
                          )}/@@images/image`
                        : data.preview_image
                    }
                    icon="play"
                    autoplay={false}
                  />
                ) : (
                  <Embed
                    id={
                      data.url.match(/.be\//)
                        ? data.url.match(/^.*\.be\/(.*)/)[1]
                        : data.url.match(/^.*\?v=(.*)$/)[1]
                    }
                    source="youtube"
                    icon="play"
                    defaultActive
                    autoplay={false}
                  />
                )}
              </>
            ) : (
              <>
                {data.url.match('vimeo') ? (
                  data.preview_image ? (
                    <Embed
                      id={data.url.match(/^.*\.com\/(.*)/)[1]}
                      source="vimeo"
                      placeholder={
                        isInternalURL(data.preview_image)
                          ? `${flattenToAppURL(
                              data.preview_image,
                            )}/@@images/image`
                          : data.preview_image
                      }
                      icon="play"
                      autoplay={false}
                    />
                  ) : (
                    <Embed
                      id={data.url.match(/^.*\.com\/(.*)/)[1]}
                      source="vimeo"
                      icon="play"
                      defaultActive
                      autoplay={false}
                    />
                  )
                ) : (
                  <>
                    {data.url.match('.mp4') ? (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video
                        src={
                          isInternalURL(
                            data.url.replace(
                              getParentUrl(config.settings.apiPath),
                              '',
                            ),
                          )
                            ? `${data.url}/@@download/file`
                            : data.url
                        }
                        controls
                        poster={
                          data.preview_image
                            ? isInternalURL(data.preview_image)
                              ? `${flattenToAppURL(
                                  data.preview_image,
                                )}/@@images/image`
                              : data.preview_image
                            : ''
                        }
                        type="video/mp4"
                      />
                    ) : data.url && allowsExternals ? (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video
                        src={data.url}
                        controls
                        poster={
                          data.preview_image
                            ? isInternalURL(data.preview_image)
                              ? `${flattenToAppURL(
                                  data.preview_image,
                                )}/@@images/image`
                              : data.preview_image
                            : null
                        }
                        type="video/mp4"
                      />
                    ) : (
                      <div className="invalidVideoFormat" />
                    )}
                  </>
                )}
              </>
            )}
          </ConditionalEmbed>
        </div>
      )}
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
