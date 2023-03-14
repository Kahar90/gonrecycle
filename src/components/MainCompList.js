import Image from "next/image";
import { useEffect, useState } from "react";
import FilterComp from "./FilterComp";

const MainCompList = ({
  setModeList,
  markerSet,
  setMarkerSet,
  listRecycleCenter,
}) => {
  let distance;
  let time;
  const calculateDistance = (item) => {
    // get distance between two points
    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    const rad = (x) => {
      return (x * Math.PI) / 180;
    };

    const R = 6378137; // Earth’s mean radius in meter
    const dLat = rad(item.lat - userLocation.lat);
    const dLong = rad(item.lng - userLocation.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(userLocation.lat)) *
        Math.cos(rad(item.lat)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    // convert meter to km
    distance = d / 1000;

    return distance.toFixed(2);
  };

  const calculateTime = () => {
    // 1km = 5 minutes
    // for example return : 1 hour away, 5 mins away, 10 mins away
    time = (distance * 5).toFixed(0);
    let timeString = "";
    if (time > 60) {
      timeString = `${Math.floor(time / 60)} hour ${time % 60} mins`;
    } else {
      timeString = `${time} mins`;
    }

    return timeString;
  };

  const [userLocation, setUserLocation] = useState({
    lat: 3.139,
    lng: 101.6869,
  });

  // unique entry
  let ItemToFilter = listRecycleCenter.reduce((acc, item) => {
    item.prices.forEach((price) => {
      if (!acc.includes(price.name)) {
        acc.push(price.name);
      }
    });
    return acc;
  }, []);

  const [filterToggled, setfilterToggled] = useState(true);

  //   console.log(ItemToFilter);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const [filter, setFilter] = useState({
    toFilterName: "",
    sort: "highFirst", // highFirst, lowFirst, distance
    search: "",
  });

  const getFilteredLists = (item) => {
    let filteredLists = listRecycleCenter.filter((item) => {
      if (filter.toFilterName === "") {
        return true;
      } else {
        return item.prices.some((price) => {
          return price.name === filter.toFilterName;
        });
      }
    });

    filteredLists = filteredLists.filter((item) => {
      return item.name.toLowerCase().includes(filter.search.toLowerCase());
    });

    if (filter.sort === "highFirst") {
      filteredLists = filteredLists.sort((a, b) => {
        return (
          b.prices.find((price) => {
            return price.name === filter.toFilterName;
          })?.price -
          a.prices.find((price) => {
            return price.name === filter.toFilterName;
          })?.price
        );
      });
    } else if (filter.sort === "lowFirst") {
      filteredLists = filteredLists.sort((a, b) => {
        return (
          a.prices.find((price) => {
            return price.name === filter.toFilterName;
          })?.price -
          b.prices.find((price) => {
            return price.name === filter.toFilterName;
          })?.price
        );
      });
    } else if (filter.sort === "distance") {
      filteredLists = filteredLists.sort((a, b) => {
        return calculateDistance(a) - calculateDistance(b);
      });
    }

    return filteredLists;
  };

  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="main-comp-list bg-gray-100 min-h-screen">
      <div className="flex flex-row items-center justify-center gap-10 w-full px-14 text-center pt-10 ">
        <img
          src="/img/map.png"
          className="w-32 cursor-pointer"
          onClick={() => {
            setModeList(false);
          }}
        />
        <div className="flex flex-col items-center justify-center w-[300px]">
          <input
            value={filter.search}
            onChange={(e) => {
              setFilter({
                ...filter,
                search: e.target.value,
              });
            }}
            type="text"
            placeholder="Search recycle centres here"
            class="input input-bordered w-full max-w-full bg-white shadow-lg"
          />
        </div>
        <div
          onClick={() => {
            setfilterToggled(!filterToggled);
            setFilter({
              toFilterName: "",
              sort: "highFirst", // highFirst, lowFirst, distance
              search: "",
            });
          }}
          className={
            "flex flex-row items-center justify-center gap-2 w-12 h-14 bg-white rounded-lg shadow-lg cursor-pointer" +
            (filterToggled ? " bg-white" : " bg-gray-200")
          }
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path d="M23 0l-9 14.146v7.73l-3.996 2.124v-9.853l-9.004-14.147h22zm-20.249 1l8.253 12.853v8.491l1.996-1.071v-7.419l8.229-12.854h-18.478z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-1 text-left pb-10 gap-11">
        <div
          className={`${
            !filterToggled
              ? "transition-all duration-500 mb-[-50px]"
              : //   vertical transition, hidden
                "transition-all duration-500  transform translate-y-[-800px] mb-[-350px]"
          }  `}
        >
          <FilterComp
            setFilter={setFilter}
            ItemToFilter={ItemToFilter}
            filter={filter}
            // transition when appearing
          />
        </div>

        {/* <h1 className="text-2xl mr-4 text-[#373737] rounded-md p-2 w-[1000px] mb-[-50px]">
          SUGGESTED
        </h1> */}
        <div className="" />

        {getFilteredLists(listRecycleCenter).map((item, index) => {
          return (
            <div className="flex flex-row items-start justify-between w-[1000px] min-h-[200px] px-1 text-center shadow-md bg-white rounded-lg ">
              <div className="flex flex-col items-start justify-center  mt-5 w-1/3 min-h-full px-1 text-left mb-10">
                <p className="text-xl font-bold mr-5 text-[#373737] rounded-md p-2 text-left ">
                  {item.name}
                </p>
                <p className="text-xl font-normal mr-5 text-[#373737] rounded-md p-2 text-left  w-[300px]">
                  {calculateDistance(item)} km away
                </p>
                <p className="text-xl font-normal mr-5 text-[#373737] rounded-md p-2 text-left w-[300px]">
                  {calculateTime()} away
                </p>
                <a
                  onClick={() => {
                    setModeList(false);
                    setMarkerSet(item);
                  }}
                  className="mt-[10px] ml-2 text-blue-300 cursor-pointer"
                >
                  Show on map
                </a>
              </div>

              <div className="flex flex-col items-end w-2/4  justify-end py-5 px-1 text-center">
                {item.prices.length > 0 && (
                  <p className="text-xl font-bold mr-5 text-[#373737] rounded-md p-2 text-center ml-1">
                    Price List
                  </p>
                )}
                {item.prices.map((item, index) => {
                  return (
                    <div className="flex flex-row items-start justify-end w-full px-1">
                      <p className="text-lg font-normal mr-5 text-[#373737] rounded-md p-2 ">
                        {item.name}
                      </p>
                      <p className="text-lg font-normal mr-5 text-[#373737] rounded-md p-2 ">
                        RM {item.price}/kg
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCompList;
