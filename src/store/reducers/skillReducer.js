const initState = {};

const skillReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_SKILL":
      console.log("create skill", action.skill);
      return state;
    case "CREATE_SKILL_ERROR":
      console.log("create skill Error", action.err);
      return state;
    case "UPDATE_SKILL":
      console.log("update skill", action.skill);
      return state;
    case "UPDATE_SKILL_ERROR":
      console.log("update skill Error", action.err);
      return state;
    default:
      return state;
  }
};

export default skillReducer;
