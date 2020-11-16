import React from 'react';

import * as config from '@plone/volto/config';

import ToHTMLRenderers from '@plone/volto/config/RichTextEditor/ToHTML';

import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';
import { Separator } from 'draft-js-inline-toolbar-plugin';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';

import newsSVG from '@plone/volto/icons/news.svg';
import searchIcon from 'bootstrap-italia/src/svg/it-search.svg';
import NewsHomeView from '@italia/components/ItaliaTheme/Blocks/NewsHome/View';
import NewsHomeEdit from '@italia/components/ItaliaTheme/Blocks/NewsHome/Edit';
import noteSvg from 'bootstrap-italia/src/svg/it-note.svg';
import calendarSvg from 'bootstrap-italia/src/svg/it-calendar.svg';

import alertSVG from '@plone/volto/icons/alert.svg';
import AlertView from '@italia/components/ItaliaTheme/Blocks/Alert/View';
import AlertEdit from '@italia/components/ItaliaTheme/Blocks/Alert/Edit';

import divideHorizontalSVG from '@plone/volto/icons/divide-horizontal.svg';
import ViewBreak from '@italia/components/ItaliaTheme/Blocks/Break/View';
import EditBreak from '@italia/components/ItaliaTheme/Blocks/Break/Edit';

import SearchSectionsView from '@italia/components/ItaliaTheme/Blocks/SearchSections/View';
import SearchSectionsEdit from '@italia/components/ItaliaTheme/Blocks/SearchSections/Edit';
import ArgumentsInEvidenceEdit from '@italia/components/ItaliaTheme/Blocks/ArgumentsInEvidence/Edit';
import ArgumentsInEvidenceView from '@italia/components/ItaliaTheme/Blocks/ArgumentsInEvidence/View';

import CalendarView from '@italia/components/ItaliaTheme/Blocks/Calendar/View';
import CalendarEdit from '@italia/components/ItaliaTheme/Blocks/Calendar/Edit';

import titleSVG from '@plone/volto/icons/text.svg';
import ArgomentoTitleView from '@italia/components/ItaliaTheme/Blocks/ArgomentoTitle/View';
import ArgomentoTitleEdit from '@italia/components/ItaliaTheme/Blocks/ArgomentoTitle/Edit';

import TextCardView from '@italia/components/ItaliaTheme/Blocks/TextCard/SimpleCard/View';
import TextCardEdit from '@italia/components/ItaliaTheme/Blocks/TextCard/SimpleCard/Edit';
import TextCardWithImageView from '@italia/components/ItaliaTheme/Blocks/TextCard/CardWithImage/View';
import TextCardWithImageEdit from '@italia/components/ItaliaTheme/Blocks/TextCard/CardWithImage/Edit';

import listArrowsSVG from '@plone/volto/icons/list-arrows.svg';
import AccordionView from '@italia/components/ItaliaTheme/Blocks/Accordion/View';
import AccordionEdit from '@italia/components/ItaliaTheme/Blocks/Accordion/Edit';

import { CharCounterDescriptionWidget } from '@italia/components/ItaliaTheme';
import { PageView } from '@italia/components/ItaliaTheme';
import { NewsItemView } from '@italia/components/ItaliaTheme';
import { UOView } from '@italia/components/ItaliaTheme';
import { PersonaView } from '@italia/components/ItaliaTheme';
import { VenueView } from '@italia/components/ItaliaTheme';
import { ServizioView } from '@italia/components/ItaliaTheme';
import { EventoView } from '@italia/components/ItaliaTheme';
import { PaginaArgomentoView } from '@italia/components/ItaliaTheme';
import { CartellaModulisticaView } from '@italia/components/ItaliaTheme';
import { DocumentoView } from '@italia/components/ItaliaTheme';
import { ModuloView } from '@italia/components/ItaliaTheme';
import { BandoView } from '@italia/components/ItaliaTheme';

import CardWithImageTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/CardWithImageTemplate';
import SmallBlockLinksTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/SmallBlockLinksTemplate';
import CompleteBlockLinksTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/CompleteBlockLinksTemplate';
import PhotogalleryTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/PhotogalleryTemplate';
import InEvidenceTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/InEvidenceTemplate';
import SimpleCardTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/SimpleCard/SimpleCardTemplate';
import GridGalleryTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/GridGalleryTemplate';
import RibbonCardTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/RibbonCardTemplate';
import BandiInEvidenceTemplate from '@italia/components/ItaliaTheme/Blocks/Listing/BandiInEvidenceTemplate';

