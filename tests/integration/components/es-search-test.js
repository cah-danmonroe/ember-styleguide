// import { render } from '@ember/test-helpers';
// import { module, test } from 'qunit';
// import { setupRenderingTest } from 'ember-qunit';
// import hbs from 'htmlbars-inline-precompile';

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, waitFor} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';


module('Integration | Component | es search', function(hooks){
  setupRenderingTest(hooks);

  test('search hits display content', async function(assert) {

    let searchService = this.owner.lookup('service:search');

    set(searchService, 'doSearch', () => {
      return [{"file":"packages/ember-routing/lib/system/route.js","line":1505,"module":"@ember/routing","class":"Route","name":"model","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"model"},"objectID":"180742570","_highlightResult":{"name":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1505,"module":"@ember/routing","class":"Route","name":"model","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"model"},"objectID":"168075472","_highlightResult":{"name":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>","matchLevel":"full","fullyHighlighted":true,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1879,"module":"@ember/routing","class":"Route","name":"modelFor","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"modelFor"},"objectID":"180742650","_highlightResult":{"name":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]}}}},{"file":"packages/ember-routing/lib/system/route.js","line":1879,"module":"@ember/routing","class":"Route","name":"modelFor","access":"public","_tags":["module:@ember/routing","version:3.5.1","since:3.5.1"],"hierarchy":{"lvl0":"@ember/routing","lvl1":"Route","lvl2":"modelFor"},"objectID":"168075552","_highlightResult":{"name":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]},"hierarchy":{"lvl0":{"value":"@ember/routing","matchLevel":"none","matchedWords":[]},"lvl1":{"value":"Route","matchLevel":"none","matchedWords":[]},"lvl2":{"value":"<em>model</em>For","matchLevel":"full","fullyHighlighted":false,"matchedWords":["model"]}}}}];

      /*
      {html: "<section aria-labelledby="toc_how-to-run-your-test…he  file in your application root.</p>↵</section>", content: "↵Run your tests with  on the command-line. You can…Testem using the  file in your application root.↵", headings: Array(2), anchor: "toc_how-to-run-your-tests", node: {…}, …}
anchor: "toc_how-to-run-your-tests"
content: "↵Run your tests with  on the command-line. You can re-run your tests on every file-change with .↵Tests can also be executed when you are running a local development server (started by running ),↵at the  URI which renders the  template.↵These commands run your tests using Testem to make testing multiple browsers very easy.↵You can configure Testem using the  file in your application root.↵"
customRanking: {position: 5, heading: 70}
headings: (2) ["↵  Introduction↵", "How to Run Your Tests"]
html: "<section aria-labelledby="toc_how-to-run-your-tests">↵<p>Run your tests with  on the command-line. You can re-run your tests on every file-change with .</p>↵<p>Tests can also be executed when you are running a local development server (started by running ),↵at the  URI which renders the  template.</p>↵<p>These commands run your tests using <a href="https://github.com/airportyh/testem">Testem</a> to make testing multiple browsers very easy.↵You can configure Testem using the  file in your application root.</p>↵</section>"
node: {}
objectID: "v3.6.0-b01a9cb7a018b9403d781e1f8a513e34"
path: "testing"
version: "v3.6.0"
_highlightResult: {content: {…}, headings: Array(2)}
       */
    });



    // TODO
    // pass in type:  api-docs or guides - search results payload will be different
    // pass in algoliaKey and algoliaId.   set on client = get(this, '_searchClient');
    // figure out the display
    //   maybe do a map of the results to make the model the same


    await this.render(hbs`<EsSearch />`);

    await fillIn('#search-input', 'model');

    await waitFor('.ds-suggestion');

    assert.dom('.algolia-docsearch-suggestion--content').exists({count: 4});
  });


  test('no search hits display no results', async function(assert) {

    let searchService = this.owner.lookup('service:search');

    set(searchService, 'doSearch', () => {
      return [];
    });

    await this.render(hbs`<EsSearch />`);

    await fillIn('#search-input', 'model');

    assert.dom('.algolia-docsearch-suggestion--noresults').exists();
  });

});
