import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import $axios from "../lib/axios.instance";

const AddPhoto = () => {
  const [weddingImg, setWeddingImg] = useState<File | null>(null);
  const [localUrl, setLocalUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Choose image to change function
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setWeddingImg(file);
      setLocalUrl(URL.createObjectURL(file));
    }
  };
  // Choose image Remove function
  const handleRemoveImage = () => {
    setWeddingImg(null);
    setLocalUrl(null);
    // clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const minDate = dayjs().startOf("d").subtract(18, "y");
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationKey: ["add-card"],
    mutationFn: async (value: {
      title: string;
      description: string;
      postDate: string;
      image: string;
    }) => {
      return await $axios.post("/card/create", value);
    },
    onSuccess: () => {
      navigate("/gallery");
      queryClient.invalidateQueries("card-list");
    },
    onError: () => {},
  });
  const [imageLoading, setImageLoading] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          background: "",
        }}
      >
        <Formik
          initialValues={{
            title: "",
            description: "",
            image: "",
            postDate: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            image: Yup.string().nullable(),
            postDate: Yup.date().required("Post Date is required"),
          })}
          onSubmit={async (value: {
            title: string;
            description: string;
            postDate: string;
            image: string;
          }) => {
            let imageUrl;
            if (weddingImg) {
              const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
              const uploadPreset = import.meta.env
                .VITE_CLOUDINARY_UPLOAD_PRESET;
              const data = new FormData();
              data.append("file", weddingImg);
              data.append("upload_preset", uploadPreset);
              data.append("cloud_name", cloudname);
              try {
                setImageLoading(true);
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudname}/upload`,
                  data
                );
                setImageLoading(false);
                imageUrl = res?.data?.url;
                console.log(imageUrl);
              } catch (error) {
                console.log("Image upload failed...");
                setImageLoading(false);
              }
            }
            value.image = imageUrl;
            // console.log(value);
            mutate(value);
          }}
        >
          {({
            handleSubmit,
            getFieldProps,
            touched,
            errors,
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                padding: "2rem",
                // marginBottom: "20px",
                background: "white",
                position: "relative",
              }}
            >
              <Typography
                textAlign="start"
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                Add New Photo
              </Typography>
              <Grid container spacing={"1rem"}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                >
                  {/* For Title */}
                  <FormControl>
                    <TextField
                      size="small"
                      label="Title"
                      {...getFieldProps("title")}
                    ></TextField>
                    {touched.title && errors.title ? (
                      <FormHelperText error>{errors.title}</FormHelperText>
                    ) : null}
                  </FormControl>

                  {/* For Description */}

                  <FormControl>
                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      placeholder="Type Your Wedding Description"
                      {...getFieldProps("description")}
                    />

                    {touched.description && errors.description ? (
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    ) : null}
                  </FormControl>

                  {/* For image */}

                  <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          minDate={minDate}
                          label="Post Date"
                          onChange={(event) => {
                            console.log(event);
                            {
                              setFieldValue(
                                "postDate",
                                dayjs(event).format("DD/MM/YYYY")
                              );
                            }
                          }}
                          sx={{ width: "100%" }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>

                    {touched.postDate && errors.postDate ? (
                      <FormHelperText error>{errors.postDate}</FormHelperText>
                    ) : null}
                  </FormControl>

                  <input
                    type="file"
                    style={{ color: "black", marginBottom: "1rem" }}
                    aria-label="Upload Image"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ background: "", width: "100%", height: "" }}
                >
                  {/* For generate URL from Cloudinary */}
                  {weddingImg && localUrl ? (
                    <Box
                      sx={{
                        background: "red",
                        width: "100%",
                        height: "325px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={localUrl}
                        alt="Selected"
                        width="100%"
                        height="350px"
                      />
                      <IconButton
                        aria-label="delete"
                        onClick={handleRemoveImage}
                        sx={{
                          color: "#ffff",
                          position: "absolute",
                          top: "0",
                          right: "0",
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box>
                      <img src="./prev.jpg" alt="No Image" width={"200px"} />
                      <Typography sx={{ color: "#424242", fontSize: "30px" }}>
                        No Preview Available
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || imageLoading}
                sx={{
                  background: "#C31356",
                  "&:hover": { background: "#000" },
                }}
              >
                {imageLoading ? "Uploading..." : "Submit"}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddPhoto;
