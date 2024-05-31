import useTitle from "../../../hooks/useTitle";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  useTitle("SignUp");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      if (data.password !== confirmPassword) {
        toast.error("Password not matched", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("contact", data.contact);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("avatar", data.avatar[0]);

        console.log(data);
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3456/api/v1/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoading(false);
        console.log(response);
        if (response.data?.success) {
          toast.success("SignUp Successful", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          reset();
        } else {
          toast.error("Signup Failed", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating user:", error.message);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleConfirm = (e) => {
    const confirmPassword = e?.target?.value;
    setConfirmPassword(confirmPassword);
  };

  return (
    <div className="card flex-shrink-0 md:w-2/5 mx-auto my-5 rounded p-5 bg-[#97979719] text-[#717070]">
      <ToastContainer />
      <div className="card-body">
        <h1 className="text-lg text-center font-semibold text-[#717070] px-5 uppercase">
          SignUp
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="text-base">
          <div>
            <div className="form-control flex flex-col mt-1">
              <label className="label">
                <span className="label-text uppercase">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                {...register("fullName")}
                placeholder="Junaid Ahmed"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>
            <div className="form-control flex flex-col mt-1">
              <label className="label">
                <span className="label-text uppercase">Contact Number</span>
              </label>
              <input
                type="text"
                name="contact"
                {...register("contact")}
                placeholder="+8801991347811"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="text"
                name="email"
                {...register("email")}
                placeholder="abc@xyz.com"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
                required
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
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                onChange={handleConfirm}
                type="password"
                required
                placeholder="Confirm Password"
                className="input input-bordered bg-gray-100 rounded py-2 px-4 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Picture</span>
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                {...register("avatar")}
                className="input input-bordered bg-gray-100 rounded py-1 border border-gray-300 focus:border-[#334B35] focus:ring-1 focus:ring-[#334B35] focus:outline-none block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#cad2f4c3] file:text-[#334B35] hover:file:bg-[#b6c2f5c3]"
              />
            </div>
          </div>
          <div className="form-control mt-6 flex justify-center pb-3">
            <input
              type="submit"
              value="Sign Up"
              className="text-[#334B35] border rounded p-1 font-semibold hover:bg-[#334B35] hover:text-white border-[#334B35] uppercase w-full"
            />
          </div>
        </form>
        <h4 className="my-3 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#334B35]">
            Sign In
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SignUp;
