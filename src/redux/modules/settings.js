import { createActions, handleActions, combineActions } from "redux-actions"

const defaultState = { theme:'dark' }

export const { toggleTheme } = createActions({
  TOGGLE_THEME: (isLight) => ({ isLight }),
})

const regionReducer = handleActions(
  {
    TOGGLE_THEME: (state, { payload: { isLight } }) => {
      const theme = isLight === true ? "light" : "dark"
      return {
        ...state,
        theme,
      }
    },
  },
  defaultState
)

export default regionReducer
