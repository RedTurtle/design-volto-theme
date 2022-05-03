import config from '@plone/volto/registry';

export const getCookieOptions = (options = {}) => {
  const { path = '/', secure = false, ...otherOptions } = options;
  let secureOption = secure;

  console.log(
    options,
    secureOption,
    window?.location?.protocol,
    window?.location?.protocol?.startsWith('https'),
  );
  try {
    if (secureOption === undefined || secureOption === null) {
      const protocol = window?.location?.protocol ?? 'http';
      secureOption = protocol.startsWith('https') ? true : false;
    }
  } catch (e) {
    //window is not defined. It's ssr and we use 'secure' option passed from param
  }

  return {
    path: path,
    expires: new Date(
      new Date().getTime() + config.settings.cookieExpires * 1000,
    ),
    secure: secureOption,
    ...otherOptions,
  };
};
