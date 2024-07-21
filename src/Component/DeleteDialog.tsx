import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useMutation, useQueryClient } from 'react-query';
import $axios from '../lib/axios.instance';
import Loading from './Loading';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

type DeleteDialogProps = {
    _id: number;
  };



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog:React.FC<DeleteDialogProps> =({_id})=> {
    const queryClient = useQueryClient();
    const [open, setOpen] = React.useState(false);

    // For Delete Api hit
    const { isLoading, mutate: mutateDelete } = useMutation({
      mutationKey: ["card-delete"],
      mutationFn: async () => {
        return await $axios.delete(`/delete/${_id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("card-list");
      },
    });
    if (isLoading) {
      return <Loading />;
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
          aria-label="delete"
          onClick={handleClickOpen}
        >
          <DeleteIcon sx={{ fontSize: "20px" }} />
        </IconButton> 
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{background:"#0000007d",backdropFilter:"blur(2px)"}}
      >
        <DialogTitle>{"Are you sure you want delete this card?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           This will delete this post permanently. You cannot undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>No</Button>
          <Button variant='contained' onClick={()=>{
            handleClose()
            mutateDelete()

          }}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default DeleteDialog