import { LOGIN_SUCCESS } from './actionTypes';

const initialState = {
  userId: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
