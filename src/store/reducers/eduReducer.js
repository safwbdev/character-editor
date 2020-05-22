const initState = {
  projects: [
    { id: "1", title: "help me find peach", content: "blah blah blah" },
    { id: "2", title: "collect all the stars", content: "blah blah blah" },
    { id: "3", title: "egg hunt with yoshi", content: "blah blah blah" },
  ],
};

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
