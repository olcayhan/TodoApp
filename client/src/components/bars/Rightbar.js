import { useBarContext } from "../../context/BarContext";

export default function Rightbar({ todo, index }) {
  const { activeIndex, toggleBar } = useBarContext();
  const date = new Date(todo.createdAt);

  const getDate = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div
      className={`
          absolute
          top-0
          md:flex
          flex-col
          items-start
          bg-neutral-300 
          bg-opacity-90
          w-[20vw]
          min-w-[300px]
          h-full 
          gap-3
          p-3
          z-10
          ${activeIndex === index ? "right-0" : "-right-full"}
          transition-all
          duration-500
          `}
    >
      <button className="fw-bold fs-5" onClick={() => toggleBar(null)}>
        X
      </button>

      <div className="flex flex-col gap-3 fw-semibold fs-5">
        <div>
          Name : <span className="fw-normal px-2">{todo.name}</span>
        </div>
        <div>
          Created Date :
          <span className="fw-normal px-2">{getDate(todo.createdAt)}</span>
        </div>
        <div>
          Update Date :
          <span className="fw-normal px-2">{getDate(todo.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}
