/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-21 13:38
 * @LastAuthor : wangchao
 * @LastTime   : 2023-07-21 13:55
 * @desc       :
 */

import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import HelloWorldVue from '../HelloWorld.vue';

describe('porps test', () => {
  test('props', () => {
    const wrapper = shallowMount(HelloWorldVue, {
      props: {
        msg: '123',
      },
    });

    expect(wrapper.find('#aaa').text()).toBe('123');
  });
});
