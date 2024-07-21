import { Grid, Typography } from "@mui/material";
import React from "react";

export const About = () => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "40px",
          margin: "2rem 2rem",
        }}
      >
        ABOUT US
      </Typography>
      
      <Grid container sx={{display:"flex", flexDirection:{xs:"column-reverse",md:"row"}}}>
        <Grid item md={6}>
        <Typography
        variant="h1"
        sx={{
          fontWeight: "light",
          textAlign: "start",
          fontSize: "25px",
          margin: "0rem 0rem 0rem 2rem",
          color: "#C31356",
        }}
      >
        Our Story
      </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "light",
              fontSize:"14px",
              textAlign: "justify",
              margin: "10px 2rem 0rem 2rem",
            }}
          >
            Lily and Jack had always found solace in the little things. Their
            love story was woven together by quiet moments and simple gestures.
            On rainy Sundays, they would cuddle under a warm blanket, sipping
            tea and reading their favorite books. Jack adored how Lily's eyes
            sparkled when she spoke about her dreams, and Lily loved the way
            Jack's laughter filled the room, making even the dullest days
            bright. One evening, as the sun set, painting the sky in hues of
            pink and orange, they decided to take a spontaneous road trip. With
            no destination in mind, they drove through winding roads and lush
            forests, feeling the wind in their hair and the excitement of
            adventure in their hearts. They sang along to old songs on the
            radio, their voices blending in perfect harmony.
            <br />
            As the stars began to twinkle above, they lay on the sand, fingers
            intertwined, dreaming of the endless possibilities their future
            held. Together, they had created a world where love was found in
            every glance, every touch, and every shared dream.
          </Typography>
        </Grid>
        <Grid item md={6} sx={{width:"100%",height:"", background:""}}>
          
<img src="/public/about-img2.PNG" alt="" width="75%" height="" style={{borderRadius:"50% 0 50% 0",border:"0px solid #c31356",marginTop:"-30px"}}/>
         
        </Grid>
      </Grid>
    </>
  );
};
