import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpTypeInput } from "../../../common/src/index";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
const navigate = useNavigate();
  const [postInput, setPostInput] = useState<signUpTypeInput>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest() {
    try{
        const response = await axios.post(
            `${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`
        , postInput);
        const jwt = await response.data.token;
        console.log(jwt) ;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
    }
    catch(e){
        alert("error has occured") ;
        console.log(e) ;
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-[100%] space-y-5">
      <div>
        <div className=" text-center text-2xl font-bold">
          {type === "signup" ? "Create an account" : "Login using Email id"}
        </div>
        <div className="text-slate-500 ">
          {type === "signup"
            ? `Already have an account? `
            : "Dont't have an account? "}

          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className=" text-blue-700  hover:underline"
          >
            {type === "signup" ? "Signin" : "Signup"}
          </Link>
        </div>
      </div>

      {type === "signup" && (
        <LabelledInput
          label="Name"
          placeholder="Anubhav Vijayvargeeya"
          onChange={(e) => {
            setPostInput({
              ...postInput,
              name: e.target.value,
            });
          }}
        />
      )}
      <LabelledInput
        label="Email"
        placeholder="avtganubhavvijay@gmail.com"
        onChange={(e) => {
          setPostInput({
            ...postInput,
            email: e.target.value,
          });
        }}
      />
      <LabelledInput
        label="Password"
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setPostInput({
            ...postInput,
            password: e.target.value,
          });
        }}
      />

      <button
        type="button" onClick={sendRequest}
        className=" mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <div className="w-[80%]">
      <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};
