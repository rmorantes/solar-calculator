const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MAP':
      state.map = action.map
      return state
    default:
      return state
  }
}

export default reducer
