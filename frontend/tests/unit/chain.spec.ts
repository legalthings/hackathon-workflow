import { shallowMount } from '@vue/test-utils'
import Chain from '@/views/Chain.vue'

describe('Chain.vue', () => {
  it('renders props.msg when passed', () => {
    const chainId = '12345'
    const wrapper = shallowMount(Chain, {
      propsData: { chainId }
    })
    expect(wrapper.attributes('data-test')).toBe(chainId)
  })
})
