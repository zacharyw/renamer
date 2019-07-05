import { mount } from '@vue/test-utils';

import flushPromises from 'flush-promises';
import Append from '../Append.vue';

describe('Append', () => {
  const wrapper = mount(Append, {
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

    describe('When appending after extension', () => {
      beforeEach(async () => {
        const radio = wrapper.find('input[value="extension"]');
        radio.setChecked();
        await flushPromises();
      });

      it('Returns file with text at end of name', async () => {
        expect(wrapper.vm.files).toEqual([
          { name: 'TestOne.pngTwo', file: 'file' }
        ]);
      });
    });

    describe('When appending after base filename', () => {
      beforeEach(async () => {
        const radio = wrapper.find('input[value="fileName"]');
        radio.setChecked();
        await flushPromises();
      });

      it('Returnes files with text before .extension', async () => {
        expect(wrapper.vm.files).toEqual([
          { name: 'TestOneTwo.png', file: 'file' }
        ]);
      });
    });
  });
});
