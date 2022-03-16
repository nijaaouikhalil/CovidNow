import React from "react";
import { Card } from "react-bootstrap";
function CTestScreen_Resource({ resource }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{resource.title}</Card.Title>

        <Card.Text>{resource.details}</Card.Text>
        <Card.Link href={resource.link}> Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CTestScreen_Resource;
