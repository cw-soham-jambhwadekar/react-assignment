import "@testing-library/jest-dom"
import { vi } from "vitest"
import axios from "axios"

class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver


vi.mock("axios")

axios.get.mockResolvedValue({
  data: []
})

axios.post.mockResolvedValue({
  data: []
})