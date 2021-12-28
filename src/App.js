import React, { Component } from "react";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import apiKey from "./config";
import axios from "axios";

// App components
import Nav from "./components/Nav";
import PhotoContainer from "./components/PhotoContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    };
  }

  performSearch = (query) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({
          photos: response.data.photos.photo,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    console.log(this.state.photos);
    return (
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<Nav onSearch={this.performSearch} />}
            />
            <Route
              exact
              path="/cats"
              element={<Nav onSearch={this.performSearch("cats")} />}
            />
            <Route
              exact
              path="/dogs"
              element={<Nav onSearch={this.performSearch("dogs")} />}
            />
            <Route
              exact
              path="/computers"
              element={<Nav onSearch={this.performSearch("computers")} />}
            />
            <Route
              exact
              path="/:searchText"
              element={<Nav onSearch={this.performSearch} />}
            />
          </Routes>
        </BrowserRouter>
        <PhotoContainer data={this.state.photos} />
      </div>
    );
  }
}

export default App;
