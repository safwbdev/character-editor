const initState = {};

const eduReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_EDUCATION":
      console.log("create education", action.edu);
      return state;
    case "CREATE_EDUCATION_ERROR":
      console.log("create education Error", action.err);
      return state;
    default:
      return state;
  }
};

export default eduReducer;
