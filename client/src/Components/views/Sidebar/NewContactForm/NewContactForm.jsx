import React, {useState} from 'react';
import { IconButton,Tooltip,Button,TextField,Dialog,DialogActions,DialogContent, DialogTitle  } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FormDialog({onChange}) {
  const [open, setOpen] = useState(false);
  const user=useSelector((state)=>state.user);

  const validationSchema=Yup.object({
    name: Yup.string().min(5,"Must be 5 character long").required("Name required"),
    email: Yup.string().email("Email is invalid").required("Email required")
  })

  const { handleSubmit, handleChange, values, errors, touched}=useFormik({
    initialValues:{
      name:"",
      email:""
    },
    validationSchema,
    onSubmit(values,{ setSubmitting }){
          const variable={...values, email: values.email.toLowerCase(),userId:user?.userData?._id};
          axios.post('/api/room/createContact',variable).then((response)=>{
            if(response.data.success){
              onChange(response.data.roomDetail);
            }else if(response.data.message){
              alert(response.data.message);
            }else{
              alert("Can't create room ");
            }
          })
          values.name="";
          values.email="";
          setSubmitting(false);
          setOpen(false);
    }
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    values.name="";
    values.email="";
    setOpen(false);
  };


  return (
    <>
      <Tooltip title="Add Contact">
        <IconButton onClick={handleClickOpen}>
            <Add />
       </IconButton>
     </Tooltip>
     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
          <TextField
          error={errors.name && touched.name}
          helperText={touched.name && errors.name}
          autoFocus
          margin="dense"
          id="name"
          label="Room Name"
          type="text"
          variant="outlined"
          fullWidth
          value={values.name}
          onChange={handleChange}
          />
          <TextField
          error={errors.email && touched.email}
          helperText={touched.email && errors.email}
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          value={values.email}
          onChange={handleChange}
          />
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">
            Save
            </Button>
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          </DialogActions>
          </form>
        </DialogContent>
    </Dialog>
    </>
  );
}