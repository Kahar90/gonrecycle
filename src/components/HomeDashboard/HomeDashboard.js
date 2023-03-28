import UserContext from "@/utils/UserContext";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import Slider from "react-slick";
import CardHome from "./CardHome";
import CardHomeShrink from "./CardHomeShrink";
import { useWindowSize } from 'react-use-size';
import Image from "next/image";

const HomeDashboard = ({ title, children }) => {
  let width;

  if (typeof window !== 'undefined') {
    const { width: windowWidth } = useWindowSize();
    width = windowWidth;
  }

  const slickSettings = {
    dots: false,
    arrows: false,
    adaptiveHeight: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
  };

  const userContext = useContext(UserContext);
  console.log(userContext, "userContext.user");

  const handleLogout = () => {
    // alert("logout");
    const auth = getAuth();
    auth.signOut().then(() => {
      // Router.push("/login");
    });
  };

  // const HomeSlider = ({ slickSettings, children }) => {
  //   return (
  //     <Slider {...slickSettings} className="overflow-visible">
  //       {children.map((child, index) => (
  //         <div key={index}>
  //           <CardHome {...child.props} />
  //         </div>
  //       ))}
  //     </Slider>
  //   );
  // };

  return (
    <>
      {/* <div className="min-h-screen overflow-hidden bg-[url('/img/background.png')]"> */}
      <div className="min-h-screen overflow-hidden bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/img/background2.png')" }}>
        <div className="flex flex-row justify-between items-start mt-10 px-7 ">
          <h1 className="text-2xl text-black font-bold text-left ">
            Welcome to GreenRadar
            {userContext?.displayName
              ? ", " + userContext.displayName?.split(" ")[0] + "!"
              : "!"}
          </h1>
          {/* <button
            onClick={handleLogout}
            className="btn btn-ghost bg-white border-black shadow-sm hover:bg-gray-100 float-right"
          >
            <div className="flex flex-row items-center gap-2">
              <span className="text-black">Logout</span>{" "}
              <Image src="/img/svgs/logout.svg" width={20} height={20} />
            </div>
          </button> */}
        </div>
        {/* 3 cards at top */}
        <div className="flex flex-row justify-center gap-32 p-10">
        {width > 640 ? (
              <>
                  <CardHome
                    imgLink="/img/map.png"
                    title="Recycling center locations"
                    subtitle="Check the nearest recycling center to you and the items they can
                  recycle. You can also check and calculate the price of the items you
                  want to recycle!"
                    buttonText="Go to Map"
                    buttonRoute="/maps"
                  />

                  <CardHome
                    imgLink="/img/tracker.avif"
                    title="Recycling Tracker"
                    subtitle="Track your recycling journey and see how much you have recycled!"
                    buttonText="Go To Tracker"
                    buttonRoute="/tracker"
                  />

                  <CardHome
                    imgLink="/img/chatbot.avif"
                    title="Chatbot"
                    subtitle="Chat with our chatbot to get more information about recycling!"
                    buttonText="Go To Chatbot"
                    buttonRoute="/chatbot"
                  />
              </>
            ) : (
              <>
                <div class="flex flex-col">
                    <CardHomeShrink
                      imgLink="/img/map.png"
                      title="Recycling center locations"
                      subtitle="Check the nearest recycling center to you and the items they can
                    recycle."
                      buttonText="Go to Map"
                      buttonRoute="/maps"
                    />

                    <CardHomeShrink
                      imgLink="/img/tracker.avif"
                      title="Recycling Tracker"
                      subtitle="Track your recycling journey and see how much you have recycled!"
                      buttonText="Go To Tracker"
                      buttonRoute="/tracker"
                    />

                    <CardHomeShrink
                      imgLink="/img/chatbot.avif"
                      title="Chatbot"
                      subtitle="Chat with our chatbot to get more information about recycling!"
                      buttonText="Go To Chatbot"
                      buttonRoute="/chatbot"
                    />

                </div>
              </>
        )}


        </div>


        
        {/* <Slider {...slickSettings} className="overflow-visible">
          <div class="artboard artboard-horizontal phone-5 bg-red-100">
            TES SATU DUA TIGA
          </div>
          <div class="artboard artboard-horizontal phone-5 bg-red-100">
            TES SATU DUA TIGA
          </div>
          

          <div className="bg-red-200" style={{ height: "100vh" }}>
            tes kedua
          </div>
        </Slider> */}
      </div>
    </>
  );
};

export default HomeDashboard;
