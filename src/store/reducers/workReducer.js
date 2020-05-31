const initState = {
  projects: [
    { id: "1", title: "help me find peach", content: "blah blah blah" },
    { id: "2", title: "collect all the stars", content: "blah blah blah" },
    { id: "3", title: "egg hunt with yoshi", content: "blah blah blah" },
  ],
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_WORK":
      console.log("create work", action.work);
      return state;
    case "CREATE_WORK_ERROR":
      console.log("create work Error", action.err);
      return state;
    case "DELETE_WORK":
      console.log("create work", action.work);
      return state;
    case "DELETE_WORK_ERROR":
      console.log("create work Error", action.err);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
