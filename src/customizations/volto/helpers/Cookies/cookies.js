import config from '@plone/volto/registry';

export const getCookieOptions = (options = {}) => {
  const { path = '/', secure = false, ...otherOptions } = options;
  let secureOption = secure;
  console.log(options);

  try {
    if (secureOption === undefined || secureOption === null) {
      const protocol = window?.location?.protocol ?? 'http';
      secureOption = protocol.startsWith('https') ? true : false;
    }
  } catch (e) {
    //window is not defined. It's ssr and we use 'secure' option passed from param
  }

  console.log(options, secureOption, {
    path: path,
    expires: new Date(
      new Date().getTime() + config.settings.cookieExpires * 1000,
    ),
    secure: secureOption,
    ...otherOptions,
  });

  return {
    path: path,
    expires: new Date(
      new Date().getTime() + config.settings.cookieExpires * 1000,
    ),
    secure: secureOption,
    ...otherOptions,
  };
};
