import styles from "./ParkingArea.module.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import AddDeleteDetailsModal from "../AddDeleteDetailsModal/AddDeleteDetailsModal";
import { useMyContext } from "../../context/DataProvider";

const ParkingArea = () => {
  const levelArray = [
    { key: 0, value: "Level 1" },
    { key: 1, value: "Level 2" },
    { key: 2, value: "Level 3" },
    { key: 3, value: "Level 4" },
    { key: 4, value: "Level 5" },
  ];
  const navigate = useNavigate();
  const { state, handleState } = useMyContext();
  const handleLogout = () => {
    // removeLocalAttribute("userName");
    // removeLocalAttribute("password");
    handleState({
      isModal: false,
      isAuth: false,
      levelNumber: 0,
    });
    navigate("/");
  };
  const handleSlotClick = (id: string) => {
    handleState({
      isModal: true,
      parkingSlotData: state.levelParking?.filter((ele) => ele.pID === id)[0],
    });
  };

  return (
    <div className={styles.parentDiv}>
      <div className={styles.mainDiv}>
        <NavBar />
        <div className={styles.subMenu}>
          <div>
            <label htmlFor="parkingLevel">Choose a Level: </label>
            <select
              name="parkingLevel"
              id={styles.parkingLevel}
              value={
                levelArray.filter((ele) => ele.key === state.levelNumber)[0]
                  .value
              }
              onChange={(e) =>
                handleState({
                  levelNumber: levelArray.filter(
                    (ele) => ele.value === e.currentTarget.value
                  )[0].key,
                })
              }
            >
              {levelArray?.map((ele) => (
                <option key={ele.key} value={ele.value}>
                  {ele.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Total Slots: 45</p>
            <p>Total Slots per level: 9</p>
          </div>
          <div>
            <p>Slots available: {45 - state.slotsBooked}</p>
            <p>Slots available per level: {9 - state.slotsBookedPerLevel}</p>
          </div>
          <div>
            <p>Slots Booked: {state.slotsBooked}</p>
            <p>Slots Booked per level: {state.slotsBookedPerLevel}</p>
          </div>
          <button className={styles.button} onClick={handleLogout}>
            Log Out
          </button>
        </div>
        <div className={styles.containerDiv}>
          {state.levelParking?.map((ele) => (
            <div
              className={styles.parkingSlots}
              key={ele.pID}
              id={ele.pID}
              style={{ backgroundColor: `${ele.parked ? "green" : "white"}` }}
              onClick={(e) => handleSlotClick(e.currentTarget.id)}
            >
              {ele.parked ? "Already Booked" : "Book Slot"}
            </div>
          ))}
        </div>
      </div>
      {state.isModal && <AddDeleteDetailsModal />}
    </div>
  );
};
export default ParkingArea;
