const Home = () => {
  return (
    <div className="lg:w-10/12 mx-auto">
      <div className="my-2 relative ">
        <img src="banner.png" alt="" />
        <div className="absolute top-[90px] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
          <h4>Original and Natural</h4>
          <h1 className="text-[#F7C35F] md:text-4xl font-bold">
            Optimized Cold Storage Solutions
          </h1>
          <p className="text-xs md:text-lg">
            Manage your cold storage facilities with ease and efficiency. Our
            system ensures optimal temperature control, real-time inventory
            tracking, and seamless operations.
          </p>
          <button className="text-black bg-[#F7C35F] text-xs lg:text-md px-2 py-1 rounded ">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
