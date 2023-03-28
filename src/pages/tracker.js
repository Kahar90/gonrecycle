import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import NavigationBar from "@/components/NavigationBar";
import { useEffect } from "react";
import styles from "../styles/prompt.module.css";
import Image from "next/image";

const Tracker = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);

  const addReminder = () => {
    const reminder = prompt("Enter a reminder:");
    if (reminder) {
      setReminders([...reminders, { date, reminder }]);
    }
  };

  const deleteReminder = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const reminder = reminders.find((r) => r.date.toDateString() === date.toDateString());
      if (reminder) {
        return (
          <div style={{ backgroundColor: "green" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: "bold", color: "white" }}>{reminder.reminder}</p>
            <button onClick={() => deleteReminder(reminders.indexOf(reminder))}>Delete</button>
          </div>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="bg-[url('/img/background2.png')] min-h-screen w-screen">
      <NavigationBar />
      <br></br>
      <div className="flex flex-col items-center justify-center w-2/3 min-h-screen mx-auto py-2">
        <div className="mb-4">
          <button className="bg-dark-green text-white py-2 px-4 rounded" onClick={addReminder}>
            Add Reminder
          </button>
        </div>
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          tileClassName="cursor-pointer"
          style={{ height: '5000px', width: '7500px' }}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.prompt}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image src={"/img/logo.png"} width={150} height={60}/>
        </div>
          <h1>Sorry, this page is under development.</h1>
          <p>Please come back later.</p>
          <br></br>
          <button className="bg-dark-green text-white py-2 px-4 rounded" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Tracker;


// import "react-calendar/dist/Calendar.css";
// import CalendarComp from "@/components/Calendar";
// import { Calendar } from "react-calendar";
// import "./TrackerCalendar.module.css";

// const Tracker = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen w-screen">
//       <div className="flex flex-col items-center justify-center w-2/3 min-h-screen mx-auto py-2 bg-white">
//         <CalendarComp />
//       </div>
//     </div>
//   );
// };

// export default Tracker;




