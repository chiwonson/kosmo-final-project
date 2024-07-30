import React from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function TimeButton() {

    return(
        <div>
            <div>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="info">Info</Button>
                <Button variant="light">Light</Button>
                <Button variant="dark">Dark</Button>
                <Button variant="link">Link</Button>
            </div>
            <div>
                <Button variant="outline-primary">outline-primary</Button>
                <Button variant="outline-secondary">outline-secondary</Button>
                <Button variant="outline-success">outline-success</Button>
                <Button variant="outline-warning">outline-warning</Button>
                <Button variant="outline-danger">outline-danger</Button>
                <Button  variant="outline-info">outline-info</Button>
                <Button variant="outline-light">outline-light</Button>
                <Button variant="outline-dark">outline-dark</Button>
                <Button variant="outline-link">outline-link</Button>
            </div>

        </div>
    )
}
export default TimeButton;

/*
<div>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="info">Info</Button>
                <Button variant="light">Light</Button>
                <Button variant="dark">Dark</Button>
                <Button variant="link">Link</Button>
            </div>
            <div>
                <Button variant="outline-primary">outline-primary</Button>
                <Button variant="outline-secondary">outline-secondary</Button>
                <Button variant="outline-success">outline-success</Button>
                <Button variant="outline-warning">outline-warning</Button>
                <Button variant="outline-danger">outline-danger</Button>
                <Button  variant="outline-info">outline-info</Button>
                <Button variant="outline-light">outline-light</Button>
                <Button variant="outline-dark">outline-dark</Button>
                <Button variant="outline-link">outline-link</Button>
            </div>
*/