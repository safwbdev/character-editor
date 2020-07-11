export const createProject = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("PROJECT CREATE");
    // make async call to db
    console.log(data);
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .add({
        demo: data.demo,
        github: data.github,
        desc: data.desc,
        image: data.image,
        projectType: data.projectType,
        skillType: data.skillType,
        title: data.title,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", data });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const deleteProject = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    console.log("DELETE PROJECT");
    console.log(id);
    firestore
      .collection("projects")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_PROJECT", id });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};
