import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { WeddingCard } from "../Types/NavItems";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import $axios from "../lib/axios.instance";
import Loading from "../Component/Loading";
import CardCreateTime from "../Component/CardCreateTime";
import EditCard from "../Component/EditCard";
import GalleryExploreModel from "../Component/GalleryExploreModel";
import AddIcon from '@mui/icons-material/Add';
// import EditCard from "../Component/EditCard";

const Gallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const { isLoading, data } = useQuery({
    queryKey: ["card-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/card/list", { page: currentPage, limit: 8 });
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("edit-details")
    }
  
  });
  const cardList = data?.data?.cardList;
  const numberOfPages = data?.data?.numberOfPages;

  // console.log(data)
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mr: "2rem",
          mt: "2rem",
          ml:"2rem"
        }}
      >

        <IconButton aria-label="delete" size="small" sx={{color:"#fff", background: "#C31356","&:hover":{background:"#fff",color:"#C31356"},position:{xs:"fixed",md:"sticky"} }} onClick={() => {
            navigate("/add");
          }}>
  <AddIcon  />
</IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        {cardList <= 0 ? (
          <h1>No Card Found</h1>
        ) : (
          <Grid
            sx={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {cardList?.map((item: WeddingCard) => {
              return (
                <Card sx={{ maxWidth: 290, ml: "" }}>
                  <CardMedia
                    sx={{ height: 200, width: 290 }}
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        textAlign="start"
                        fontWeight="bold"
                        component="div"
                      >
                        {item.title}
                      </Typography>
                      <Box>
                        <EditCard {...item} />
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      textAlign="justify"
                      color="text.secondary"
                    >
                      {item.description.trim().substring(0,50)}...
            {/* str.trim().substring(0, 5); */}

                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "10px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        textAlign="start"
                        color="text.secondary"
                      >
                        {item.postDate}
                      </Typography>
                      <Typography
                        variant="body2"
                        textAlign="start"
                        color="text.secondary"
                      >
                        <CardCreateTime {...item} />
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>

                    <GalleryExploreModel {...item}  />
                   
                  </CardActions>
                </Card>
              );
            })}
          </Grid>
        )}
      </Box>

      <Stack spacing={2} sx={{ margin: "auto",paddingBottom:"2rem" }}>
        <Pagination
          count={numberOfPages}
          page={currentPage}
          onChange={(_, page) => {
            setCurrentPage(page);
          }}
          variant="outlined"
          color="primary"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff", // Change this to your desired font color
            },
          }}
        />
      </Stack>
    </>
  );
};

export default Gallery;
