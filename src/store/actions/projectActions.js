export const createProject = (project, url, skillArray) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("PROJECT CREATE");
    console.log(project);
    console.log(url);
    console.log(skillArray);
    // make async call to db
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .add({
        ...project,
        // title: project.name,
        // desc: project.desc,
        stacks: skillArray,
        photoUrl: url,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
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
