import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import FilterBox from "../components/FilterBox"
import { FUEL_MAP } from "../utils"

const mockStore = configureStore([])

function renderWithStore(initialState) {
  const store = mockStore(initialState)

  return {
    store,
    ...render(
      <Provider store={store}>
        <FilterBox />
      </Provider>
    )
  }
}

describe("FilterBox", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      filters: {
        fuel: [],
        budget: [0, 21],
        make: []
      },
      filtersData: {
        makes: {
          Toyota: "toyota",
          Honda: "honda"
        }
      }
    }
  })

  test("renders filter header", () => {
    renderWithStore(initialState)

    expect(
      screen.getByRole("heading", { name: /filters/i })
    ).toBeInTheDocument()
  })

  test("toggles budget section", async () => {
    const user = userEvent.setup()
    renderWithStore(initialState)

    const toggle = screen.getByRole("button", { name: /budget/i })

    const budgetBox = document.querySelector(".budget-option-list")
    expect(budgetBox).toHaveClass("open")

    await user.click(toggle)

    expect(budgetBox).not.toHaveClass("open")
  })

  test("checks fuel option and dispatches action", async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(initialState)

    const fuelLabel = Object.keys(FUEL_MAP)[0]
    const checkbox = screen.getByLabelText(fuelLabel)

    await user.click(checkbox)

    const actions = store.getActions()
    expect(actions.length).toBe(1)
    expect(actions[0].type).toMatch(/UPDATE_FUEL/i)
  })

  test("checks make option and dispatches action", async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(initialState)

    const checkbox = screen.getByLabelText("Toyota")

    await user.click(checkbox)

    const actions = store.getActions()
    expect(actions[0].type).toMatch(/UPDATE_MAKE/i)
  })

  test("updates budget input and dispatches action", async () => {
    const user = userEvent.setup()
    const { store } = renderWithStore(initialState)

    const fromInput = screen.getByPlaceholderText("From")

    await user.clear(fromInput)
    await user.type(fromInput, "5")

    const actions = store.getActions()

    expect(actions[actions.length - 1].type).toMatch(/UPDATE_BUDGET/i)
    expect(actions[actions.length - 1].payload).toEqual([5, 21])
  })

  test("renders CityFilter component", () => {
    renderWithStore(initialState)

    expect(
      screen.getByTestId("city-filter")
    ).toBeInTheDocument()
  })
})
