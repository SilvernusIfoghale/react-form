import React, { useEffect, useState } from "react";

export default function DynamicForm() {
  //Error State
  const [error, setError] = useState({});

  //button disable state
  const [isActive, setIsActive] = useState(false);

  //input form data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //getting and setting input form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  //checking all input fields values
  useEffect(() => {
    const validationErrors = {};
    if (Object.values(data).every((value) => value !== "")) {
      if (!data.name.trim()) {
        validationErrors.name = "Name is required";
      } else if (data.name.length < 2) {
        validationErrors.name = "Name should be at least 3 characters";
      }
      if (!data.email) {
        validationErrors.email = "E-mail is required";
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        validationErrors.email = "E-mail is not valid";
      }
      if (!data.password.trim()) {
        validationErrors.password = "Password is required";
      } else if (data.password.length < 8) {
        validationErrors.password = "Password length less than 8 characters";
      } else if (!/\d/.test(data.password)) {
        validationErrors.password = "Password must include a number";
      } else if (data.password !== data.confirmPassword) {
        validationErrors.confirmPassword = "Password does not match";
      }
      setError(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        setIsActive(true);
      }
    } else {
      setIsActive(false);
    }
  }, [data]);

  //handling Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Name: ${data.name}\nE-mail: ${data.email}\nPassword: ${data.password}`
    );
    setIsActive(false);
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form
        className="border-4 p-6 rounded-xl min-w-[370px]"
        onSubmit={handleSubmit}
      >
        <div className="text-center border-gray-200 border-b-2 pb-4 mb-5 font-bold text-2xl italic">
          <p>Dynamic Form</p>
        </div>
        <div className="mb-2 mt-9">
          <label htmlFor="name" className="font-bold">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            onChange={handleChange}
            className="border-2 rounded-md block w-full h-9 p-2"
          />
          {error.name && (
            <span className="text-red-500 text-sm">{error.name}</span>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="font-bold">
            E-mail:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            required
            onChange={handleChange}
            className="border-2 rounded-md block w-full h-9 p-2"
          />
          {error.email && (
            <span className="text-red-500 text-sm">{error.email}</span>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="font-bold">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            // pattern="^[A-Za-z]{8-16}"
            className="border-2 rounded-md block w-full  h-9 p-2"
          />
          {error.password && (
            <span className="text-red-500 text-sm">{error.password}</span>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="font-bold">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="********"
            onChange={handleChange}
            className="border-2 rounded-md block w-full  h-9 p-2"
          />
          {error.confirmPassword && (
            <span className="text-red-500 text-sm">
              {error.confirmPassword}
            </span>
          )}
        </div>
        <div className="mt-7 text-center">
          {isActive ? (
            <button
              className="bg-blue-500 rounded-md px-6 py-2 text-white "
              type="submit"
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-blue-200 rounded-md px-6 py-2 text-white "
              type="submit"
              disabled
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
