import React, { useState } from "react";
import {
  Container,
  Row,
  Form,
  Button,
  Alert,
  InputGroup,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { searchJobs } from "../../api";

function Homepage({ onLogout }) {
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [jobsAvailable, setJobsAvailable] = useState([]);

  const onChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const onSearchJobs = async () => {
    setIsLoading(true);
    const jobs = await searchJobs({ keyword });
    setJobsAvailable(jobs);
    setIsLoading(false);
  };

  return (
    <Container>
      <Row className="mt-2 mb-2 d-flex w-100 justify-content-end">
        <Button variant="outline-danger" onClick={onLogout}>
          Log out
        </Button>
      </Row>
      <Row>
        <h1>Welcome!</h1>
      </Row>
      <Row className="mt-2">
        <h6>
          Enter one or multiple keywords below to search for matching available
          jobs on GitHub Jobs.
        </h6>
      </Row>
      <Row>
        <Form className="w-100 mb-5">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="e.g. Python, Java, product manager..."
              onChange={onChangeKeyword}
              value={keyword}
            />
            <InputGroup.Prepend>
              <Button
                variant="outline-primary"
                onClick={onSearchJobs}
                disabled={!keyword}
              >
                Search jobs
              </Button>
            </InputGroup.Prepend>
          </InputGroup>
        </Form>
      </Row>
      {isLoading && (
        <Row className="justify-content-center mb-5">
          <Spinner animation="border" variant="primary" />
        </Row>
      )}
      {!jobsAvailable || !jobsAvailable.length ? (
        <Alert variant={"info"}>
          No results were found for the entered keyword/s.
        </Alert>
      ) : (
        <ListGroup>
          {jobsAvailable.map((position, idx) => {
            const {
              type,
              url,
              created_at,
              company,
              location,
              title,
              description,
            } = position;
            return (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="list-group-item list-group-item-action"
                aria-current="true"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{title}</h5>
                  <small>{formatDate(created_at)}</small>
                </div>
                <h6 className="mb-1">{company}</h6>
                <div
                  className="mb-2"
                  style={{
                    overflow: "hidden",
                    position: "relative",
                    height: "15em",
                  }}
                >
                  {description.replace(/<[^>]*>?/gm, "")}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      width: "100%",
                      height: "8em",
                      background:
                        "linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 100%)",
                    }}
                  ></div>
                </div>
                <div className="d-flex w-100 justify-content-between">
                  <small>{location}</small>
                  <Badge variant="primary">{type}</Badge>
                </div>
              </a>
            );
          })}
        </ListGroup>
      )}
    </Container>
  );
}

export default Homepage;

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
}
