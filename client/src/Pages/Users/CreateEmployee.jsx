import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/\d/, "Must include a digit")
    .matches(/[@$!%*?&#]/, "Must include a special character")
    .required("Password is required"),
  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Use format: +1234567890")
    .required("Phone number is required"),
  email: Yup.string()
    .matches(
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
      "Email must contain '@' and a domain"
    )
    .email("Invalid email"),
});

const initialEmployeeState = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  phone: "",
  email: "",
};

const CreateUser = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //////////////////////////////////////// STATES /////////////////////////////////////
  // const [employeeData, setEmployeeData] = useState(initialEmployeeState);

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newErrors = {};

  //   if (!employeeData.firstName) newErrors.firstName = "First name is required";
  //   if (!employeeData.lastName) newErrors.lastName = "Last name is required";
  //   if (!employeeData.username) newErrors.username = "Username is required";
  //   if (!employeeData.password) newErrors.password = "Password is required";
  //   if (!employeeData.phone) newErrors.phone = "Phone number is required";

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length > 0) return;

  //   dispatch(createEmployee(employeeData, setOpen));
  //   setEmployeeData(initialEmployeeState);
  //   setErrors({});
  // };

  // const handleChange = (field, value) => {
  //   setEmployeeData((prevFilters) => ({ ...prevFilters, [field]: value }));
  // };

  const handleClose = () => {
    setOpen(false);
    // setEmployeeData(initialEmployeeState);
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Employee</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>{" "}
        <Formik
          initialValues={initialEmployeeState}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(createEmployee(values, setOpen));
            resetForm();
          }}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <DialogContent>
                <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
                  <div className="text-xl flex justify-start items-center gap-2 font-normal">
                    <PiNotepad size={23} />
                    <span>Employee Details</span>
                  </div>
                  <Divider />
                  <table className="mt-4">
                    <tbody>
                      <tr>
                        <td className="pb-4 text-lg">First Name</td>
                        <td className="pb-4">
                          <TextField
                            size="small"
                            fullWidth
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            error={
                              touched.firstName && Boolean(errors.firstName)
                            }
                            helperText={<ErrorMessage name="firstName" />}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-4 text-lg">Last Name</td>
                        <td className="pb-4">
                          <TextField
                            size="small"
                            fullWidth
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={<ErrorMessage name="lastName" />}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-4 text-lg">User Name</td>
                        <td className="pb-4">
                          <TextField
                            size="small"
                            fullWidth
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            error={touched.username && Boolean(errors.username)}
                            helperText={<ErrorMessage name="username" />}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-4 text-lg">Email</td>
                        <td className="pb-4">
                          <TextField
                            size="small"
                            fullWidth
                            placeholder="Optional"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={<ErrorMessage name="email" />}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-4 text-lg">Password</td>
                        <td className="pb-4">
                          <TextField
                            size="small"
                            fullWidth
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            error={touched.password && Boolean(errors.password)}
                            helperText={<ErrorMessage name="password" />}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-4 text-lg">Phone</td>
                        <td className="pb-4">
                          <TextField
                            size="small"
                            fullWidth
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={<ErrorMessage name="phone" />}
                          />
                        </td>
                      </tr>
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
    </div>
  );
};

export default CreateUser;
