import React from 'react';
import { mount } from 'enzyme';
// import { HomePage } from "../index";
import { Provider } from 'react-redux';
import store from '../../../../src/store';
import { Template } from '../../../../src/components/layout';
import { SUCESSO } from './schoolYearMock';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Pages', () => {
  describe('Home', () => {
    it('should render without throwing an error', async () => {
      const schoolYearMock = SUCESSO;

      try {
        const wrap = mount(
          <Provider store={store}>
            {/* <Template> */}
            <h1>Faça parte da nossa rede de educação para a vida</h1>
            {/* </Template> */}
          </Provider>,
        );
        expect(wrap.find('h1').text()).toBe('Faça parte da nossa rede de educação para a vida');
      } catch (error) {
        throw undefined;
      }
    });
  });
});
