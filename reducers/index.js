export const initialState = {
    user: '',
    can_edit: false,
    rapid_api_key: ''
}

function rootReducer(state = initialState, action) {
  if (action.type === 'UPDATE_STATE') {
    return Object.assign({}, state, action.payload);
  }
  return state;
}

export default rootReducer;