import Component from '@ember/component';
import layout from '../templates/components/es-search';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { get, set, computed } from '@ember/object';
import { and } from '@ember/object/computed';
// import { isPresent, isEmpty } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';
import { getOwner } from '@ember/application';

const SEARCH_DEBOUNCE_PERIOD = 300;
const SEARCH_CLOSE_PERIOD = 200;

export default Component.extend({
  layout,

  classNames: ['es-search', 'search-input'],
  ariaRole: 'search',

  searchService: service('search'),
  _results: A(),
  _focused: false,
  _resultTetherConstraints: Object.freeze([
    {
      to: 'window',
      pin: ['left','right']
    }
  ]),

  showDropdown: and('query', '_focused'),

  init() {
    this._super(...arguments);
    const config = getOwner(this).resolveRegistration('config:environment');
    this.deprecationsGuideURL = config['deprecationsGuideURL'];
  },


  search: task(function * (query) {

    yield timeout(SEARCH_DEBOUNCE_PERIOD);

    set(this, 'query', query);

    // Hide and don't run query if there's no search query
    if (!query) {
      return set(this, '_focused', false);
    }

    // ensure search results are visible if the menu was previously closed above
    set(this, '_focused', true);

    yield get(this, 'searchService.search').perform(query);

  }).restartable(),

  closeMenu: task(function * () {
    yield timeout(SEARCH_CLOSE_PERIOD);

    set(this, '_focused', false);
  }),

  actions: {

    onfocus() {
      set(this, '_focused', true);
    },

    onblur() {
      this.get('closeMenu').perform();
    }

  }
});
