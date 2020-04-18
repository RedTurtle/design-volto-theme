import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/**
 * RichTextArticle view component class.
 * @function RichTextArticle
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const RichTextArticle = params => {
  let add_class = params.add_class;
  let classes = add_class ? { [add_class]: true } : {};
  return (
    <article id={params.tag_id} className="it-page-section anchor-offset mt-5">
      {params.title && <h4>{params.title}</h4>}
      <div
        className={cx('text-serif', classes)}
        dangerouslySetInnerHTML={{ __html: params.content }}
      />
    </article>
  );
};
export default RichTextArticle;

RichTextArticle.propTypes = {
  params: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    tag_id: PropTypes.string,
    add_class: PropTypes.string,
  }),
};
