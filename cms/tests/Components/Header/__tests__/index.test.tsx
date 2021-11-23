import React from 'react';
import { mount } from 'enzyme';
import store from '@/store';
import { Provider } from 'react-redux';
import { Header } from '@/components/shared/Header';
import { Translation } from 'react-i18next';
import { UserLogin } from './sessionMock';

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

describe('Components.Shared', () => {
  describe('Header Loged', () => {
    it('Check User Loged', async () => {
      try {
        const wrap = mount(
          <Provider store={store}>
            <Translation>{(t) => <Header translation={t} Session={UserLogin} handleLogin={null} />}</Translation>
          </Provider>,
        );

        expect(wrap.find('div')).toBe(true);
      } catch (error) {
        throw undefined;
      }
    });
  });
});
