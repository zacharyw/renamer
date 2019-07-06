import { mount } from '@vue/test-utils';

import flushPromises from 'flush-promises';
import Remover from '../Remover.vue';

describe('Remover', () => {
  const wrapper = mount(Remover, {
    propsData: {
      originalFiles: [{ name: 'TestOne.png', file: 'file' }]
    }
  });

  let removeFrom = null;
  let index = null;
  let count = null;
  let countFromEnd = false;

  describe('#files', () => {
    beforeEach(async () => {
      const radio = wrapper.find('input[value="' + removeFrom + '"]');
      radio.setChecked();
      await flushPromises();

      wrapper
        .find({ ref: 'index' })
        .find('input')
        .setValue(index);
      await flushPromises();

      wrapper
        .find({ ref: 'count' })
        .find('input')
        .setValue(count);
      await flushPromises();

      wrapper.find('input[type="checkbox"]').setChecked(countFromEnd);
      await flushPromises();
    });

    describe('When removing only from fileName', () => {
      beforeAll(() => {
        removeFrom = 'fileName';
        index = 4;
        count = 5;
        countFromEnd = false;
      });

      it('Leaves extension intact', () => {
        expect(wrapper.vm.files).toEqual([{ name: 'Test.png', file: 'file' }]);
      });

      describe('When counting from end of string', () => {
        beforeAll(() => {
          countFromEnd = true;
        });

        it('Counts backwards from end of fileName', () => {
          expect(wrapper.vm.files).toEqual([{ name: 'Te.png', file: 'file' }]);
        });
      });
    });

    describe('When removing only from extension', () => {
      beforeAll(() => {
        removeFrom = 'extension';
        index = 2;
        count = 1;
        countFromEnd = false;
      });

      it('Leaves base filename in tact', () => {
        expect(wrapper.vm.files).toEqual([
          { name: 'TestOne.pg', file: 'file' }
        ]);
      });

      describe('When counting from end of string', () => {
        beforeAll(() => {
          countFromEnd = true;
        });

        it('Counts backwards from end of extension', () => {
          expect(wrapper.vm.files).toEqual([
            { name: 'TestOne.ng', file: 'file' }
          ]);
        });
      });
    });

    describe('When removing from whole name', () => {
      beforeAll(() => {
        removeFrom = 'both';
        index = 4;
        count = 5;
        countFromEnd = false;
      });

      it('Removes from whole name regardless of extension', () => {
        expect(wrapper.vm.files).toEqual([{ name: 'Testng', file: 'file' }]);
      });

      describe('When counting from end of string', () => {
        beforeAll(() => {
          countFromEnd = true;
        });

        it('Counts backwards from end of string', () => {
          expect(wrapper.vm.files).toEqual([{ name: 'TestOn', file: 'file' }]);
        });
      });
    });
  });
});
