import {
  Box,
  Button,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../Component/Loading";
import $axios from "../lib/axios.instance";

const AddPhoto = () => {
  const [weddingImg, setWeddingImg] = useState<File | null>(null);
  const [localUrl, setLocalUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const params = useParams();
  const cardId = params?.id;


  // Choose image to change function
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setWeddingImg(file);
      setLocalUrl(URL.createObjectURL(file));
    }
  };

  

  const minDate = dayjs().startOf("day").subtract(18, "year");
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ["edit-details", cardId],
    queryFn: async () => {
      return await $axios.get(`/details/edit/${cardId}`);
    },
    // enabled:!!cardId,

  });
  const cardDetails = data?.data?.cardDetails;

  const { isLoading: editLoading, mutate } = useMutation({
    mutationKey: ["Edit-card"],
    mutationFn: async (value: {
      title: string;
      description: string;
      postDate: string;
      image: string;
    }) => {
      return await $axios.put(`/card/edit/${cardId}`, value);
    },
    onSuccess: () => {
      navigate("/gallery");
      queryClient.invalidateQueries("card-list")
    },
   
  });

  if (isLoading || editLoading) {
    return <Loading />;
  }

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
            title: cardDetails?.title || "",
            description: cardDetails?.description || "",
            image: cardDetails?.image || "",
            postDate: cardDetails?.postDate || "",
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
              const cloudname = "drgqnbnwk";
              const data = new FormData();
              data.append("file", weddingImg);
              data.append("upload_preset", "Online_Shoping123");
              data.append("cloud_name", cloudname);
              try {
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudname}/upload`,
                  data
                );
                imageUrl = res?.data?.url;
                console.log(imageUrl);
              } catch (error) {
                console.log("Image upload failed...");
              }
            }
            value.image = imageUrl || value.image;
            mutate(value);
          }}
        >
          {({
            handleSubmit,
            getFieldProps,
            touched,
            errors,
            setFieldValue,
            values,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                padding: "2rem",
                background: "#fff",
                position: "relative",
              }}
            >
              <Typography
                textAlign="start"
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                Edit Your Card Details
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

                  {/* For Date */}
                  <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          value={dayjs(values.postDate)}
                          minDate={minDate}
                          label="Post Date"
                          onChange={(value) => {
                            setFieldValue("postDate", value);
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
                     
                    </Box>
                  ) : (
                    <Box>
                      {values.image ? (
                        <Box>
                        {/* <img src={values.image} alt="Current" width={"100%"} height={"350px"} /> */}

                        <CardMedia 
                    sx={{ height: 375, mb:"1rem" }}
                    image={values.image}
                    title={values.title}
                
                  />


                      
                      </Box>
                      ) : (
                        <>
                          <img
                            src="./prev.jpg"
                            alt="No Image"
                            width={"200px"}
                          />
                          <Typography
                            sx={{ color: "#424242", fontSize: "30px" }}
                          >
                            No Preview Available
                          </Typography>
                        </>
                      )}
                    </Box>
                  )}
                </Grid>
              </Grid>

              <Button type="submit" variant="contained">
               Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddPhoto;
