import React, { useContext } from "react";
import CreateForm from "../components/CreateForm";
import UserContext from "../context/userContext";
import { Link } from "react-router-dom";

const Create = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <h2 className="text-2xl font-semibold mb-2">
          You must be logged in to create a blog
        </h2>
        <Link to="/auth" className="text-blue-500 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <CreateForm />
    </div>
  );
};

export default Create;
