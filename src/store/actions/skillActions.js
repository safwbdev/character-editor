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
export const updateSkill = (id, skill) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    console.log("UPDATE SKILL");
    console.log(id);
    console.log(skill);
    firestore
      .collection("skills")
      .doc(id)
      .set({
        ...skill,
        name: skill.name,
        type: skill.type,
        icon: skill.icon,
      })
      .then(() => {
        dispatch({ type: "UPDATE_SKILL", skill });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_SKILL_ERROR", err });
      });
  };
};
