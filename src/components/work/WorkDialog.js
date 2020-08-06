import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, name, tasks } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      className="task-dialogbox"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Tasks at
        <br />
        {name}
      </DialogTitle>
      <DialogContent>
        <ul className="desc-list">
          {tasks.map((data, index) => {
            return <li key={index}>{data}</li>;
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const SimpleDialogDemo = ({ name, tasks }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        className="task-button"
        onClick={handleClickOpen}
      >
        View Tasks
      </Button>
      <SimpleDialog
        name={name}
        tasks={tasks}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};
export default SimpleDialogDemo;
