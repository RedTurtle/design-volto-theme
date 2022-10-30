import newsSVG from '@plone/volto/icons/news.svg';
import searchIcon from 'bootstrap-italia/src/svg/it-search.svg';
import HighlightedContentView from 'design-volto-theme/components/ItaliaTheme/Blocks/HighlightedContent/View';
import HighlightedContentEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/HighlightedContent/Edit';
import noteSvg from 'bootstrap-italia/src/svg/it-note.svg';
import calendarSvg from 'bootstrap-italia/src/svg/it-calendar.svg';

import alertSVG from '@plone/volto/icons/alert.svg';
import AlertView from 'design-volto-theme/components/ItaliaTheme/Blocks/Alert/View';
import AlertEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/Alert/Edit';

import divideHorizontalSVG from '@plone/volto/icons/divide-horizontal.svg';
import ViewBreak from 'design-volto-theme/components/ItaliaTheme/Blocks/Break/View';
import EditBreak from 'design-volto-theme/components/ItaliaTheme/Blocks/Break/Edit';

import SearchSectionsView from 'design-volto-theme/components/ItaliaTheme/Blocks/SearchSections/View';
import SearchSectionsEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/SearchSections/Edit';
import ArgumentsInEvidenceEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/ArgumentsInEvidence/Edit';
import ArgumentsInEvidenceView from 'design-volto-theme/components/ItaliaTheme/Blocks/ArgumentsInEvidence/View';

import CalendarView from 'design-volto-theme/components/ItaliaTheme/Blocks/Calendar/View';
import CalendarEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/Calendar/Edit';

import EventSearchView from 'design-volto-theme/components/ItaliaTheme/Blocks/EventSearch/View';
import EventSearchEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/EventSearch/Edit';

import simpleTextCardSVG from 'design-volto-theme/icons/card-semplice.svg';
import TextCardView from 'design-volto-theme/components/ItaliaTheme/Blocks/TextCard/SimpleCard/View';
import TextCardEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/TextCard/SimpleCard/Edit';
import imageTextCardSVG from 'design-volto-theme/icons/card-immagine.svg';
import TextCardWithImageView from 'design-volto-theme/components/ItaliaTheme/Blocks/TextCard/CardWithImage/View';
import TextCardWithImageEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/TextCard/CardWithImage/Edit';

import listArrowsSVG from '@plone/volto/icons/list-arrows.svg';
import AccordionView from 'design-volto-theme/components/ItaliaTheme/Blocks/Accordion/View';
import AccordionEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/Accordion/Edit';

import videoSVG from '@plone/volto/icons/video.svg';
import VideoGalleryView from 'design-volto-theme/components/ItaliaTheme/Blocks/VideoGallery/View';
import VideoGalleryEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/VideoGallery/Edit';

import faTwitter from 'design-volto-theme/icons/twitter-brands.svg';
import TwitterPostsView from 'design-volto-theme/components/ItaliaTheme/Blocks/TwitterPosts/View';
import TwitterPostsEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/TwitterPosts/Edit';

import iconBlocksSVG from 'design-volto-theme/icons/blocco-icone.svg';
import IconBlocksView from 'design-volto-theme/components/ItaliaTheme/Blocks/IconBlocks/View';
import IconBlocksEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/IconBlocks/Edit';

import emailSVG from '@plone/volto/icons/email.svg';
import ContactsBlockView from 'design-volto-theme/components/ItaliaTheme/Blocks/ContactsBlock/View';
import ContactsBlockEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/ContactsBlock/Edit';

import numbersBlockSVG from 'design-volto-theme/icons/numeri.svg';
import NumbersBlockView from 'design-volto-theme/components/ItaliaTheme/Blocks/NumbersBlock/View';
import NumbersBlockEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/NumbersBlock/Edit';

import BandiSearchView from 'design-volto-theme/components/ItaliaTheme/Blocks/BandiSearch/View';
import BandiSearchEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/BandiSearch/Edit';

import UOSearchView from 'design-volto-theme/components/ItaliaTheme/Blocks/UOSearch/View';
import UOSearchEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/UOSearch/Edit';

import flashSVG from '@plone/volto/icons/flash.svg';
import CTABlockView from 'design-volto-theme/components/ItaliaTheme/Blocks/CTABlock/View';
import CTABlockEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/CTABlock/Edit';

import countDownSVG from 'design-volto-theme/icons/count-down.svg';
import CountDownBlockView from 'design-volto-theme/components/ItaliaTheme/Blocks/CountDown/View';
import CountDownBlockEdit from 'design-volto-theme/components/ItaliaTheme/Blocks/CountDown/Edit';

const italiaBlocks = {
  highlitedContent: {
    id: 'highlitedContent',
    title: 'Contenuto in primo piano',
    icon: newsSVG,
    group: 'homePage',
    view: HighlightedContentView,
    edit: HighlightedContentEdit,
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
    group: 'search',
    view: SearchSectionsView,
    edit: SearchSectionsEdit,
    restricted: false,
    mostUsed: false,
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
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  searchEvents: {
    id: 'searchEvents',
    title: 'Ricerca eventi',
    icon: searchIcon,
    group: 'search',
    view: EventSearchView,
    edit: EventSearchEdit,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  searchBandi: {
    id: 'searchBandi',
    title: 'Ricerca bandi',
    icon: searchIcon,
    group: 'search',
    view: BandiSearchView,
    edit: BandiSearchEdit,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  searchUO: {
    id: 'searchUO',
    title: 'Ricerca Unità Organizzative',
    icon: searchIcon,
    group: 'search',
    view: UOSearchView,
    edit: UOSearchEdit,
    restricted: false,
    mostUsed: false,
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

  testo_riquadro_semplice: {
    id: 'testo_riquadro_semplice',
    title: 'Card semplice',
    icon: simpleTextCardSVG,
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
    title: 'Card con immagine',
    icon: imageTextCardSVG,
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
    blockHasOwnFocusManagement: true,
  },
  numbersBlock: {
    id: 'numbersBlock',
    title: 'Blocco Numeri',
    icon: numbersBlockSVG,
    group: 'text',
    view: NumbersBlockView,
    edit: NumbersBlockEdit,
    restricted: false,
    mostUsed: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  iconBlocks: {
    id: 'iconBlocks',
    title: 'Blocchi con icone',
    icon: iconBlocksSVG,
    group: 'text',
    view: IconBlocksView,
    edit: IconBlocksEdit,
    restricted: false,
    mostUsed: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  contacts: {
    id: 'contacts',
    title: 'Contatti',
    icon: emailSVG,
    group: 'text',
    view: ContactsBlockView,
    edit: ContactsBlockEdit,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },

  video_gallery: {
    id: 'video_gallery',
    title: 'Video Gallery',
    icon: videoSVG,
    group: 'media',
    view: VideoGalleryView,
    edit: VideoGalleryEdit,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  twitter_posts: {
    id: 'twitter_posts',
    title: 'Twitter posts',
    icon: faTwitter,
    group: 'media',
    view: TwitterPostsView,
    edit: TwitterPostsEdit,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  cta_block: {
    id: 'cta_block',
    title: 'Blocco CTA',
    icon: flashSVG,
    group: 'common',
    view: CTABlockView,
    edit: CTABlockEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
  count_down: {
    id: 'count_down',
    title: 'Count Down',
    icon: countDownSVG,
    group: 'common',
    view: CountDownBlockView,
    edit: CountDownBlockEdit,
    restricted: false,
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  },
};

const getItaliaBlocks = (config) => {
  delete config.blocks.blocksConfig.search;
  return italiaBlocks;
};
export default getItaliaBlocks;
