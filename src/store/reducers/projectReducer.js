const initState = {};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      console.log("create project", action.project);
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("create project Error", action.err);
      return state;
    case "DELETE_PROJECT":
      console.log("delete project", action.project);
      return state;
    case "DELETE_PROJECT_ERROR":
      console.log("delete project Error", action.err);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
