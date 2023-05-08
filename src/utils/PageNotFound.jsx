import React from "react";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";

export default function PageNotFound() {
  return (
    <Alert variant="danger">
      <Alert.Heading>404 - Página no encontrada</Alert.Heading>
      <p>The page you are looking for does not exist.</p>
      <hr />
      <p className="mb-0">
        <Link to="/">Return to homepage</Link>
      </p>
    </Alert>
  );
}
