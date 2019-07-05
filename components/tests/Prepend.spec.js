import { mount } from '@vue/test-utils';

import flushPromises from 'flush-promises';
import Prepend from '../Prepend.vue';

describe('Prepend', () => {
  const wrapper = mount(Prepend, {
    propsData: {
      originalFiles: [{ name: 'TestOne.png', file: 'file' }]
    }
  });

  describe('#files', () => {
    beforeEach(async () => {
      const text = wrapper.find('input');
      text.setValue('Two');
      await flushPromises();
    });

    it('Inserts text at the beginning of filename', () => {
      expect(wrapper.vm.files).toEqual([
        {
          name: 'TwoTestOne.png',
          file: 'file'
        }
      ]);
    });
  });
});
