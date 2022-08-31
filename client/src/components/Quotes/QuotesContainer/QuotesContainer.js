//react/redux
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {changeInterval, fetchPosts} from "../../../redux/actions/actions";
import io from "socket.io-client";
//components
import {Button, Grid} from "@mui/material";
import QuotesCard from "../QuotesCard/QuotesCard";
//styles
import {
  StyledFormControlAll,
  StyledGrid,
  StyledHeaderName,
  StyledTextField
} from "./styledComponents";
import {StyledDiv} from "../SelectedQuotes/styledComponents";

const socket = io("http://localhost:4000")

const QuotesContainer = () => {
  const dispatch = useDispatch();
  const financeData = useSelector(state=>state.financeData);
  const [customInterval, setCustomInterval] = useState('');

  useEffect(() => {
    dispatch(fetchPosts(socket))
  }, [socket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const miliseconds = `${customInterval}000`
    dispatch(changeInterval(socket, +miliseconds));
  }

  const handleTextFieldChange = (event) => {
    event.preventDefault();
    setCustomInterval(event.target.value)
  }

  return (
    <StyledGrid container spacing={2}>
      <Grid item xs={12}>
          <StyledHeaderName
            variant="h5"
          >
            All quotes
          </StyledHeaderName>
          <StyledDiv>
            <StyledFormControlAll>
              <StyledTextField
                id="interval"
                label="Choose the interval"
                variant="outlined"
                onChange={handleTextFieldChange}
                error ={!Number.isInteger(+customInterval)}
                helperText='Please choose the integer number in seconds'
              />
              <Button
                onClick={handleSubmit}
                color='success'
                variant="outlined"
                disabled={!Number.isInteger(+customInterval)}
              >
                Set interval
              </Button>
            </StyledFormControlAll>
          </StyledDiv>
        <Grid container spacing={4}>
          {financeData.map((value, index) => (
            <Grid key={index} item>
              <Grid item>
                <QuotesCard
                  data={value}
                />
              </Grid>
            </Grid>
            ))}
        </Grid>
      </Grid>
    </StyledGrid>
  );
}

export default QuotesContainer;
