//react/redux
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addQuote, updateQuote} from "../../../redux/actions/actions";
//components
import {Button, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import QuotesCard from "../QuotesCard/QuotesCard";
//styles
import {StyledDiv, StyledFormControl, StyledGrid, StyledHeaderName} from "./styledComponents";

const SelectedQuotesContainer = () => {
  const dispatch = useDispatch();
  const financeData = useSelector(state=>state.financeData);
  const selectedQuotes = useSelector(state=>state.selectedQuotes);
  const [savedData, setSavedData] = useState(financeData);
  const [exchange, setExchange] = useState('');

  useEffect(() => {
    //this function checks whether the previous price is more/less than the current one
    const comparedObjects = handleCompare(savedData, financeData);
    //this function updates the values of selectedQuotes array with the updated data received from the server via sockets
    const updatedObjects = handleUpdate(comparedObjects);
    //the action to update the values of the object received is triggered
    dispatch(updateQuote(updatedObjects));
    //it sets the current data to the useState
    setSavedData(financeData);
  }, [financeData]);

  const handleCompare = (oldData, newData) => {
    const updatedArray = [];
    for(let i = 0; i<oldData.length; i++){
      if(+newData[i].price>+oldData[i].price){
        updatedArray.push({...newData[i], isGrown: true});
      }else{
        updatedArray.push({...newData[i], isGrown: false});
      }
    }
    return updatedArray;
  }

  const handleUpdate = (comparedObjects) => {
    const tickersName = [];
    //we receive the array of names associated with the selected tickers
    selectedQuotes.forEach(el => tickersName.push(el.ticker));
    const updatedArray = [];
    for(let i = 0; i<comparedObjects.length; i++){
      for(let j=0; j<tickersName.length; j++){
        if(tickersName[j]===comparedObjects[i].ticker){
          updatedArray.push(comparedObjects[i])
        }
      }
    }
    return updatedArray;
  }

  const handleChange = (event) => {
    setExchange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const desiredObject = financeData.find(el => el.ticker === exchange);
    !selectedQuotes.find(el => el.ticker === exchange) ?
      dispatch(addQuote(desiredObject))
      : alert('This ticker is already chosen. Please choose another one.');
  }

  return (
    <StyledGrid container spacing={2}>
      <Grid item xs={12}>
        <StyledHeaderName
          variant="h5"
        >
          Quotes watching group
        </StyledHeaderName>
        <StyledDiv>
          <StyledFormControl>
            <InputLabel id="demo-simple-select-label">Exchange name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={exchange}
              label="Exchange name"
              onChange={handleChange}
              // data-testid="setTickerToGroup"
              inputProps={{ "data-testid": "content-input" }}
            >
              {financeData.map((value, index) => (
                <MenuItem key={index} value={value.ticker}>{value.ticker}</MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <Button
            onClick={handleSubmit}
            color='success'
            variant="outlined"
            data-testid='addTickerBtn'
          >
            Add ticker
          </Button>
        </StyledDiv>
        <Grid container spacing={4} data-testid="selectedTickersGrid">
          {selectedQuotes.map((value, index) => (
            <Grid key={index} item>
              <Grid item>
                <QuotesCard
                  data={value}
                  isWatchingGroup={true}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </StyledGrid>
  );
}

export default SelectedQuotesContainer;
