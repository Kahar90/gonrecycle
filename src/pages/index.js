import MainComp from "@/components/MainComp";
import MainCompList from "@/components/MainCompList";
import { useState } from "react";

const Home = () => {
  const [modeList, setModeList] = useState(false);
  const [markerSet, setMarkerSet] = useState({});

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
        {
          name: "Glass",
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
        {
          name: "Glass",
          price: 0.45,
        },
        {
          name: "Copper",
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
  return (
    <>
      {!modeList ? (
        <MainComp
          listRecycleCenter={listRecycleCenter}
          markerSet={markerSet}
          setMarkerSet={setMarkerSet}
          setModeList={setModeList}
        />
      ) : (
        <MainCompList
          listRecycleCenter={listRecycleCenter}
          markerSet={markerSet}
          setMarkerSet={setMarkerSet}
          setModeList={setModeList}
        />
      )}
    </>
  );
};

export default Home;
