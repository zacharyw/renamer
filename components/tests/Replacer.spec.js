import { mount } from '@vue/test-utils';

import flushPromises from 'flush-promises';
import Replacer from '../Replacer';

describe('Replacer', () => {
  const wrapper = mount(Replacer, {
    propsData: {
      originalFiles: [{ name: 'TestOne', file: 'file' }]
    }
  });

  describe('#files', () => {
    it('Returnes files renamed with given patterns', async () => {
      const textArea = wrapper.find('.textarea');
      textArea.setValue('Test,Real');
      await flushPromises();

      expect(wrapper.vm.files).toEqual([{ name: 'RealOne', file: 'file' }]);
    });
  });
});
