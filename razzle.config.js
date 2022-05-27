/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

const jsConfig = require('./jsconfig').compilerOptions;
const path = require('path');

const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const fileLoaderFinder = makeLoaderFinder('file-loader');
const projectRootPath = path.resolve('.');

const pathsConfig = jsConfig.paths;
let voltoPath = path.resolve('./node_modules/@plone/volto');
Object.keys(pathsConfig).forEach((pkg) => {
  if (pkg === '@plone/volto') {
    voltoPath = path.resolve(`./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`);
  }
});

const volto_config = require(`${voltoPath}/razzle.config`);

module.exports = Object.assign({}, volto_config, {
  modifyWebpackConfig: ({
    env: { target, dev },
    webpackConfig,
    webpackObject,
  }) => {
    const base_config = volto_config.modifyWebpackConfig({
      env: { target, dev },
      webpackConfig,
      webpackObject,
    });

    const fileLoader = base_config.module.rules.find(fileLoaderFinder);
    fileLoader.exclude = [
      /bootstrap-italia\/src\/svg\/.*\.svg$/,
      ...fileLoader.exclude,
    ];

    const SVG_LOADER = {
      test: /bootstrap-italia\/src\/svg\/.*\.svg$/,
      use: [
        {
          loader: 'svg-loader',
        },
        {
          loader: 'svgo-loader',
          options: {
            plugins: [
              { removeTitle: true },
              { convertPathData: false },
              { removeUselessStrokeAndFill: true },
              { removeViewBox: false },
            ],
          },
        },
      ],
    };

    const TO_WEBP_LOADER = {
      test: /\.(gif|png|jpe?g)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            //bypassOnDebug: true, // webpack@1.x
            //disable: true, // webpack@2.x and newer //

            //Compress JPEG images
            mozjpeg: {
              progressive: true,
              enabled: false,
            },
            //Compress PNG images
            optipng: {
              enabled: false,
            },
            //Compress PNG images
            pngquant: {
              quality: [0.65, 0.9],
              speed: 4,
              enabled: false,
            },
            //Compress SVG images
            svgo: {
              enabled: false,
            },
            //Compress GIF images
            gifsicle: {
              interlaced: false,
              enabled: false,
            },
            //Compress JPG & PNG images into WEBP. The webp option will enable WEBP
            webp: {
              quality: 85,
              enabled: true,
            },
          },
        },
      ],
    };

    base_config.module.rules.push(SVG_LOADER);

    base_config.module.rules.push(TO_WEBP_LOADER);

    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      ...base_config.resolve.alias,
      '../../theme.config$': `${projectRootPath}/theme/theme.config`,

      '@plone/volto': `${voltoPath}/src`,
      // to be able to reference path uncustomized by webpack
      '@plone/volto-original': `${voltoPath}/src`,
      // be able to reference current package from customized package
      '@italia': `${projectRootPath}/src`,
    };

    return base_config;
  },
  plugins: [
    ...(volto_config.plugins || {}),

    {
      name: 'scss',
      options: {
        sass: {
          dev: {
            outputStyle: 'expanded',
            sourceMap: true,
            includePaths: ['node_modules'],
          },
          prod: {
            outputStyle: 'expanded',
            sourceMap: true,
            includePaths: ['node_modules'],
          },
        },
      },
    },
  ],
});
