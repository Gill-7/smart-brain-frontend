import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      errorMsg: "",
    };
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value,
      errorMsg: "",
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  handlerRegister = (e) => {
    e.preventDefault();

    let trimName = this.state.name.trim();
    let trimEmail = this.state.email.trim();

    this.setState({
      name: trimName,
      email: trimEmail,
    });

    const form = e.target.closest("form");
    if (form.checkValidity()) {
      // fetch("http://localhost:3000/register", {
      fetch("https://smart-brain-backend-five.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 400) {
              throw new Error(
                "Unable to register! Please use different email!"
              );
            } else {
              throw new Error("Registration failed");
            }
          }
          return response.json();
        })
        .then((data) => {
          if (data.userId && data.success === "true") {
            this.saveAuthTokenInSession(data.token);
            // fetch(`http://localhost:3000/profile/${data.userId}`, {
            fetch(
              `https://smart-brain-backend-five.vercel.app/profile/${data.userId}`,
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
                  this.props.onLoadUser(user);
                  this.props.onRouteChange("home");
                }
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
          this.setState({ errorMsg: error.message });
        });
    } else {
      form.reportValidity();
    }
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <form
        className="w-11/12 semi-sm:w-[360px] md:w-[380px] px-4 sm:px-6 lg:px-8 shadow-none md:shadow-3xl font-sans text-black md:text-white"
        onSubmit={this.handlerRegister}
      >
        <div className="w-full md:px-2 md:py-10">
          <h2 className="text-left md:text-center text-3xl font-extrabold text-red md:text-white">
            Create an account?
          </h2>

          <div className="mt-8 relative">
            <div className="rounded-md">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full my-6 py-1 md:px-3 md:py-2.5 border-b md:border-none border-light-gray placeholder-gray md:placeholder-black text-black
                  focus:outline-none md:rounded-md
                  text-sm md:text-base font-normal placeholder:text-sm"
                placeholder="Name"
                onChange={this.onNameChange}
              />
              <input
                id="email-address"
                name="email"
                type="email"
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
                minLength={6}
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
                Sign up
              </button>
              <button
                type="button"
                className="text-sm md:text-base font-semibold text-blue hover:text-light-blue md:text-light-choose md:hover:text-semi-choose underline underline-offset-1"
                onClick={() => onRouteChange("signin")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;
