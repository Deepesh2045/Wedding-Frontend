import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
// import "../Scss/style.scss"

const Home:React.FC = () => {
  return (
    <>
    <Box className="bg"  sx={{
    width: "100%",
    background: `url("/public/bg.png") no-repeat center center`,
    backgroundSize: "cover",
    height: {xs:"92dvh",md:"88.5dvh"},
    overflow:"hidden"
  }}>
    <Grid className='banner-contain'>
      <Grid container sx={{display:"flex", flexDirection:{xs:"column-reverse",md:"row"}}}>
        <Grid item md={6} sx={{display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
        <Box>
      <Typography textAlign="start" paddingLeft="2rem" sx={{fontSize:{xs:"40px",md:"60px"}, color:"#fff",fontWeight:"bold",lineHeight:{xs:"50px",md:"70px"}}}>Where There is Love There is Life</Typography>
      <Typography textAlign="justify" paddingLeft="2rem"  fontSize="14px" sx={{color:"#e2e2e2",paddingRight:{xs:"2rem",md:"0rem"}}}>The earth is lucky because it has the sun, the boats are lucky because it has an ocean to struggle with, and plants and trees have ground to live on. Then I must be an extremely lucky person because of having you in my life.</Typography>
      </Box>
      </Grid>
      <Grid item md={6} sx={{background:"",height:{xs:"",md:"100dvh"},marginTop:{xs:"",md:""}}}>
      <img src='../public/right img.png' alt='' width={"100%"} height={""}/>
      </Grid>

      </Grid>
    </Grid>
    </Box>
    
    </>
  )
}

export default Home