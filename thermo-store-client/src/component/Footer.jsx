import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { GrFacebook } from "react-icons/gr";
import { TfiTwitterAlt } from "react-icons/tfi";

const Footer = () => {
  return (
    <div className="bg-[#334B35] py-20 px-5 md:px-10 mt-2" id="footer">
      <div className=" grid grid-cols-1 md:grid-cols-3  text-lg ">
        <div className="">
          <img
            className="h-12 w-auto"
            src="https://i.ibb.co/cCbd5Gm/photo-2023-10-11-09-36-24.jpg"
            alt=""
          />
          <p className="mt-5">
            Making the world a better place through constructing elegant
            hierarchies.
          </p>
          <div className="flex mt-5">
            <GrFacebook className="w-10 h-6"></GrFacebook>
            <BsInstagram className="w-10 h-6"></BsInstagram>
            <TfiTwitterAlt className="w-10 h-6"></TfiTwitterAlt>
            <BsGithub className="w-10 h-6"></BsGithub>
            <BsLinkedin className="w-10 h-6"></BsLinkedin>
          </div>
        </div>
        <div className=" mt-5 md:mt-0 flex gap-32 md:ml-10">
          <div className="text-gray-50">
            <h1 className="text-gray-0 font-bold">Solutions</h1>
            <p className="my-3">
              <a href="">Marketing</a>
            </p>
            <p className="my-3">
              <a href="">Analytics</a>
            </p>
            <p className="my-3">
              <a href="">Commerce</a>
            </p>
            <p className="my-3">
              <a href="">Insights</a>
            </p>
          </div>
          <div className="text-gray-50">
            <h1 className="text-gray-50 font-bold">Support</h1>
            <p className="my-3">
              <a href="">Pricing</a>
            </p>
            <p className="my-3">
              <a href="">Documentation</a>
            </p>
            <p className="my-3">
              <a href="">Guides</a>
            </p>
            <p className="my-3">
              <a href="">API Status</a>
            </p>
          </div>
        </div>
        <div className=" mt-5 md:mt-0 flex gap-32">
          <div className="text-gray-50">
            <h1 className="text-gray-50 font-bold">Company</h1>
            <p className="my-3">
              <a href="">About</a>
            </p>
            <p className="my-3">
              <a href="">Blog</a>
            </p>
            <p className="my-3">
              <a href="">Jobs</a>
            </p>
            <p className="my-3">
              <a href="">Press</a>
            </p>
            <p className="my-3">
              <a href="">Partners</a>
            </p>
          </div>
          <div className="text-gray-50">
            <h1 className="text-gray-50 font-bold">Legal</h1>
            <p className="my-3">
              <a href="">Claim</a>
            </p>
            <p className="my-3">
              <a href="">Privacy</a>
            </p>
            <p className="my-3">
              <a href="">Terms</a>
            </p>
            <p className="my-3">
              <a href="">Security</a>
            </p>
          </div>
        </div>
      </div>
      <hr className="mt-10" />
      <p className="mt-10">© 2020 Your Company, Inc. All rights reserved.</p>
    </div>
  );
};

export default Footer;
