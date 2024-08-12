import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  it('should set placeholder image when handleImageError is called', () => {
    wrapper.vm.handleImageError()
    expect(wrapper.vm.imageSrc).toBe('https://via.placeholder.com/750x600?text=No+Meow+Found')
    expect(wrapper.vm.isPlaceholder).toBe(true)
  })

  it('should show warning message and shake screen for invalid status code', async () => {
    const invalidStatusCode = '999'
    wrapper.vm.httpStatusCode = invalidStatusCode

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.warningMessage).toBe("Whoa! That's not a valid cat status!")
    expect(wrapper.vm.imageSrc).toBe('https://via.placeholder.com/750x600?text=No+Meow+Found')
    expect(wrapper.vm.isPlaceholder).toBe(true)
    expect(wrapper.vm.showReadMore).toBe(false)
  })

  it('should not show warning message and display correct image for valid status code', () => {
    const validStatusCode = '200' // A valid HTTP status code
    wrapper.vm.httpStatusCode = validStatusCode

    wrapper.vm.handleSubmit()

    expect(wrapper.vm.warningMessage).toBe('')
    expect(wrapper.vm.imageSrc).toBe(`https://http.cat/${validStatusCode}`)
    expect(wrapper.vm.isPlaceholder).toBe(false)
    expect(wrapper.vm.showReadMore).toBe(true)
  })
})
