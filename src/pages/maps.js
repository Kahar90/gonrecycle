import MainComp from "@/components/MainComp";
import MainCompList from "@/components/MainCompList";
import { useRouter } from "next/router";

// import { Router } from "next/router";
import { useEffect, useState } from "react";
import appFirebase from "@/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  addDoc,
} from "@firebase/firestore";

const Maps = () => {
  const [modeList, setModeList] = useState(false);
  const [markerSet, setMarkerSet] = useState({});

  const [recycleCentersList, setRecycleCentersList] = useState([]);

  const Router = useRouter();

  useEffect(() => {
    const db = getFirestore(appFirebase);

    try {
      getDocs(query(collection(db, "recyclecenters"))).then((querySnapshot) => {
        const recycleCenters = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(recycleCenters, "recycleCenters");

        setRecycleCentersList(recycleCenters);
      });
    } catch (error) {}
  }, []);

  return (
    <>
      {!modeList ? (
        <MainComp
          listRecycleCenter={recycleCentersList}
          markerSet={markerSet}
          setMarkerSet={setMarkerSet}
          setModeList={setModeList}
        />
      ) : (
        <MainCompList
          listRecycleCenter={recycleCentersList}
          markerSet={markerSet}
          setMarkerSet={setMarkerSet}
          setModeList={setModeList}
        />
      )}
    </>
  );
};

export default Maps;
