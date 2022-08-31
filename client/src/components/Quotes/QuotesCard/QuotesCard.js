//react/redux
import {useDispatch} from "react-redux";
//components
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import {Typography} from "@mui/material";
//styles
import {StyledCard, StyledTooltip} from "./styledComponents";
import {removeQuote} from "../../../redux/actions/actions";

const QuotesCard = ({data, isWatchingGroup}) => {
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(removeQuote(data))
  }

  const { ticker, exchange, price, isGrown } = data;

  return (
    <StyledCard className="Card">
      {isWatchingGroup &&
        <StyledTooltip className="Tooltip" title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </StyledTooltip>
      }
      <Typography
        variant="h6"
      >
        Ticker name - {ticker}
      </Typography>
      <Typography
        variant="h6"
      >
        Exchange name - {exchange}
      </Typography>
      <Typography
        variant="h6"
      >
        Price - ${price} {isWatchingGroup && (isGrown ? <ArrowCircleUpIcon/> : <ArrowCircleDownIcon />)}
      </Typography>
    </StyledCard>
  );
}

export default QuotesCard;
