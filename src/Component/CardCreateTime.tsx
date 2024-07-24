import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { WeddingCard } from "../Types/NavItems";

const CardCreateTime = (props: WeddingCard) => {
  dayjs.extend(relativeTime);
  const createdDate = props.createdAt;
  const latestDate = dayjs(createdDate).fromNow();
  const [updateDate, setUpdateDate] = useState(latestDate);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setUpdateDate(dayjs(createdDate).fromNow())
    },1000)
    return()=> clearInterval(interval)
    },[createdDate])
  

  return (
    <>
      <Box>
        <Typography variant="body2" textAlign="start" color="text.secondary">
          {updateDate}
        </Typography>
      </Box>
    </>
  );
};

export default CardCreateTime;
