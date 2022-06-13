/**
 * HeaderCenter component.
 * @module components/Header/HeaderCenter
 */

import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import { useSelector } from 'react-redux';
import {
  Header,
  HeaderContent,
  HeaderRightZone,
} from 'design-react-kit/dist/design-react-kit';
import { flattenToAppURL } from '@plone/volto/helpers';
import {
  Logo,
  SocialHeader,
  HeaderSearch,
  BrandText,
} from '@italia/components/ItaliaTheme';

const HeaderCenter = () => {
  const subsite = useSelector((state) => state.subsite?.data);
  let logoSubsite = subsite?.subsite_logo && (
    <figure className="icon">
      <img
        src={flattenToAppURL(subsite.subsite_logo.scales?.mini?.download)}
        alt="Logo"
      />
    </figure>
  );

  return (
    <Header small={false} theme="" type="center">
      <HeaderContent>
        <div className="it-brand-wrapper">
          <UniversalLink
            href={subsite?.['@id'] ? flattenToAppURL(subsite['@id']) : '/'}
          >
            {subsite?.subsite_logo ? logoSubsite : <Logo />}
            <BrandText subsite={subsite} />
          </UniversalLink>
        </div>
        <HeaderRightZone>
          <SocialHeader />
          <HeaderSearch />
        </HeaderRightZone>
      </HeaderContent>
    </Header>
  );
};

export default HeaderCenter;
