import { mount } from '@vue/test-utils'
import chatBot from '@/components/chatBot.vue'

describe('load ChatBot Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(chatBot)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
