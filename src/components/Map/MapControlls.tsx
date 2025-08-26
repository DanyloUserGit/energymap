import NavigationIcon from "./../../assets/svg/navigation.svg";

export default function MapControlls({
  zoomIn,
  zoomOut,
  resetPos,
}: {
  zoomIn: () => void;
  zoomOut: () => void;
  resetPos: () => void;
}) {
  return (
    <div className="flex absolute bottom-16 left-4 flex-col items-center gap-[8px] z-50">
      <button
        onClick={zoomIn}
        className="bg-white border py-2 px-3.5 rounded-[100%] text-center shadow-card"
      >
        +
      </button>
      <button
        onClick={zoomOut}
        className="bg-white border py-2 px-3.5 rounded-[100%] text-center shadow-card"
      >
        −
      </button>
      <button
        onClick={resetPos}
        className="bg-white border p-2 rounded-[50%] shadow-card"
      >
        <img src={NavigationIcon} alt="Navigation" />
      </button>
    </div>
  );
}
