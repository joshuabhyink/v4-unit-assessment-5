const initialState = {
  username: "",
  profile_pic: "",
};

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function logOut(){
    return {
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
      case UPDATE_USER:
          const {username, profile_pic} = action.payload.user
          return {...state, username, profile_pic}
      case LOGOUT:
          return {initialState}
    default:
      return state;
  }
}
