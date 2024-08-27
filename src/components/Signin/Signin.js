import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      errorMsg: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value,
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      signInPassword: event.target.value,
    });
  };

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target.closest("form");
    if (form.checkValidity()) {
      // fetch("http://localhost:3000/signin", {
      fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.userId && data.success === "true") {
            this.saveAuthTokenInSession(data.token);

            fetch(
              `http://localhost:3000/${data.userId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: data.token,
                },
              }
            )
              .then((res) => res.json())
              .then((user) => {
                if (user && user.email) {
                  this.setState({ error: "" });
                  this.props.onLoadUser(user);
                  this.props.onRouteChange("home");
                }
              })
              .catch((error) => {
                this.setState({
                  errorMsg: "Unable to sign in. Please try again later.",
                });
              });
          } else {
            this.setState({ errorMsg: "Wrong credentials, Please try again!" });
          }
        })
        .catch((error) => {
          this.setState({
            errorMsg: "Unable to sign in. Please try again later.",
          });
        });
    } else {
      form.reportValidity();
    }
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <form
        className="w-11/12 semi-sm:w-[360px] md:w-[380px] px-4 sm:px-6 shadow-none md:shadow-3xl font-sans text-black md:text-white rounded-md"
        onSubmit={this.handleSignIn}
      >
        <div className="w-full md:px-2 md:py-10">
          <h2 className="text-left md:text-center text-3xl font-extrabold text-red md:text-white">
            Welcome back
          </h2>

          <div className="mt-6 relative">
            <div className="rounded-md">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full my-6 py-1 md:px-3 md:py-2.5 border-b md:border-none border-light-gray placeholder-gray md:placeholder-black text-black
                  focus:outline-none md:rounded-md
                  text-sm md:text-base font-normal placeholder:text-sm"
                placeholder="E-mail"
                onChange={this.onEmailChange}
              />

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full my-6 py-1 md:px-3 md:py-2.5 border-b md:border-none border-light-gray placeholder-gray md:placeholder-black text-black
                  focus:outline-none md:rounded-md
                  text-sm md:text-base font-normal placeholder:text-sm"
                placeholder="Password"
                onChange={this.onPasswordChange}
              />
            </div>

            {this.state.errorMsg && (
              <p className="absolute bottom-12 md:bottom-14 text-red md:text-light-gray text-xs md:text-sm">
                {this.state.errorMsg}
              </p>
            )}

            <div className="flex flex-row justify-between items-center  mt-10">
              <button
                type="submit"
                className="relative md:w-28
                py-1.5 md:py-2 px-5  text-sm md:text-base 
                rounded-md text-red hover:text-light-red md:text-white md:hover:text-light-gray font-bold border 
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-light-blue"
              >
                Sign in
              </button>
              <button
                type="button"
                className="text-sm md:text-base font-semibold text-blue hover:text-light-blue md:text-light-choose md:hover:text-semi-choose underline underline-offset-1"
                onClick={() => onRouteChange("register")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Signin;
