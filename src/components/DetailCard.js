const DetailCard = ({ setMarkerClicked, userLocation, item }) => {
  let distance = 0;
  let time = "";

  const calculateDistance = () => {
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

  const openOrClose = () => {
    // 8 am - 5 pm
    // if time is between 8 am - 5 pm return open
    // else return close

    const date = new Date();

    return date.getHours() >= 8 && date.getHours() <= 17;
  };

 

  return (
    <>
      <div class="card w-96 bg-white shadow-xl">
        <div class="card-body">
          <div className="flex flex-row justify-between">
            <h2 class="card-title text-black">{item?.name}</h2>
            <button
              class="bg-transparent text-black mb-8"
              onClick={() => {
                setMarkerClicked({});
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-row justify-between mt-5 text-gray-600">
            <p>
              {openOrClose() === true ? (
                <span className="text-green-500">Open</span>
              ) : (
                <span className="text-red-500">Close</span>
              )}
            </p>
            <p>
              {calculateDistance()}
              km away
            </p>
            <p>{calculateTime()}</p>
          </div>
          <div class="card-actions justify-start mt-5">
            <div className="flex flex-row justify-between align-bottom gap-5">
              <button class="btn btn-primary bg-slate-600 text-white">
                View Details
              </button>
              <button class="btn btn-primary bg-slate-600 text-white">
                Navigate
              </button>
            </div>

            <div className="flex flex-col justify-between align-middle mt-5 gap-2">
              {/* item.prices go through the object */}
              {item.prices?.map((price) => {
                return (
                  <div className="flex flex-row justify-between text-start text-green-800 w-64">
                    <p>
                      {price.name + " "} RM{price.price}/kg
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
