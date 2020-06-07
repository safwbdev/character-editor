export const createEducation = (edu, url, photoID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    firestore
      .collection("education")
      .add({
        ...edu,
        photoUrl: url,
        photoID: photoID,
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

export const deleteEducation = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    console.log("DELETE EDUCATION");
    console.log(id);
    firestore
      .collection("education")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_EDUCATION", id });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_EDUCATION_ERROR", err });
      });
  };
};
