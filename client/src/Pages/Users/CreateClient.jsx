import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { createClient } from "../../redux/action/user.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Use format: +1234567890")
    .required("Phone is required"),
  email: Yup.string()
    .matches(
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      "Email must contain '@' and a domain"
    )
    .email("Invalid email"),
});

const initialClientState = {
  firstName: "",
  lastName: "",
  username: "",
  phone: "",
  email: "",
};

const CreateClient = ({ open, setOpen, scroll }) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll={scroll}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
    >
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Add New Client</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <Formik
        initialValues={initialClientState}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(createClient(values, setOpen));
          resetForm();
          setOpen(false);
        }}
      >
        {({ values, handleChange, touched, errors }) => (
          <Form>
            <DialogContent>
              <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
                <div className="text-xl flex items-center gap-2 font-normal">
                  <PiNotepad size={23} />
                  <span>Client Details</span>
                </div>
                <Divider />
                <table className="mt-4">
                  <tbody>
                    {[
                      ["First Name", "firstName"],
                      ["Last Name", "lastName"],
                      ["Client Username", "username"],
                      ["Email", "email"],
                      ["Phone", "phone"],
                    ].map(([label, name, type = "text"]) => (
                      <tr key={name}>
                        <td className="pb-4 text-lg">{label}</td>
                        <td className="pb-4">
                          <TextField
                            size="small"
                            fullWidth
                            type={type}
                            name={name}
                            value={values[name]}
                            onChange={handleChange}
                            error={touched[name] && Boolean(errors[name])}
                            helperText={<ErrorMessage name={name} />}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DialogContent>
            <DialogActions>
              <button
                type="button"
                onClick={handleClose}
                className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
              >
                {isFetching ? "Submitting..." : "Submit"}
              </button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateClient;
