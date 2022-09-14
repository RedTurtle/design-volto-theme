import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { Helmet, BodyClass } from '@plone/volto/helpers';
import { RemoveBodyClass } from '@italia/components/ItaliaTheme';
import { getSiteProperty } from '@italia/helpers';
import ScrollToTop from '@italia/components/ItaliaTheme/ScrollToTop/ScrollToTop';
import { SubsiteLoader } from '@italia/addons/volto-subsites';
import config from '@plone/volto/registry';

const GenericAppExtras = (props) => {
  const intl = useIntl();
  const location = useLocation();

  const subsite = useSelector((state) => state.subsite?.data);
  const subsiteLoadable =
    config.settings.loadables['subsite-' + subsite?.subsite_css_class?.token];
  if (subsiteLoadable) {
    subsiteLoadable.load();
    // .then(() => { console.log('css loaded'); });
  }
  const siteTitle = subsite?.title ?? getSiteProperty('siteTitle', intl.locale);

  const FORCE_PUBLIC_UI = ['/sitemap', '/search'];
  const isPublicUI = FORCE_PUBLIC_UI.reduce(
    (acc, route) => acc || new RegExp(route).test(`/${location.pathname}`),
    false,
  );

  return (
    <>
      <Helmet titleTemplate={`%s - ${siteTitle}`} />
      {isPublicUI && (
        <>
          <BodyClass className="public-ui" />
          <RemoveBodyClass className="cms-ui" />
        </>
      )}
      <ScrollToTop />
      <SubsiteLoader pathname={location.pathname} />
    </>
  );
};
export default GenericAppExtras;
