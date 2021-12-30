import React, { Component } from "react";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import apiKey from "./config";
import axios from "axios";

// App components
import Search from "./components/Search";
import PhotoContainer from "./components/PhotoContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      catPhotos: [],
      dogPhotos: [],
      computerPhotos: [],
    };
  }

  componentDidMount() {
    this.performSearch("cats");
    this.performSearch("dogs");
    this.performSearch("computers");
  }

  performSearch = (query) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        if (query === "cats") {
          this.setState({
            catPhotos: response.data.photos.photo,
          });
        }
        if (query === "dogs") {
          this.setState({
            dogPhotos: response.data.photos.photo,
          });
        }
        if (query === "computers") {
          this.setState({
            computerPhotos: response.data.photos.photo,
          });
        }
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
              path="/"
              element={
                <>
                  <Search onSearch={this.performSearch} />
                  <PhotoContainer data={this.state.photos} />
                </>
              }
            />
            <Route
              path="/cats"
              element={
                <>
                  <Search onSearch={this.performSearch} />
                  <PhotoContainer data={this.state.catPhotos} />
                </>
              }
            />

            <Route
              path="/dogs"
              element={
                <>
                  <Search onSearch={this.performSearch} />
                  <PhotoContainer data={this.state.dogPhotos} />
                </>
              }
            />

            <Route
              path="/computers"
              element={
                <>
                  <Search onSearch={this.performSearch} />
                  <PhotoContainer data={this.state.computerPhotos} />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
