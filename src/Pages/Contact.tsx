import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { ContactTypes } from "../Types/NavItems";

const Contact: React.FC = () => {

  return (
    <>
      <Grid
        container
        sx={{
          width: "80%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "",
        }}
      >
        <Grid item md={6} xs={12} sx={{display:{xs:"none",md:"block"}}} >
          <img src="/contact.png" alt="" width="300px"/>
          {/* <Box sx={{textAlign:"",display:"flex",gap:"2rem",justifyContent:"center",marginTop:"8px"}}>
           <Box> <Typography  sx={{ color: "#fff",fontWeight:"bold" }}>
              Call Us
            </Typography>
            <Typography sx={{ color: "#C31356" }}>+977 9849153576</Typography>
            </Box>
            <Box>
            <Typography  sx={{ color: "#fff",fontWeight:"bold" }}>
              Location
            </Typography>
            <Typography sx={{ color: "#C31356" }}>Balkot, Bhaktapur, Nepal</Typography>
            </Box>
          </Box> */}
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              description: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Name is required.").trim(),
              email: Yup.string().email().required("Email is required.").trim(),
              description: Yup.string()
                .required("Description is required.")
                .trim(),
            })}
            onSubmit={(values:ContactTypes) => {
              console.log(values);
            }}
          >
            {(formik:FormikProps<ContactTypes>) => (
              <form
                style={{
                  display: "flex",
                  width: "300px",
                  height:"375px",
                  flexDirection: "column",
                  gap: "1.5rem",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  padding: "1rem 2rem 4rem 2rem",
                  background: "#dddddd",
                }}
                onSubmit={formik.handleSubmit}
              >
                <Box>
                  <img src="../login icon.png" alt="" width="80px" />
                </Box>
                <Typography
                  variant="h6"
                  textAlign="start"
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    marginTop: "-20px",
                    textAlign:"center"
                  }}
                >
                  CONTACT US
                </Typography>
                {/* // user Name */}
                <FormControl sx={{ marginTop: "" }}>
                  <TextField
                    required
                    size="small"
                    label="Name"
                    {...formik.getFieldProps("name")}
                  ></TextField>
                  {formik.touched.name && formik.errors.name ? (
                    <FormHelperText error>{formik.errors.name}</FormHelperText>
                  ) : null}
                </FormControl>

                {/* // Email */}
                <FormControl sx={{ marginTop: "" }}>
                  <TextField
                    required
                    size="small"
                    label="Email"
                    {...formik.getFieldProps("email")}
                  ></TextField>
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                {/* // Description */}
                <FormControl sx={{ marginTop: "" }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    rows={4}
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <FormHelperText error>
                      {formik.errors.description}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ background: "#C31356",borderRadius:"20px","&:hover":{background:"#000"} }}
                >
                  Submit
                </Button>
                
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
