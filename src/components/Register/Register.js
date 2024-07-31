import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
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
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onRegisterButton = () => {
    fetch("https://face-detection-backend-eef6.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.onLoadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <div className="w-[350px] py-6 px-4 sm:px-6 lg:px-8 shadow-none md:shadow-3xl">
        <div className="w-full space-y-6 px-1 sm:px-3 lg:px-1 py-10 ">
          <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold sm:font-bold text-zinc-50">
            Register
          </h2>

          <div className="space-y-6">
            <div className="rounded-md shadow-sm space-y-6">
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="relative block
                  w-full px-3 py-2 border border-gray-300
                  bg-black
                  placeholder-zinc-400 text-zinc-100
                  focus:outline-none focus:ring-indigo-400
                  focus:border-indigo-400 focus:z-20 text-sm"
                placeholder="Name"
                onChange={this.onNameChange}
              />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block
                  w-full px-3 py-2 border border-gray-300
                  bg-black
                  placeholder-zinc-400 text-zinc-100
                  focus:outline-none focus:ring-indigo-400
                  focus:border-indigo-400 focus:z-20 text-sm"
                placeholder="Email address"
                onChange={this.onEmailChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block
                  w-full px-3 py-2 border border-gray-300
                  bg-black
                  placeholder-zinc-400
                  text-zinc-100
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 text-sm"
                placeholder="Password"
                onChange={this.onPasswordChange}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                onClick={this.onRegisterButton}
                className="group relative w-[90px] md:w-1/2
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
