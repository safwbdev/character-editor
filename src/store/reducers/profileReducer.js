const initState = {};

const eduReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROFILE":
      console.log("create profile", action.edu);
      return state;
    case "CREATE_PROFILE_ERROR":
      console.log("create profile Error", action.err);
      return state;
    case "EDIT_PROFILE":
      console.log("edit profile", action.edu);
      return state;
    case "EDIT_PROFILE_ERROR":
      console.log("edit profile Error", action.err);
      return state;
    case "DELETE_PROFILE":
      console.log("create profile", action.edu);
      return state;
    case "DELETE_PROFILE_ERROR":
      console.log("create profile Error", action.err);
      return state;
    default:
      return state;
  }
};

export default eduReducer;
