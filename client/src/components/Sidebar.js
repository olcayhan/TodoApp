import { useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/TodoContext";
import { useState } from "react";
import useUser from "../hooks/useUser";

export default function Sidebar() {
  const navigate = useNavigate();
  const { signin, setSignin } = useTodo();
  const [isSidebar, setSidebar] = useState(false);
  const { data: user } = useUser();

  return (
    <>
      <div className="absolute z-50 right-10 top-4">
        <div
          onClick={() => setSidebar(!isSidebar)}
          htmlFor="check"
          className="
            text-3xl
            text-yellow-500
            bg-blue-500
            px-2
            py-1
            rounded-md
            cursor-pointer
            z-50
            xl:hidden
          "
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>

      <div
        className="
          hidden  
          xl:flex
          flex-col 
          justify-between 
          col-span-2 
          bg-slate-700 
          w-full
          h-full 
          gap-3
          "
      >
        <div className="flex flex-col justify-center gap-1">
          <div
            className="
            flex
            flex-col
            items-center
            justify-center 
          bg-[#00adb5]
            opacity-80
            gap-8
            pt-4
           "
          >
            <div
              className="
              flex
              flex-col
              items-center
              justify-center
              bg-dark
            text-slate-50
              text-center
              rounded-full
              w-[200px]
              h-[200px]
              font-semibold
              text-5xl
              "
            >
              <p className="p-3">{user?.fullname.charAt(0).toUpperCase()}</p>
            </div>

            <div
              className="bg-slate-900 text-slate-50 text-xl text-center"
              style={{ width: "100%", height: "50px", fontWeight: "600" }}
            >
              <p className="p-3">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-row justify-start items-center w-full text-xl">
            <a
              className="w-full text-neutral-900 px-3 py-2 hover:opacity-80 hover:bg-slate-200"
              href="/home"
            >
              <i className="fa fa-home text-[#8d9eff]"></i>
              <span className="px-2 text-slate-50">Tasks</span>
            </a>
          </div>

          <div className="flex flex-row justify-start items-center w-full text-xl">
            <a
              className="w-full text-neutral-900 px-3 py-2 hover:opacity-80 hover:bg-slate-200"
              href="/important"
            >
              <i className="fa-regular fa-star text-[crimson]"></i>
              <span className="px-2 text-slate-50">Important</span>
            </a>
          </div>
        </div>

        <div>
          {signin ? (
            <button
              className="
              w-full
              bg-slate-500
              text-xl
              text-neutral-50
              py-3
              border-none
              hover:opacity-70
            "
              onClick={(e) => {
                setSignin(false);
                localStorage.removeItem("userID");
                localStorage.removeItem("user");
                navigate("/");
              }}
            >
              {" "}
              Sign Out
            </button>
          ) : (
            <button
              className="
            w-full
            bg-slate-500
            text-xl
            text-neutral-50
            py-3
            border-none
            hover:opacity-70
           "
              onClick={() => {
                navigate("/");
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* mobbile */}
      <div
        className={`
            block
            xl:hidden
            fixed
            ${isSidebar ? "left-0" : "-left-full"}
            w-full
            h-full 
          bg-neutral-50 
            z-40 
            transition-all
            duration-500
            `}
      >
        <div
          className="
          xl:hidden
          flex  
          flex-col 
          justify-between 
          col-span-2 
          bg-slate-700 
          w-full
          h-full 
          gap-3
          "
        >
          <div className="flex flex-col justify-center  gap-1">
            <div
              className="
              flex
              flex-col
              items-center
              justify-center 
            bg-[#00adb5]
              opacity-80
              gap-8
              pt-4
           "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  bg-slate-900
                text-slate-50
                  text-center
                  rounded-full
                  w-[200px]
                  h-[200px]
                  font-semibold
                  text-5xl
            "
              >
                <p className="p-3">{user?.fullname.charAt(0).toUpperCase()}</p>
              </div>

              <div
                className="bg-slate-900 text-slate-50 text-xl text-center"
                style={{ width: "100%", height: "50px", fontWeight: "600" }}
              >
                <p className="p-3">{user?.email}</p>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center w-full text-xl">
              <a
                className="w-full text-neutral-900 px-3 py-2 hover:opacity-80 hover:bg-slate-200"
                href="/home"
              >
                <i className="fa fa-home text-[#8d9eff]"></i>
                <span className="px-2 text-slate-50">Tasks</span>
              </a>
            </div>

            <div className="flex flex-row justify-start items-center w-full text-xl">
              <a
                className="w-full text-neutral-900 px-3 py-2 hover:opacity-80 hover:bg-slate-200"
                href="/important"
              >
                <i className="fa-regular fa-star text-[crimson]"></i>
                <span className="px-2 text-slate-50">Important</span>
              </a>
            </div>
          </div>

          <div>
            {signin ? (
              <button
                className="
              w-full
              bg-slate-500
              text-xl
              text-neutral-50
              py-3
              border-none
              hover:opacity-70
            "
                onClick={(e) => {
                  setSignin(false);
                  localStorage.removeItem("userID");
                  localStorage.removeItem("user");
                  navigate("/");
                }}
              >
                {" "}
                Sign Out
              </button>
            ) : (
              <button
                className="
            w-full
            bg-slate-500
            text-xl
            text-neutral-50
            py-3
            border-none
            hover:opacity-70
           "
                onClick={() => {
                  navigate("/");
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}