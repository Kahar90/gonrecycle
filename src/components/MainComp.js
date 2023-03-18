import DetailCard from "@/components/DetailCard";
import Maps from "@/components/Maps";
import UserContext from "@/utils/UserContext";
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CalculatorDrawer from "./CalculatorDrawer";

const MainComp = ({
  setModeList,
  setMarkerSet,
  markerSet,
  listRecycleCenter,
}) => {
  const mapRef = useRef();
  const libraries = useMemo(() => ["places"], []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB4WDcCTZaVPYH_5ieA0LNPgpanjH94UN0",
    libraries: libraries,
  });

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapFunc, setMapFunc] = useState(null);
  const mapCenter = { lat: 3.139, lng: 101.6869 };

  const [searchBar, setSearchBar] = useState("");
  // console.log(searchBar, "searchBar");
  const [userLocation, setUserLocation] = useState({
    lat: 3.139,
    lng: 101.6869,
  });
  const [markerClicked, setMarkerClicked] = useState({
    visible: false,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    setMarkerClicked({});
  }, []);

  useEffect(() => {
    if (markerSet?.name) {
      setMarkerClicked({
        visible: true,
        ...markerSet,
      });
    }
  }, [markerSet?.lat]);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const Router = useRouter();

  const BackToHome = () => {
    // alert("logout");
    Router.push("/");
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  // get userContext
  const userContext = useContext(UserContext);

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* <!-- Page content here --> */}
          <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <div className="flex flex-row items-center justify-between w-full px-14 text-center mb-10 gap-10">
              <img
                src="/img/map.png"
                className="w-32 
            border-2 border-[#1C850B] cursor-pointer rounded-lg
            "
                onClick={() => {
                  setModeList(true);
                }}
              />
              <div className="flex flex-col items-center justify-center w-[600px]">
                <input
                  onChange={(e) => {
                    setSearchBar(e.target.value);
                    console.log(searchBar);
                  }}
                  type="text"
                  placeholder="Search recycle centres here"
                  class="input input-bordered w-full max-w-full bg-white shadow-lg"
                />
              </div>
              <button
                onClick={BackToHome}
                className="btn btn-ghost bg-white border-black shadow-sm hover:bg-gray-100 hover:border-black float-right"
              >
                <Image src="/img/svgs/goback.svg" width={30} height={30} />
              </button>
            </div>
            <div className="  bg-white rounded-box shadow-lg min-h-[600px] w-[95vw]">
              {/* init google maps */}
              <GoogleMap
                options={mapOptions}
                zoom={markerSet?.name ? 16 : 12}
                center={
                  markerSet?.name
                    ? { lat: markerSet.lat, lng: markerSet.lng }
                    : userLocation
                }
                mapContainerStyle={{ width: "100%", height: "80vh" }}
                onLoad={(map) => {
                  setMapLoaded(true);
                  setMapFunc(map);
                }}
              >
                {mapLoaded
                  ? listRecycleCenter
                      .filter((item) => {
                        if (searchBar === "") {
                          return item;
                        } else if (
                          item.name
                            .toLowerCase()
                            .includes(searchBar.toLowerCase())
                        ) {
                          return item;
                        } else {
                          return null;
                        }
                      })
                      .map((item, index) => {
                        // console.count("atasss");s
                        return (
                          <MarkerF
                            key={index}
                            position={{ lat: item.lat, lng: item.lng }}
                            title={item.name}
                            label={{
                              text: item.name,
                              className:
                                "text-[#83CDAC] font-normal mb-14 bg-white",
                            }}
                            onClick={() => {
                              setMarkerClicked({
                                ...item,
                                visible: true,
                              });

                              mapFunc.panTo({
                                lat: item.lat,
                                lng: item.lng,
                              });
                            }}
                          />
                        );
                      })
                  : null}

                {/* user location marker */}
                <MarkerF
                  position={{ lat: userLocation.lat, lng: userLocation.lng }}
                  title="Your Location"
                  label={{
                    text: "Your Location",
                    className: "text-[#83CDAC] font-normal mb-14 bg-white",
                  }}
                />
              </GoogleMap>

              {/* left bottom corner, position abosulte */}
              <div className="absolute bottom-20 left-15 p-4">
                <div
                  className={`${
                    markerClicked.visible
                      ? "transition-all duration-300 ease-in-out transform opacity-100 translate-y-0"
                      : "transition-all duration-300 ease-in-out transform opacity-0 translate-y-10 "
                  }`}
                >
                  <DetailCard
                    item={markerClicked}
                    title={markerClicked.name}
                    lat={markerClicked.lat}
                    long={markerClicked.lng}
                    setMarkerClicked={setMarkerClicked}
                    userLocation={userLocation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-1/3 bg-white text-base-content">
            {/* <!-- Sidebar content here --> */}
            <CalculatorDrawer pricesArray={markerClicked.prices || []} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainComp;
