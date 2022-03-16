import React from "react";
import { Alert } from "react-bootstrap";

function CTestScreen_Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default CTestScreen_Message;
