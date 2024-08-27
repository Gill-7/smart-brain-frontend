import React, { Component, createRef } from "react";
// import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import Container from "./components/Container/Container";

const initialState = {
  error: false,
  errSec: false,
  inputUrl: "",
  imageUrl: "",
  inputSrc: "",
  imageSrc: "",
  baseImage: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  isDropdownOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    date_of_birth: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.chooseFileRef = createRef();
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(`https://smart-brain-backend-five.vercel.app/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            fetch(`https://smart-brain-backend-five.vercel.app/profile/${data.id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            })
              .then((res) => res.json())
              .then((user) => {
                if (user && user.email) {
                  this.onLoadUser(user);
                  this.onRouteChange("home");
                }
              })
              .catch((error) => {
                this.setState({
                  errorMsg: "Unable to sign in. Please try again later.",
                });
              });
          }
        })
        .catch(console.log);
    }
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFaceCoords = data.outputs[0].data.regions;

    return clarifaiFaceCoords.map((faceCoords) => {
      let { left_col, top_row, right_col, bottom_row } =
        faceCoords.region_info.bounding_box;
      return {
        leftCol: left_col * width,
        topRow: top_row * height,
        rightCol: width - right_col * width,
        bottomRow: height - bottom_row * height,
      };
    });
  };

  displayBox = (boxes) => {
    this.setState({
      boxes: boxes,
    });
  };

  onInputUrlChange = (event) => {
    this.setState({
      inputUrl: event.target.value,
    });
  };

  onChooseFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = reader.result.split(",")[1];
        this.setState({ inputSrc: e.target.result, baseImage: base64Image });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  clearChooseFile = () => {
    if (this.chooseFileRef.current) {
      this.chooseFileRef.current.value = ""; // Clear the file input
    }
  };

  processWithSubmission = () => {
    this.setState({
      imageUrl: this.state.inputUrl,
      imageSrc: this.state.inputSrc,
    });

    if (this.state.user.id) {
      fetch("https://smart-brain-backend-five.vercel.app/imageurl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          imageUrl: this.state.inputUrl,
          baseImage: this.state.baseImage,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data) {
            fetch("https://smart-brain-backend-five.vercel.app/image", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: window.sessionStorage.getItem("token"),
              },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((data) => data.json())
              .then((count) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              })
              .catch(console.log);
          }
          this.displayBox(this.calculateFaceLocation(data));
        })
        .catch((err) => console.log(err));
    }

    if (this.state.error) {
      return;
    }

    this.setState({
      inputUrl: "",
      inputSrc: "",
      baseImage: "",
    });
    this.clearChooseFile();
  };

  checkForError = () => {
    if (this.state.error) {
      this.setState({
        imageUrl: "",
        imageSrc: "",
      });
      return;
    }
    this.processWithSubmission();
  };

  handleError = () => {
    const { inputUrl, inputSrc } = this.state;

    if (!inputUrl && !inputSrc) {
      this.setState({ errorSec: true });
    }

    if (inputUrl || inputSrc) {
      if (inputUrl && inputSrc) {
        this.setState({ error: true }, () => {
          this.checkForError(); // Check for the error after state has been set
        });
      } else {
        this.setState({ error: false }, () => {
          this.checkForError(); // Check for the error after state has been set
        });
      }
    }
  };

  onSubmit = () => {
    this.handleError();
  };

  onRouteChange = (route) => {
    if (route === "signin") {
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
        date_of_birth: data.date_of_birth,
      },
    });
  };

  toggleProfileModal = () => {
    this.setState((state) => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
      isDropdownOpen: false,
    }));
  };

  toggleProfileDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  render() {
    const {
      isSignedIn,
      inputUrl,
      inputSrc,
      imageSrc,
      imageUrl,
      route,
      boxes,
      error,
      errorSec,
      isProfileOpen,
      isDropdownOpen,
      user,
    } = this.state;
    return (
      <div
        className={`font-mono w-full h-screen md:h-full relative md:static m-0 p-0 md:bg-dark ${
          (route !== "signin" || route !== "register") && "bg-dark"
        }`}
      >
        {/* {window.innerWidth > 768 && (
          <ParticlesBg color="#a3a3a3" num={80} type="cobweb" bg={true} />
        )} */}
        <div
          className={`${
            (route === "signin" || route === "register") &&
            "h-2/4 md:h-[56px] bg-nav-background md:bg-none bg-cover bg-center bg-no-repeat absolute w-full"
          }`}
        >
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
            toggleProfileModal={this.toggleProfileModal}
            toggleProfileDropdown={this.toggleProfileDropdown}
            isDropdownOpen={isDropdownOpen}
          />
          {isProfileOpen && (
            <Modal>
              <Profile
                isProfileOpen={isProfileOpen}
                toggleProfileModal={this.toggleProfileModal}
                user={user}
                onLoadUser={this.onLoadUser}
              />
            </Modal>
          )}
        </div>
        <div
          className={`${
            route === "signin" || route === "register"
              ? "h-3/4 md:h-screen rounded-t-[2rem] md:rounded-none absolute md:static bottom-0 left-0 bg-light md:bg-none right-0 border-light-blue flex items-center justify-center"
              : "md:h-[calc(100vh-56px)] flex items-start md:items-center justify-center mt-28 md:mt-0"
          }`}
        >
          {/* {window.innerWidth < 768 && (
            <ParticlesBg color="#a3a3a3" num={30} type="cobweb" bg={true} />
          )} */}

          {route === "home" ? (
            <Container
              name={this.state.user.name}
              entries={this.state.user.entries}
              onInputUrlChange={this.onInputUrlChange}
              onChooseFileChange={this.onChooseFileChange}
              onSubmit={this.onSubmit}
              inputUrl={inputUrl}
              inputSrc={inputSrc}
              imageUrl={imageUrl}
              imageSrc={imageSrc}
              chooseFileRef={this.chooseFileRef}
              boxes={boxes}
              error={error}
              errorSec={errorSec}
            />
          ) : route === "signin" ? (
            <Signin
              isSignedIn={isSignedIn}
              user={user}
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
