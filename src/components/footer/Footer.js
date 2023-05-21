import React from "react";
import "../footer/Footer.css";
import { AiOutlineGithub } from "react-icons/ai";
import { RxTwitterLogo, RxLinkedinLogo } from "react-icons/rx";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-header">Connect With Me</div>
      <ul className="list-non-bullet">
        <li className="list-item-inline">
          <a
            target="_blank"
            href="https://github.com/RaghaniMadhu"
            rel="noreferrer"
          >
            <AiOutlineGithub size={42} />
          </a>
        </li>
        <li className="list-item-inline">
          <a
            target="_blank"
            href="https://twitter.com/MadhuRaghani"
            rel="noreferrer"
          >
            <RxTwitterLogo size={42} />
          </a>
        </li>
        <li className="list-item-inline">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/madhu-raghani-28541a132/"
            rel="noreferrer"
          >
            <RxLinkedinLogo size={42} />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
