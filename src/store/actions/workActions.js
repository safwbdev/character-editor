export const createWork = (work) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    firestore
      .collection("work")
      .add({
        ...work,
        name: "school name",
        location: "KL",
        startDate: "2011",
        endDate: "2017",
        photoId: null,
        photoUrl: null,
        role: "dev",
        author: "Stefaan",
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_WORK", work });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_WORK_ERROR", err });
      });
  };
};
export const deleteWork = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    console.log("DELETE WORK");
    console.log(id);
    firestore
      .collection("work")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_WORK", id });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_WORK_ERROR", err });
      });
  };
};
