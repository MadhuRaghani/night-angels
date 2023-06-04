import React from "react";
import "../footer/Footer.css";
import { AiOutlineGithub, AiOutlineHeart } from "react-icons/ai";
import { RxTwitterLogo, RxLinkedinLogo } from "react-icons/rx";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-header">
        Made with <AiOutlineHeart size={14} /> by Madhu
      </div>
      <ul className="list-non-bullet">
        <li className="list-item-inline">
          <a
            target="_blank"
            href="https://github.com/RaghaniMadhu"
            rel="noreferrer"
          >
            <AiOutlineGithub size={28} />
          </a>
        </li>
        <li className="list-item-inline">
          <a
            target="_blank"
            href="https://twitter.com/MadhuRaghani"
            rel="noreferrer"
          >
            <RxTwitterLogo size={28} />
          </a>
        </li>
        <li className="list-item-inline">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/madhu-raghani-28541a132/"
            rel="noreferrer"
          >
            <RxLinkedinLogo size={28} />
          </a>
        </li>
      </ul>
      <span>© No Copyright, Feel free to replicate.</span>
    </footer>
  );
}

export default Footer;
