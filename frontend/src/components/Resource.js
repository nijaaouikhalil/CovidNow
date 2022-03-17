import React from "react";
import { Card } from "react-bootstrap";
export const Resource = ({ resource }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title data-testid="resource-title-test">{resource.title}</Card.Title>
        <Card.Text data-testid="resource-detail-test">{resource.details}</Card.Text>
        <Card.Link data-testid="resource-link-test" href={resource.link}> Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

