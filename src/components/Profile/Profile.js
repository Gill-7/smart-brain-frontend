import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      date_of_birth: this.props.user.date_of_birth,
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "date-birth":
        this.setState({ date_of_birth: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    // fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
    fetch(
      `https://face-detection-backend-eef6.onrender.com/profile/${this.props.user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          formInput: data,
        }),
      }
    )
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          this.props.toggleProfileModal();
          this.props.onLoadUser({ ...this.props.user, ...data });
        }
      })
      .catch(console.log);
  };

  render() {
    const { toggleProfileModal, user } = this.props;
    const { name, date_of_birth } = this.state;

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };

    const isoDateString = user.joined;
    const date = new Date(isoDateString);

    const customFormattedDate = date.toLocaleDateString(undefined, options);

    const isoDateBirthString = date_of_birth;
    const dateBirth = new Date(isoDateBirthString);
    const customDateBirth = dateBirth.toLocaleDateString(undefined, options);

    return (
      <div className="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
        <div className="relative w-11/12 semi-sm:w-[420px] md:w-[580px] font-sans text-white shadow-none md:shadow-md flex flex-col md:flex-row border border-gray divide-y md:divide-x divide-gray bg-dark">
          <div className="w-full md:w-5/12 p-8 flex flex-col md:justify-start md:items-start">
            <h2 className="text-2xl mb-3  md:mb-4 font-bold">{name}</h2>
            <p className="text-sm font-mono">
              Images submitted: {user.entries}
            </p>
            {customDateBirth && (
              <p className="text-xs font-mono">
                Date of Birth: {customDateBirth}
              </p>
            )}
            <p className="text-xs font-mono">{`Member Since: ${customFormattedDate}`}</p>
          </div>
          <div className="flex flex-col md:justify-center md:items-start w-full md:w-7/12 p-8">
            <h2 className="text-xl semi-sm:text-2xl md:pt-0 pb-4 md:pb-5 text-left font-bold text-red md:text-white">
              Update your info?
            </h2>

            <div className="relative">
              <div className="rounded-md">
                <label className="text-xs md:text-sm">Name</label>
                <input
                  id="name"
                  name="user-name"
                  type="text"
                  placeholder={user.name}
                  style={{ backgroundColor: "transparent" }}
                  className="relative block w-full mb-4 border-b border-gray placeholder-gray md:placeholder-light-gray text-white
                  focus:outline-none
                  text-sm font-normal placeholder:text-sm"
                  onChange={this.onFormChange}
                />
                <label className="text-xs md:text-sm">Email</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  placeholder={user.email}
                  style={{ backgroundColor: "transparent" }}
                  className="relative block w-full mb-4 border-b border-gray placeholder-gray md:placeholder-light-gray text-white
                  focus:outline-none
                  text-sm font-normal placeholder:text-sm disabled:opacity-50"
                  disabled={true}
                />
                <label className="text-xs md:text-sm">Date of Birth</label>
                <input
                  id="dateBirth"
                  name="date-birth"
                  type="date"
                  style={{ backgroundColor: "transparent" }}
                  className="relative block w-full mb-4 border-b border-gray placeholder-gray md:placeholder-light-gray text-white
                  focus:outline-none
                  text-sm font-normal placeholder:text-sm"
                  onChange={this.onFormChange}
                />
              </div>
              <div className="flex flex-row justify-between items-center mt-7">
                <button
                  type="submit"
                  className="relative 
                py-1.5 md:py-1.5 px-4  text-xs md:text-sm 
                rounded-md text-red hover:text-light-red md:text-white md:hover:text-light-gray font-bold border 
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-light-blue"
                  onClick={() => this.onProfileUpdate({ name, date_of_birth })}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="relative 
                 py-1.5 md:py-1.5 px-4 text-xs md:text-sm 
                rounded-md text-red hover:text-light-red md:text-white md:hover:text-light-gray font-bold border 
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-light-blue"
                  onClick={toggleProfileModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="absolute right-3 text-2xl border-none"
            onClick={toggleProfileModal}
          >
            &times;
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;
