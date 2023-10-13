import React from "react";

import GithubSVG from "../images/github.svg";
import ShareSVG from "../images/share.svg";

import combineClassnames from "../utilities/combineClassnames";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Footer({ className, style }: Props) {
  return (
    <div
      id="app-footer"
      style={style}
      className={combineClassnames(
        "aself-start fontsize-2 flex-row-center",
        className,
      )}
    >
      <FooterLink href="https://elementten.com">
        <div className="adjacent-mar-l-2">About me</div>
        <img
          src={ShareSVG}
          className="adjacent-mar-l-2"
          style={{ width: 16, height: 16, fill: "#696969" }}
        />
      </FooterLink>

      <FooterLink href="https://github.com/aahvocado/KoL-Mafioso/">
        <div className="adjacent-mar-l-2">Source</div>
        <img
          src={GithubSVG}
          className="adjacent-mar-l-2"
          style={{ width: 16, height: 16, fill: "#696969" }}
        />
      </FooterLink>

      <FooterLink href="https://github.com/aahvocado/KoL-Mafioso/issues">
        <div className="adjacent-mar-l-2">Support</div>
      </FooterLink>

      <div className="color-grayest hover:color-grayer pad-2 flex-row-center adjacent-mar-l-5">
        {`v${import.meta.env.MAFIOSO_VERSION || "?"}`}
      </div>
    </div>
  );
}

type FooterLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function FooterLink(props: FooterLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="color-grayest hover:color-grayer pad-2 flex-row-center adjacent-mar-l-5"
    ></a>
  );
}
