import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";
import ListingCard from "../components/ListingCard";
import MakeCard from "../components/MakeCard";
import ModelCard from "../components/ModelCard";
import SearchResults from "../components/SearchResult";
import videoBg1 from '../assets/images/6ixAutoBg.mp4'
import videoBg2 from "../assets/images/Toronto.mp4";
import '../index.css'
import "animate.css";
// import {  } from "../utils/queries";
// import {  } from "../utils/mutations";

const Home = () => {
  const [selections, setSelection] = useState({
    make: "",
    model: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  console.log(selections);
  const [searchMode, setSearchMode] = useState(true);

  const [activateSearch, setActivateSearch] = useState(false);

  const setMakeHandler = (make, model) => {
    setSelection({ ...selections, make, model });
    console.log(`after clicking make the state is: ${selections}`);
  };

  const setModelHandler = (model) => {
    setSelection({ ...selections, model });
    return;
  };

  const setBackSearch = () => {
    setSearchMode(!searchMode);
  };

  return (
    <>
      <div className={activateSearch ? "main search-main" : " bg-light main"}>
        {searchMode ? (
          <div className="bg-video">
            <div className="overlay"></div>
            <video src={videoBg1} autoPlay loop muted></video>
            <div className="content text-center">
              <h1>Welcome to 6ixAuto!</h1>
              <h5>Search for your dream car!</h5>
            </div>
          </div>
        ) : (
          <div className="bg-video">
            <div className="overlay"></div>
            <video src={videoBg2} autoPlay loop muted></video>
            <div className="content text-center">
              <h1>Welcome to 6ixAuto!</h1>
              <h5>Search for your dream car!</h5>
            </div>
          </div>
        )}
        <div className="mt-5 d-flex flex-column justify-content-center p-2 container">
          {searchMode ? (
            <>
              {activateSearch ? (
                <>
                  <h3 className="d-flex justify-content-center">
                    Select Your Make!
                  </h3>
                  <div className="bg-secondary search-box animate__animated animate__slideInDown">
                    <MakeCard onSelect={setMakeHandler} />
                    {selections.make ? (
                      <>
                        <div className="animate__animated animate__slideInUp d-flex flex-column ">
                          <h3 className="text-center"> Select Your Model!</h3>
                          <ModelCard
                            onSelect={setModelHandler}
                            make={selections.make}
                          />
                          <button
                            className="search btn btn-light"
                            onClick={() => {
                              if (selections.model) {
                                setSearchMode(!searchMode);
                              } else {
                                setShowAlert(!showAlert);
                              }
                            }}
                          >
                            <h5>Submit Search</h5>
                          </button>
                        </div>
                      </>
                    ) : (
                      <p> </p>
                    )}
                  </div>
                </>
              ) : (
                // start journey button
                <h3
                  className="d-flex justify-content-center sbtn start-btn text-center"
                  onClick={() => setActivateSearch(!activateSearch)}
                >
                  Begin Your Automotive Journey
                </h3>
              )}

              <Alert
                className="d-flex justify-content-between mt-3"
                onClose={() => setShowAlert(!showAlert)}
                show={showAlert}
                variant="danger"
              >
                <h5>Invalid Search Entry</h5>
                <div className="">
                  <Button
                    onClick={() => setShowAlert(!showAlert)}
                    variant="outline-secondary"
                  >
                    Close
                  </Button>
                </div>
              </Alert>
            </>
          ) : (
            <p> </p>
          )}
        </div>
      </div>
      <div className="searchResultsBox">
        {!searchMode ? (
          <div>
            <SearchResults selections={selections} />
            <button onClick={() => setBackSearch()}>Back to search</button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Home;
