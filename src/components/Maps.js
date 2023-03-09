import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";


const Maps = withScriptjs(withGoogleMap((props) => {
    return (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      </GoogleMap>
    );
  }) 
);

export default Maps;
