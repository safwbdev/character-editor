export const createSkill = (skill) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    console.log("CREATE SKILL");
    firestore
      .collection("skills")
      .add({
        ...skill,
      })
      .then(() => {
        dispatch({ type: "CREATE_SKILL", skill });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_SKILL_ERROR", err });
      });
  };
};
