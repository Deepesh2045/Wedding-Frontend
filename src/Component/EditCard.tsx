import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { WeddingCard } from "../Types/NavItems";
import DeleteDialog from "./DeleteDialog";

const EditCard = (props: WeddingCard) => {
  const navigate = useNavigate();
 

  return (
    <>
      <Box sx={{}}>
        <IconButton
          aria-label="edit"
          onClick={() => {
            navigate(`/edit/card/form/${props._id}`);
          }}
        >
          <EditIcon sx={{ fontSize: "20px" }} />
        </IconButton>

        {/* <IconButton
          aria-label="delete"
          onClick={() => {
            mutateDelete(props._id);
          }}
        >
          <DeleteIcon sx={{ fontSize: "20px" }} />
        </IconButton> */}

        <DeleteDialog _id={props._id} />

      </Box>
    </>
  );
};

export default EditCard;
