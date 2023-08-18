import { useBarContext } from "../context/BarContext";

export default function Rightbar({ todo, index }) {
  const { activeIndex, toggleBar } = useBarContext();
  console.log(activeIndex);
  return (
    <div
      className={`
          absolute
          top-0
          md:flex
          flex-col
          bg-neutral-300 
          bg-opacity-90
          w-[20vw]
          min-w-[300px]
          h-full 
          gap-3
          z-10
          ${activeIndex === index ? "right-0" : "-right-full"}
          transition-all
          duration-500
          `}
    >
      <button
        onClick={() => {
          toggleBar(null);
        }}
      >
        close
      </button>

      <div>{todo._id}</div>
    </div>
  );
}
