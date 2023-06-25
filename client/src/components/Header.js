import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/TodoContext";

export default function Header() {
  const navigate = useNavigate();
  const { signin, setSignin, user } = useTodo();

  return (
    <>
      <input type="checkbox" id="check" />
      <label
        htmlFor="check"
        className="checkbtn"
        style={signin ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        <i className="fa-solid fa-bars"></i>
      </label>

      <Col
        className="sidebar"
        style={signin ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        {/* <Row className='header--head' >

          <div className=' bg-dark m-auto text-light text-center' style={{ borderRadius: '50%', width: '110px', height: '110px', fontWeight: '600', fontSize: '50px' }}>
            <p className='p-3'>{user?.fullname.charAt(0).toUpperCase()}</p>
          </div>

          <div className='bg-dark mt-auto text-light fs-6 text-center' style={{ width: '100%', height: '50px', fontWeight: '600' }}>
            <p className='p-3'>{user?.email}</p>
          </div>
        </Row> */}

        <Row className="header-home-section">
          <a href="/home">
            <i className="fa fa-home"></i>
            <span>Tasks</span>
          </a>
        </Row>

        <Row className="header-important-section">
          <a href="/important">
            <i className="fa-regular fa-star"></i>
            <span>Important</span>
          </a>
        </Row>

        <Row>
          {signin ? (
            <button
              className="header-button"
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
              className="header-button"
              onClick={() => {
                navigate("/");
              }}
            >
              Sign In
            </button>
          )}
        </Row>
      </Col>
    </>
  );
}
