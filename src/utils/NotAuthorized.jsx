import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

export default function NotAuthorized() {
  return (
    <div className="row">
      <div className="col-12">
        <Alert variant="danger">
          <Alert.Heading>401 - You are not authorized</Alert.Heading>
          <p>It seems like you don't have permission to use this portal.</p>
          <hr />
          <p className="mb-0">
            <Link to="/">Return to homepage</Link>
          </p>
        </Alert>
      </div>
    </div>
  );
}
