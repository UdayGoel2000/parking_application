import styles from "./AddDeleteDetailsModal.module.css";
import { useMyContext } from "../../context/DataProvider";

const AddDeleteDetailsModal = () => {
  const { state, handleState } = useMyContext();

  const dataValidationCheck = () => {
    const { carNumber, customerName, Phone, EntryTime, ExitTime } =
      state.parkingSlotData;

    if (carNumber.length !== 10) {
      handleState({ error: "Please Give correct 10 digits car number" });
      return false;
    }

    if (!customerName.length) {
      handleState({ error: "Please give correct customer name" });
      return false;
    }

    if (Phone?.toString().length !== 10) {
      handleState({ error: "Please enter correct 10 digit number" });
      return false;
    }

    if (!EntryTime) {
      handleState({ error: "Please enter the Entry Time" });
      return false;
    }

    if (!ExitTime) {
      handleState({ error: "Please enter the Exit Time" });
      return false;
    }

    if (EntryTime >= ExitTime) {
      handleState({ error: "Exit time should be future time from Entry time" });
      return false;
    }

    return true;
  };
  const handleClick = (type: string) => {
    handleState({ error: "" });
    if (type === "cancel") {
      handleState({ isModal: false });
    } else if (type === "add") {
      dataValidationCheck() &&
        handleState({
          parkingSlotData: { ...state.parkingSlotData, ...{ parked: true } },
          actionType: "add",
          isModal: false,
        });
    } else if (type === "update") {
      dataValidationCheck() &&
        handleState({
          actionType: "update",
          isModal: false,
        });
    } else if (type === "delete") {
      handleState({
        parkingSlotData: {
          ...state.parkingSlotData,
          ...{
            parked: false,
            carNumber: "",
            customerName: "",
            Phone: undefined,
            EntryTime: "",
            ExitTime: "",
          },
        },
        actionType: "delete",
        isModal: false,
      });
    }
  };
  const HandleInputChange = ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    handleState({
      parkingSlotData: { ...state.parkingSlotData, ...{ [key]: value } },
    });
  };
  return (
    <div className={styles.mainDiv}>
      <div className={styles.containerDiv}>
        <button
          id={styles.crossButton}
          aria-label="close modal"
          onClick={() => handleState({ isModal: false, error: "" })}
        >
          X
        </button>
        {state.error && <p className={styles.errorPara}>{state.error}</p>}
        <h3>{state.parkingSlotData.parked ? "View Details" : "Add Details"}</h3>
        <div>
          <label htmlFor="carNumber">Car Number</label>
          <input
            type="text"
            id="carNumber"
            maxLength={10}
            value={state.parkingSlotData.carNumber}
            onChange={(e) =>
              HandleInputChange({
                key: "carNumber",
                value: e.currentTarget.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            value={state.parkingSlotData.customerName}
            onChange={(e) =>
              HandleInputChange({
                key: "customerName",
                value: e.currentTarget.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            maxLength={10}
            value={state.parkingSlotData.Phone}
            onChange={(e) =>
              HandleInputChange({ key: "Phone", value: e.currentTarget.value })
            }
          />
        </div>
        <div>
          <label htmlFor="entryTime">Entry Time</label>
          <input
            type="time"
            id="entryTime"
            value={state.parkingSlotData.EntryTime}
            onChange={(e) =>
              HandleInputChange({
                key: "EntryTime",
                value: e.currentTarget.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="exitTime">Exit Time</label>
          <input
            type="time"
            id="exitTime"
            value={state.parkingSlotData.ExitTime}
            onChange={(e) =>
              HandleInputChange({
                key: "ExitTime",
                value: e.currentTarget.value,
              })
            }
          />
        </div>

        <div>
          <button
            className={styles.button}
            onClick={() =>
              handleClick(`${state.parkingSlotData.parked ? "update" : "add"}`)
            }
          >
            {state.parkingSlotData.parked ? "Update" : "Add"}
          </button>
          <button
            className={styles.button}
            onClick={() =>
              handleClick(
                `${state.parkingSlotData.parked ? "delete" : "cancel"}`
              )
            }
          >
            {state.parkingSlotData.parked ? "Delete" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddDeleteDetailsModal;
