import loadable from '@loadable/component';

// XXX: evaluate prefetching if the subsite will be certainly visited
// 'subsite-light-blue': loadable(() =>
// import(/* webpackPrefetch: true */ '@italia/config/Subsites/light-blue'),
// ),

// XXX: evaluate to import scss directly
// 'subsite-light-blue': loadable(() =>
// import('../../../theme/ItaliaTheme/Subsites/light-blue.scss'),
// ),

export const loadables = {
  'subsite-light-blue': loadable(() =>
    import('@italia/config/Subsites/light-blue'),
  ),
  'subsite-light-pink': loadable(() =>
    import('@italia/config/Subsites/light-pink'),
  ),
  'subsite-light-teal': loadable(() =>
    import('@italia/config/Subsites/light-teal'),
  ),
  'subsite-light-yellow': loadable(() =>
    import('@italia/config/Subsites/light-yellow'),
  ),
  'subsite-magenta': loadable(() => import('@italia/config/Subsites/magenta')),
  'subsite-teal': loadable(() => import('@italia/config/Subsites/teal')),
  'subsite-white': loadable(() => import('@italia/config/Subsites/white')),
  'subsite-yellow': loadable(() => import('@italia/config/Subsites/yellow')),
};
