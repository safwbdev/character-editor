export const createSkill = (skill) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    firestore
      .collection("skills")
      .add({
        // ...skill,
        name: "new skill",
        type: "new type",
        icon: ["fab", "icon"],
        // author: "Stefaan",
        // createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_SKILL", skill });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_SKILL_ERROR", err });
      });
  };
};
