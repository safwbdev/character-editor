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
