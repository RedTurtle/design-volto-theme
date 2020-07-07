import React from 'react';

import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  blocks as defaultBlocks,
  addonReducers as defaultAddonReducers,
} from '@plone/volto/config';

import ToHTMLRenderers from '@plone/volto/config/RichTextEditor/ToHTML';

import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';
import { Separator } from 'draft-js-inline-toolbar-plugin';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';

import newsSVG from '@plone/volto/icons/news.svg';
import searchIcon from 'bootstrap-italia/src/svg/it-search.svg';
import NewsHomeView from '@design/components/DesignTheme/Blocks/NewsHome/View';
import NewsHomeEdit from '@design/components/DesignTheme/Blocks/NewsHome/Edit';

import alertSVG from '@plone/volto/icons/alert.svg';
import AlertView from '@design/components/DesignTheme/Blocks/Alert/View';
import AlertEdit from '@design/components/DesignTheme/Blocks/Alert/Edit';

import SearchSectionsView from '@design/components/DesignTheme/Blocks/SearchSections/View';
import SearchSectionsEdit from '@design/components/DesignTheme/Blocks/SearchSections/Edit';

import titleSVG from '@plone/volto/icons/text.svg';
import ArgomentoTitleView from '@design/components/DesignTheme/Blocks/ArgomentoTitle/View';
import ArgomentoTitleEdit from '@design/components/DesignTheme/Blocks/ArgomentoTitle/Edit';

import { CharCounterDescriptionWidget } from '@design/components/DesignTheme';
import { NewsItemView } from '@design/components/DesignTheme';
import { UOView } from '@design/components/DesignTheme';
import { PersonaView } from '@design/components/DesignTheme';
import { ServizioView } from '@design/components/DesignTheme';
import { PaginaArgomentoView } from '@design/components/DesignTheme';
import NewsTemplate from '@design/components/DesignTheme/Blocks/Listing/NewsTemplate';
import SmallBlockLinksTemplate from '@design/components/DesignTheme/Blocks/Listing/SmallBlockLinksTemplate';
import CompleteBlockLinksTemplate from '@design/components/DesignTheme/Blocks/Listing/CompleteBlockLinksTemplate';
import PhotogalleryTemplate from '@design/components/DesignTheme/Blocks/Listing/PhotogalleryTemplate';
import InEvidenceTemplate from '@design/components/DesignTheme/Blocks/Listing/InEvidenceTemplate';

import { rssBlock as customRssBlock } from 'volto-rss-block';
import CardWithImageRssTemplate from '@design/components/DesignTheme/Blocks/RssBlock/CardWithImageRssTemplate';
import CardWithoutImageRssTemplate from '@design/components/DesignTheme/Blocks/RssBlock/CardWithoutImageRssTemplate';
import { DatetimeWidget } from '@plone/volto/config/Widgets';
import MultilingualWidget from 'volto-multilingual-widget';

import { GeoLocationWidget } from 'volto-geocoding';

const rssBlock = {
  ...customRssBlock,
  templates: {
    ...customRssBlock.templates,
    default: {
      label: 'Card template without image',
      template: CardWithoutImageRssTemplate,
    },
    card_without_image: {
      label: 'Card template with image ',
      template: CardWithImageRssTemplate,
    },
  },
};

const extendedBlockRenderMap = defaultSettings.extendedBlockRenderMap.update(
  'align-center',
  (element = 'p') => element,
);

const blockStyleFn = contentBlock => {
  let r = defaultSettings.blockStyleFn(contentBlock);

  if (!r) {
    const type = contentBlock.getType();
    if (type === 'align-center') {
      r += 'align-center';
    }
  }

  return r;
};
const listBlockTypes = defaultSettings.listBlockTypes.concat(['align-center']);

const UnderlineButton = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});
const AlignCenterButton = createBlockStyleButton({
  blockType: 'align-center',
  children: <Icon name={alignCenterSVG} size="24px" />,
});

