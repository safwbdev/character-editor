const initState = {
  projects: [
    { id: "1", title: "help me find peach", content: "blah blah blah" },
    { id: "2", title: "collect all the stars", content: "blah blah blah" },
    { id: "3", title: "egg hunt with yoshi", content: "blah blah blah" },
  ],
};

const skillReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SKILL":
      console.log("create skill", action.skill);
      return state;
    case "CREATE_SKILL_ERROR":
      console.log("create skill Error", action.err);
      return state;
    default:
      return state;
  }
};

export default skillReducer;
