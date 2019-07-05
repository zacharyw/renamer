import { mount } from '@vue/test-utils';

import flushPromises from 'flush-promises';
import Insert from '../Insert.vue';

describe('Insert', () => {
  const wrapper = mount(Insert, {
    propsData: {
      originalFiles: [{ name: 'TestOne.png', file: 'file' }]
    }
  });

  describe('#files', () => {
    beforeEach(async () => {
      const text = wrapper.find('input[type="text"]');
      text.setValue('Two');
      await flushPromises();

      const index = wrapper.find('input[type="number"]');
      index.setValue(4);
      await flushPromises();
    });

    describe('When counting index from beginning', () => {
      beforeEach(async () => {
        wrapper.find('input[type="checkbox"]').setChecked(false);
        await flushPromises();
      });

      it('Inserts text at index counted from beginning', () => {
        expect(wrapper.vm.files).toEqual([
          {
            name: 'TestTwoOne.png',
            file: 'file'
          }
        ]);
      });
    });

    describe('When counting index from end', () => {
      beforeEach(async () => {
        wrapper.find('input[type="checkbox"]').setChecked(true);
        await flushPromises();
      });

      it('Inserts text at index counted from end', () => {
        expect(wrapper.vm.files).toEqual([
          {
            name: 'TestOneTwo.png',
            file: 'file'
          }
        ]);
      });
    });
  });
});
