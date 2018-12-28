'use strict';

module.exports = function(environment/*, appConfig */) {
  let ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'Y1OMR4C7MF';
  let ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY || 'c35425b69b31be1bb4786f0a72146306';

  let ENV = {
    'ember-algolia': {
      algoliaId: 'Y1OMR4C7MF',
      algoliaKey: '5d01c83734dc36754d9e94cbf6f8964d'
    },

    deprecationsGuideURL: 'https://www.emberjs.com/deprecations/',

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.testing = true;

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['ember-tether'] = {
      bodyElementId: 'ember-testing'
    };

  }

    return ENV;
};
