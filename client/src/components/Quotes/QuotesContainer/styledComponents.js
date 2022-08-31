import styled from "styled-components";
import {FormControl, Grid, TextField, Typography} from "@mui/material";

export const StyledHeaderName = styled(Typography)`
  padding: 16px 16px 16px 0;
`;

export const StyledGrid = styled(Grid)`
  flex-grow: 1;
`;

export const StyledTextField = styled(TextField)`
  padding: 0 10px 0 0 !important;
`;

export const StyledFormControlAll = styled(FormControl)`
  //width: 130px;
  display: flex !important;
  margin-right: 10px !important;
  flex-direction: row !important;
`;
