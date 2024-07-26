import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navgation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecogination from "./components/FaceRecogination/FaceRecogination";
import "./App.css";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceCoord =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFaceCoord.left_col * width,
      topRow: clarifaiFaceCoord.top_row * height,
      rightCol: width - clarifaiFaceCoord.right_col * width,
      bottomRow: height - clarifaiFaceCoord.bottom_row * height,
    };
  };

  displayBox = (box) => {
    this.setState({
      box: box,
    });
  };

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    });
    fetch("https://face-detection-backend-eef6.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          fetch("https://face-detection-backend-eef6.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((data) => data.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }

        this.displayBox(this.calculateFaceLocation(data));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({
        isSignedIn: true,
      });
    }
    this.setState({
      route: route,
    });
  };

  onLoadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        joined: data.joined,
        entries: data.entries,
      },
    });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="font-sans h-full w-full">
        <ParticlesBg color="#a3a3a3" num={100} type="cobweb" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        <div className="h-[calc(100vh-56px)] flex items-center justify-center">
          {route === "home" ? (
            <div className="w-full sm:w-[400px] mx-2 ">
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />

              {imageUrl ? (
                <FaceRecogination imageUrl={imageUrl} box={box} />
              ) : (
                ""
              )}
            </div>
          ) : route === "signin" ? (
            <Signin
              isSignedIn={isSignedIn}
              onLoadUser={this.onLoadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register
              onLoadUser={this.onLoadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