import { rssBlock as customRssBlock } from '@italia/addons/volto-rss-block';
import CardWithImageRssTemplate from '@italia/components/ItaliaTheme/Blocks/RssBlock/CardWithImageRssTemplate';
import CardWithoutImageRssTemplate from '@italia/components/ItaliaTheme/Blocks/RssBlock/CardWithoutImageRssTemplate';
import { DatetimeWidget } from '@plone/volto/config/Widgets';

import { MultilingualWidget } from '@italia/addons/volto-multilingual-widget';
import { IconWidget } from '@italia/components/ItaliaTheme';
import { defaultIconWidgetOptions } from '@italia/helpers/index';
import TinymceWidget from '@italia/components/ItaliaTheme/manage/Widgets/TinymceWidget'

import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as IconsRegular from '@fortawesome/free-regular-svg-icons';

// CTs icons
import faFileInvoiceSVG from './icons/file-invoice.svg';
import faFolderOpenSVG from './icons/folder-open.svg';
import faImageSVG from './icons/image.svg';
import faFileSVG from './icons/file.svg';
import faLinkSVG from './icons/link.svg';
import faBoxOpenSVG from './icons/box-open.svg';
import faArchiveSVG from './icons/archive.svg';
import faFileAltSVG from './icons/file-alt.svg';
import faCalendarAltSVG from './icons/calendar-alt.svg';
import faMapMarkedAltSVG from './icons/map-marked-alt.svg';
import faNewspaperSVG from './icons/newspaper.svg';
import faUserSVG from './icons/user.svg';
import faCogSVG from './icons/cog.svg';
import faSitemapSVG from './icons/sitemap.svg';
import faBuildingSVG from './icons/building.svg';
import faFileDownloadSVG from './icons/file-download.svg';

const iconList = Object.keys(Icons.fas).map(icon => Icons[icon]);
const iconListRegular = Object.keys(IconsRegular.far).map(
  icon => IconsRegular[icon],
);

library.add(...iconList, ...iconListRegular);

const rssBlock = {
  ...customRssBlock,
  templates: {
    ...customRssBlock.templates,
    default: {
      label: 'Card senza immagine',
      template: CardWithoutImageRssTemplate,
    },
    card_without_image: {
      label: 'Card con immagine',
      template: CardWithImageRssTemplate,
    },
  },
};

const extendedBlockRenderMap = config.settings.extendedBlockRenderMap.update(
  'align-center',
  (element = 'p') => element,
);

