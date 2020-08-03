export const editProfile = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to db
    const firestore = getFirestore();
    firestore
      .collection("profile")
      .doc("main")
      .set({
        ...data,
      })
      .then(() => {
        dispatch({ type: "EDIT_PROFILE", data });
      })
      .catch((err) => {
        dispatch({ type: "EDIT_PROFILE_ERROR", err });
      });
  };
};
