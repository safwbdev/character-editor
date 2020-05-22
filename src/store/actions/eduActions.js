export const createEducation = (edu) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    firestore
      .collection("education")
      .add({
        ...edu,
        name: "school name",
        location: "KL",
        startDate: "2011",
        endDate: "2017",
        photoId: null,
        photoUrl: null,
        author: "Stefaan",
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_EDUCATION", edu });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_EDUCATION_ERROR", err });
      });
  };
};
