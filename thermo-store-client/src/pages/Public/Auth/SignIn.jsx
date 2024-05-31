import useTitle from "../../../hooks/useTitle";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Bars } from "react-loader-spinner";
// import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../provider/AuthProvider";

const SignIn = () => {
  useTitle("SignUp");
  const { refetch, setRefetch, loading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  const onSubmit = async (data) => {
    console.log(data);
    try {
      axios
        .post("http://localhost:3456/api/v1/signin", data)
        .then((response) => {
          if (!response.data.auth) {
            alert("login failed");
          } else {
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            setRefetch(!refetch);

            alert("login successfull");
            window.location.href = "/";
          }
        });
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  return (
    <div className="card flex-shrink-0 md:w-2/5 mx-auto my-5 rounded p-5 bg-[#97979719] text-[#717070]">
      {/* <ToastContainer /> */}
      <div className="card-body">
        <h1 className="text-lg text-center font-semibold text-[#717070] px-5 uppercase">
          SignIn
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="text-base ">
          <div className="">
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="text"
                name="email"
                {...register("email")}
                placeholder="abc@xyz.com"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300  focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                required
                {...register("password")}
                placeholder="Your password"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300  focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  Password must be more than six characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase and one special character.
                </p>
              )}
            </div>
          </div>

          <div className="form-control mt-6 flex justify-center pb-3">
            <input
              type="submit"
              value="Sign In"
              className="text-[#334B35] border rounded p-1 font-semibold hover:bg-[#334B35] hover:text-white border-[#334B35] uppercase w-full"
            />
          </div>
        </form>
        <h4 className="my-3 text-sm text-gray-500 text-center">
          Already have account?{" "}
          <Link to="/signup" className="text-[#334B35]">
            Sign Up
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SignIn;