const customBlocks = {
  newsHome: {
    id: 'newsHome',
    title: 'News con immagine in primo piano',
    icon: newsSVG,
    group: 'news',
    view: NewsHomeView,
    edit: NewsHomeEdit,
    restricted: false,
    mostUsed: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  searchSections: {
    id: 'searchSections',
    title: 'Ricerca nelle sezioni',
    icon: searchIcon,
    group: 'text',
    view: SearchSectionsView,
    edit: SearchSectionsEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  alert: {
    id: 'alert',
    title: 'Alert',
    icon: alertSVG,
    group: 'text',
    view: AlertView,
    edit: AlertEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  pagina_argomento_title: {
    id: 'pagina_argomento_title',
    title: 'Titolo Pagina Argomento',
    icon: titleSVG,
    group: 'argomento',
    view: ArgomentoTitleView,
    edit: ArgomentoTitleEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  listing: {
    ...defaultBlocks.blocksConfig.listing,
    templates: {
      ...defaultBlocks.blocksConfig.listing.templates,
      newsTemplate: {
        label: 'Notizie',
        template: NewsTemplate,
      },
      smallBlockLinksTemplate: {
        label: 'Blocco link solo immagini',
        template: SmallBlockLinksTemplate,
      },
      completeBlockLinksTemplate: {
        label: 'Blocco link completo',
        template: CompleteBlockLinksTemplate,
      },
      photogallery: {
        label: 'Photogallery',
        template: PhotogalleryTemplate,
      },
      inEvidenceTemplate: {
        label: 'In evidenza',
        template: InEvidenceTemplate,
      },
    },
  },
  rssBlock,
};

export const settings = {
  ...defaultSettings,
  richTextEditorInlineToolbarButtons: [
    AlignCenterButton,
    Separator,
    UnderlineButton,
    ...defaultSettings.richTextEditorInlineToolbarButtons,
  ],
  extendedBlockRenderMap: extendedBlockRenderMap,
  blockStyleFn: blockStyleFn,
  listBlockTypes: listBlockTypes,
  isMultilingual: false,
  supportedLanguages: ['it'],
  defaultLanguage: 'it',
  //TODO: rimuovere questa customizzazione quando sistemano https://github.com/plone/volto/issues/1601
  ToHTMLRenderers: {
    ...ToHTMLRenderers,
    blocks: {
      ...ToHTMLRenderers.blocks,
      blockquote: (children, { keys }) =>
        children.map((child, i) => (
          <blockquote key={keys[i]}>{child}</blockquote>
        )),
    },
  },
};

export const views = {
  ...defaultViews,
  contentTypesViews: {
    ...defaultViews.contentTypesViews,
    'News Item': NewsItemView,
    UnitaOrganizzativa: UOView,
    Persona: PersonaView,
    Servizio: ServizioView,
    'Pagina Argomento': PaginaArgomentoView,
  },
};

export const widgets = {
  ...defaultWidgets,
  id: {
    ...defaultWidgets.id,
    description: CharCounterDescriptionWidget,
    cookie_consent_configuration: MultilingualWidget(),
    geolocation: GeoLocationWidget,
    data_conclusione_incarico: (props) => (
      <DatetimeWidget {...props} dateOnly={true} />
    ),
    data_insediamento: (props) => <DatetimeWidget {...props} dateOnly={true} />,
  },
};

const customBlocksOrder = [{ id: 'news', title: 'News' }];
const customInitialBlocks = {
  'Pagina Argomento': ['pagina_argomento_title'],
};

// BUG#10398
// We chose to disallow leadimage block usage in editor. If you want it back someday,
// comment out the following line and add the leadimage behavior in Document.xml file
delete defaultBlocks.blocksConfig['leadimage'];

export const blocks = {
  ...defaultBlocks,
  blocksConfig: { ...defaultBlocks.blocksConfig, ...customBlocks },
  groupBlocksOrder: defaultBlocks.groupBlocksOrder.concat(customBlocksOrder),
  initialBlocks: { ...defaultBlocks.initialBlocks, ...customInitialBlocks },
};

export const addonRoutes = [];

export const addonReducers = {
  ...defaultAddonReducers,
};
