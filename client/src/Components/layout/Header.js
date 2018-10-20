import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
    render() {
        return(
          <div>
          <div className=""  styles="height: 35px;"></div>
          <div className="row underline">
            <div className="col-md-8 col-sm-6">
              <div className="logo">
                <p className="mylogo"><span className="blue">Never</span><span className="red">Ever</span></p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mt-3">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/"><i className="fas fa-chart-line"> </i> Trends</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/"><i className="fas fa-plus-circle"> </i> Add Question</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active bg-secondary ml-1" to="/"> Sign Up</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="line"></div>
          </div>
        )
    }
}

export default Header;