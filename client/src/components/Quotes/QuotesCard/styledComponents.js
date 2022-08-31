import styled from "styled-components";
import {Card} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export const StyledCard = styled(Card)`
  padding: 20px;
  position: relative;
`;

export const StyledTooltip = styled(Tooltip)`
  position: absolute !important;
  right: 0;
  top: 0;
  cursor: pointer !important;
`;
