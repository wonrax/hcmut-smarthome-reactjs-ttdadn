import classnames from "classnames";
import React, { ReactChild } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export const Button = (props: {
  children: ReactChild;
  kind?: "default" | "secondary";
  as?: "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  noDecoration?: boolean;
  lhref?: string; // local href (cannot use outside URL)
}) => {
  var renderingElement;
  if (props.noDecoration) {
    renderingElement = (
      <button className={styles["button-nodecoration"]} onClick={props.onClick}>
        {props.children}
      </button>
    );
  } else {
    const cs = classnames(
      styles.button,
      styles["button-nodecoration"],
      props.kind ? styles[props.kind] : styles["default"]
    );
    renderingElement = (
      <button onClick={props.onClick} className={cs}>
        {props.children}
      </button>
    );
  }

  if (props.lhref) {
    return <Link to={props.lhref}>{renderingElement}</Link>;
  } else return renderingElement;
};
