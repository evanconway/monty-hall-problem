import {
  PrizeDoor,
  selectContestantDoorSelected,
  selectHostDoorRevealed,
  selectPrizeDoor,
} from "../../state/gameSlice";
import { useAppSelector } from "../../state/hooks";

interface DoorProps {
  doorNumber: PrizeDoor;
}

const Door = ({ doorNumber }: DoorProps) => {
  const prizeDoor = useAppSelector(selectPrizeDoor);
  const contestantSelected = useAppSelector(selectContestantDoorSelected);
  const hostRevealed = useAppSelector(selectHostDoorRevealed);

  return (
    <div style={{ border: "1px red solid" }}>
      <div>{doorNumber}</div>
      <div>*</div>
    </div>
  );
};

export default Door;
