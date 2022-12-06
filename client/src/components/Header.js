import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useTodo } from '../contexts/TodoContext';



export default function Header() {
  const navigate = useNavigate()
  const { signin, setSignin } = useTodo()


  return (
    <>


      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i class="fa-solid fa-bars"></i>
      </label>




      <Col className='sidebar'>
        <Row>
          <div className='header-home-section'>
            <a href="/home" style={signin ? { visibility: "visible" } : { visibility: "hidden" }}>
              <i className="fa fa-home"></i>
              <span>Tasks</span>
            </a>
          </div>
        </Row>

        <Row>
          <div className='header-important-section' >
            <a href="/important" style={signin ? { visibility: "visible" } : { visibility: "hidden" }}>
              <i className="fa-regular fa-star"></i>
              <span>Important</span>
            </a>
          </div>
        </Row>

        <Row>
          {
            signin  ?
              <button
                className='header-button'
                onClick={(e) => {
                  setSignin(false)
                  localStorage.setItem("userID", null)
                  localStorage.setItem("user", false)
                  navigate("/signin")
                }}> Sign Out</button> : <button
                  className='header-button'
                  onClick={() => {
                    navigate("/signin")
                  }}>
                Sign In
              </button>
          }
        </Row>

      </Col>


    </>
  );
}

