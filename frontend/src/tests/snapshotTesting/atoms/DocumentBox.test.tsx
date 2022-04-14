import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../state/store';

import DocumentBox from '../../../components/atoms/DocumentBox';
import { Document } from '../../../types/ontologyTypes';
import LanguagesList from '../../../localization/languages';

const testDocs: Document[][] = [];
const testFormats = ['pdfa2a', 'fmx4', 'xhtml'];
const testCelex = 'testCelex';
const testTitle = 'testTitle';
const testUrl = 'testUrl';

LanguagesList.map((language) => {
    let commonLangDocs: Document[] = [];
    testFormats.map((format) => {
        let doc: Document = {
            celexID: testCelex,
            title: testTitle,
            language: language.ISO_639_2T.toString(),
            format: format,
            url: testUrl
        }
        commonLangDocs.push(doc);
    });
    testDocs.push(commonLangDocs);
});

it('renders with a list of dummy docs', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <DocumentBox commonCelexDocuments={testDocs} />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});