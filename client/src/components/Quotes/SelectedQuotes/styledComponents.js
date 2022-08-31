import styled from "styled-components";
import {Container, FormControl, Grid, Typography} from "@mui/material";

export const StyledHeaderName = styled(Typography)`
  padding: 16px 16px 16px 0;
`;

export const StyledGrid = styled(Grid)`
  flex-grow: 1;
`;

export const StyledFormControl = styled(FormControl)`
  width: 130px;
  margin-right: 10px !important;
`;

export const StyledDiv = styled(Container)`
  display: flex !important;
  align-items: center;
  padding: 0 !important;
  margin: 10px 0 !important;
`;
