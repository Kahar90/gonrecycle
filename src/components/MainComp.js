import DetailCard from "@/components/DetailCard";
import Maps from "@/components/Maps";
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

const MainComp = () => {
  const libraries = useMemo(() => ["places"], []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB4WDcCTZaVPYH_5ieA0LNPgpanjH94UN0",
    libraries: libraries,
  });

  const mapCenter = { lat: 3.139, lng: 101.6869 };

  const [searchBar, setSearchBar] = useState("");
  const [userLocation, setUserLocation] = useState({
    lat: 3.139,
    lng: 101.6869,
  });
  const [markerClicked, setMarkerClicked] = useState({});

  const listRecycleCenter = [
    {
      // 3.1367760422659887, 101.70997506332357
      lat: 3.1367760422659887,
      lng: 101.70997506332357,
      name: "Recycling Centre 1,",
      prices: [],
    },
    {
      // 3.161459105704862, 101.71100682491723
      lat: 3.161459105704862,
      lng: 101.71100682491723,
      name: "Drive-Thru Recycling Centre Alam Flora (DTRC)",
      prices: [
        {
          name: "Newspaper",
          price: 0.11,
        },
        {
          name: "Plastic",
          price: 0.25,
        },
        {
          name: "Aluminium",
          price: 0.39,
        },
        {
          name: "Cardboard",
          price: 0.42,
        },
      ],
    },
    {
      // 3.144655796429835, 101.78242977906342
      lat: 3.144655796429835,
      lng: 101.78242977906342,
      name: "Tzu chi Ampang recycling centre",
      prices: [
        {
          name: "Newspaper",
          price: 0.12,
        },
        {
          name: "Plastic",
          price: 0.25,
        },
        {
          name: "Aluminium",
          price: 0.32,
        },
        {
          name: "Cardboard",
          price: 0.45,
        },
      ],
    },
    {
      // 3.2032841624538184, 101.64508962008168
      lat: 3.2032841624538184,
      lng: 101.64508962008168,
      name: "Recycling Center 資源回收站",
      prices: [
        {
          name: "Newspaper",
          price: 0.15,
        },
        {
          name: "Plastic",
          price: 0.21,
        },
        {
          name: "Aluminium",
          price: 0.32,
        },
        {
          name: "Cardboard",
          price: 0.47,
        },
      ],
    },
    {
      // 3.094266890603996, 101.65469782953963
      lat: 3.094266890603996,
      lng: 101.65469782953963,
      name: "PJ Fibre Recovery Sdn Bhd",
      prices: [
        {
          name: "Newspaper",
          price: 0.11,
        },
        {
          name: "Plastic",
          price: 0.25,
        },
        {
          name: "Aluminium",
          price: 0.39,
        },
        {
          name: "Cardboard",
          price: 0.42,
        },
      ],
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  //   console.log("searchBAR", searchBar);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <div className="flex flex-row items-center justify-center w-full px-14 text-center mb-10">
          <h1 className="text-2xl font-bold mr-5 text-[#83CDAC] rounded-md p-2 bg-white shadow-lg w-[300px]">
            Google Maps
          </h1>
          <div className="flex flex-col items-center justify-center w-[300px]">
            <input
              onChange={(e) => {
                setSearchBar(e.target.value);
              }}
              type="text"
              placeholder="Search recycle centres here"
              class="input input-bordered w-full max-w-full bg-white shadow-lg"
            />
          </div>
        </div>
        <div className="  bg-white rounded-box shadow-lg min-h-[600px] w-[95vw]">
          {/* init google maps */}
          <GoogleMap
            options={mapOptions}
            zoom={12}
            center={mapCenter}
            // mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: "100%", height: "80vh" }}
            onLoad={() => console.log("Map Component Loaded...")}
          >
            {searchBar === ""
              ? listRecycleCenter.map((item, index) => {
                  console.log("atasss");
                  return (
                    <Marker
                      key={index}
                      position={{ lat: item.lat, lng: item.lng }}
                      title={item.name}
                      label={{
                        text: item.name,
                        className: "text-[#83CDAC] font-normal mb-14 bg-white",
                      }}
                      onClick={() => {
                        setMarkerClicked(item);
                      }}
                    />
                  );
                })
              : listRecycleCenter.map((item) => {
                  console.log("bvawahhh");
                  if (
                    item.name.toLowerCase().includes(searchBar.toLowerCase())
                  ) {
                    return (
                      <Marker
                        key={item.name}
                        position={{ lat: item.lat, lng: item.lng }}
                        title={item.name}
                        label={{
                          text: item.name,
                          className:
                            "text-[#83CDAC] font-normal mb-14 bg-white",
                        }}
                        onClick={() => {
                          setMarkerClicked(item);
                        }}
                      />
                    );
                  }
                })}

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
            {markerClicked.name && (
              <DetailCard
                item={markerClicked}
                title={markerClicked.name}
                lat={markerClicked.lat}
                long={markerClicked.lng}
                setMarkerClicked={setMarkerClicked}
                userLocation={userLocation}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComp;
