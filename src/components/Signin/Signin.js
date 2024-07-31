import React from "react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
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

  onSubmit = () => {
    fetch("https://face-detection-backend-eef6.onrender.com/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
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
    const { onRouteChange } = this.props;
    return (
      <div className="w-[360px] py-6 px-4 sm:px-6 lg:px-8 shadow-none md:shadow-3xl">
        <div className="w-full space-y-6 px-1 sm:px-3 lg:px-2 py-10 ">
          <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold sm:font-bold text-zinc-50">
            Sign in
          </h2>

          <div className="space-y-6">
            <div className="rounded-md shadow-sm space-y-6">
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

            <div className="flex flex-col justify-center items-center space-y-2">
              <button
                type="submit"
                onClick={this.onSubmit}
                className="group relative w-[90px] md:w-1/2
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
              >
                Sign in
              </button>
              <button
                className="text-sm text-zinc-300 hover:text-zinc-100"
                onClick={() => onRouteChange("register")}
              >
                Register?
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