const blockStyleFn = contentBlock => {
  let r = config.settings.blockStyleFn(contentBlock);

  if (!r) {
    const type = contentBlock.getType();
    if (type === 'align-center') {
      r += 'align-center';
    }
  }

  return r;
};
const listBlockTypes = config.settings.listBlockTypes.concat(['align-center']);

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
    group: 'homePage',
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
  calendar: {
    id: 'calendar',
    title: 'Calendario',
    icon: calendarSvg,
    group: 'homePage',
    view: CalendarView,
    edit: CalendarEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  argumentsInEvidence: {
    id: 'argumentsInEvidence',
    title: 'Argomenti in evidenza',
    icon: noteSvg,
    group: 'homePage',
    view: ArgumentsInEvidenceView,
    edit: ArgumentsInEvidenceEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  break: {
    id: 'break',
    title: 'Interruzione di pagina',
    icon: divideHorizontalSVG,
    group: 'text',
    view: ViewBreak,
    edit: EditBreak,
    restricted: false,
    mostUsed: false,
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
  testo_riquadro_semplice: {
    id: 'testo_riquadro_semplice',
    title: 'Testo in riquadro semplice',
    icon: titleSVG,
    group: 'text',
    view: TextCardView,
    edit: TextCardEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
  },
  testo_riquadro_immagine: {
    id: 'testo_riquadro_immagine',
    title: 'Testo in riquadro immagine',
    icon: titleSVG,
    group: 'text',
    view: TextCardWithImageView,
    edit: TextCardWithImageEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  accordion: {
    id: 'accordion',
    title: 'Accordion',
    icon: listArrowsSVG,
    group: 'text',
    view: AccordionView,
    edit: AccordionEdit,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  listing: {
    ...config.blocks.blocksConfig.listing,
    templates: {
      ...config.blocks.blocksConfig.listing.templates,
      default: { label: 'Card semplice', template: SimpleCardTemplate },
      cardWithImageTemplate: {
        label: 'Card con immagine',
        template: CardWithImageTemplate,
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
      gridGalleryTemplate: {
        label: 'Gallery a griglia',
        template: GridGalleryTemplate,
      },
      ribbonCardTemplate: {
        label: 'Card con nastro',
        template: RibbonCardTemplate,
      },
      bandiInEvidenceTemplate: {
        label: 'Bandi',
        template: BandiInEvidenceTemplate,
      },
    },
  },
  rssBlock,
};

export const settings = {
  ...config.settings,
  devProxyToApiPath: 'http://localhost:8080/Plone',
  richTextEditorInlineToolbarButtons: [
    AlignCenterButton,
    Separator,
    UnderlineButton,
    ...config.settings.richTextEditorInlineToolbarButtons,
  ],
  extendedBlockRenderMap: extendedBlockRenderMap,
  blockStyleFn: blockStyleFn,
  listBlockTypes: listBlockTypes,
  isMultilingual: false,
  supportedLanguages: ['it'],
  defaultLanguage: 'it',
  verticalFormTabs: true,
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
  contentIcons: {
    ...config.settings.contentIcons,
    Document: faFileInvoiceSVG,
    Folder: faFolderOpenSVG,
    'News Item': faNewspaperSVG,
    Event: faCalendarAltSVG,
    Image: faImageSVG,
    File: faFileSVG,
    Link: faLinkSVG,

    Argomento: faBoxOpenSVG,
    CartellaModulistica: faArchiveSVG,
    Documento: faFileAltSVG,
    Venue: faMapMarkedAltSVG,
    Persona: faUserSVG,
    Servizio: faCogSVG,
    Subsite: faSitemapSVG,
    UnitaOrganizzativa: faBuildingSVG,
    Modulo: faFileDownloadSVG,
  },
};

export const views = {
  ...config.views,
  contentTypesViews: {
    ...config.views.contentTypesViews,
    Document: PageView,
    'News Item': NewsItemView,
    UnitaOrganizzativa: UOView,
    Persona: PersonaView,
    Venue: VenueView,
    Servizio: ServizioView,
    Event: EventoView,
    'Pagina Argomento': PaginaArgomentoView,
    CartellaModulistica: CartellaModulisticaView,
    Documento: DocumentoView,
    Modulo: ModuloView,
    Bando: BandoView,
  },
};

export const siteConfig = {
  italiaThemeViewsConfig: {
    imagePosition: 'afterHeader', // possible values: afterHeader, documentBody
  },
  properties: {
    siteTitle: 'Nome del Comune',
    siteSubtitle: "Uno dei tanti Comuni d'Italia",
    parentSiteTitle: 'Nome della Regione',
    parentSiteURL: 'https://www.governo.it',
    subsiteParentSiteTitle: 'Nome del sito padre del sottosito',
    footerInfos:
      'Via Roma 0 - 00000 Lorem Ipsum Codice fiscale / P. IVA: 000000000',
  },
  socialSettings: [
    {
      title: 'Facebook',
      url: 'https://facebook.com',
      icon: 'it-facebook',
    },
    {
      title: 'GitHub',
      url: 'https://github.com',
      icon: 'it-github',
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com',
      icon: 'it-twitter',
    },
  ],
};

export const widgets = {
  ...config.widgets,
  id: {
    ...config.widgets.id,
    description: CharCounterDescriptionWidget,
    icona: props => (
      <IconWidget {...props} defaultOptions={defaultIconWidgetOptions} />
    ),
    cookie_consent_configuration: MultilingualWidget(),
    data_conclusione_incarico: props => (
      <DatetimeWidget {...props} dateOnly={true} />
    ),
    data_insediamento: props => <DatetimeWidget {...props} dateOnly={true} />,
  },
  widget: {
    ...config.widgets.widget,
    richtext: TinymceWidget
  }
};

const customBlocksOrder = [
  { id: 'news', title: 'News' },
  { id: 'homePage', title: 'Home Page' },
];
const customInitialBlocks = {
  'Pagina Argomento': ['title', 'description', 'text'],
  'Bando Folder Deepening': ['title', 'description', 'listing'],
};
const customRequiredBlocks = ['description'];

// BUG#10398
// We chose to disallow leadimage block usage in editor. If you want it back someday,
// comment out the following line and add the leadimage behavior in Document.xml file
delete config.blocks.blocksConfig['leadimage'];

export const blocks = {
  ...config.blocks,
  blocksConfig: { ...config.blocks.blocksConfig, ...customBlocks },
  groupBlocksOrder: config.blocks.groupBlocksOrder.concat(customBlocksOrder),
  initialBlocks: { ...config.blocks.initialBlocks, ...customInitialBlocks },
  requiredBlocks: {
    ...config.blocks.requiredBlocks.concat(...customRequiredBlocks),
  },
};

export const addonReducers = { ...config.addonReducers };
export const addonRoutes = [...(config.addonRoutes || [])];
