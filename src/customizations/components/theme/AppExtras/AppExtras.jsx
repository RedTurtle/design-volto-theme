import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Helmet } from '@plone/volto/helpers';
import ScrollToTop from '@italia/components/ItaliaTheme/ScrollToTop/ScrollToTop';
import { SubsiteLoader } from '@italia/addons/volto-subsites';
import { siteConfig } from '~/config';

const AppExtras = ({ pathname }) => {
  const subsite = useSelector((state) => state.subsite?.data);
  const siteTitle = subsite?.title ?? siteConfig?.properties?.siteTitle;
  return (
    <>
      <Helmet titleTemplate={`%s - ${siteTitle}`} />

      <ScrollToTop />
      <SubsiteLoader pathname={pathname} />
    </>
  );
};

export default connect(
  (state, props) => ({
    pathname: props.location?.pathname,
  }),
  {},
)(AppExtras);
