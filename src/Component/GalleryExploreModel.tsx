import { CardMedia, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import saveAs from "file-saver";
import * as React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",  // 100% width on extra-small screens
    md: 500     // 500px width on medium and larger screens
  },
  bgcolor: "background.paper",
  border: "2px solid #ffffff",
  boxShadow: 20,
  pb: 4,
};

export interface WeddingCard {
  image: string;
  title: string;
  description: string;
  date: string;
  postDate: string;
  createdAt: number;
  _id: number;
}

const GalleryExploreModel = (props: WeddingCard) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    saveAs(props.image, "download_image.jpg");
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={handleOpen}
        sx={{ margin: "auto", width: "100%", background: "#C31356",borderRadius:"20px","&:hover":{background:"#000"}}}
      >
        Explore
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container onClick={handleClose}  sx={{background:"", width:"100%",height:"100%",backdropFilter:"blur(5px)"}}>
          <Grid item md={12} >
        <Box sx={style}>
          <CardMedia
            sx={{ height: 325, width: "100%" }}
            image={props.image}
            title={props.title}
          />

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ padding: "0rem 1rem",fontWeight:"bold",mt:"1rem" }}
          >
            {props.title}
          </Typography>
          <Typography
          variant="body2"
            id="modal-modal-description"
            sx={{ padding: "0rem 1rem", color: "#3f3f3f", textAlign:"justify" }}
          >
            {props.description}

            {/* str.trim().substring(0, 5); */}
          </Typography>
          <Box sx={{background:"",display:"flex",justifyContent:"flex-end",marginRight:"1rem",mt:"2rem"}}>
            <Button variant="contained" onClick={handleDownload} sx={{background:"#C31356", "&:hover":{background:"#C31356"}}}>
              Download Image
            </Button>
          </Box>
        </Box>
        </Grid>
        </Grid>
      </Modal>
    </>
  );
};
export default GalleryExploreModel;
