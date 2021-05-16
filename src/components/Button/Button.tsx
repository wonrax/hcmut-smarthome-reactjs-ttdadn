import classnames from "classnames";
import React, { ReactChild } from "react";
import { Link } from "react-router-dom";
import { Box, Icon, InlineIcon, Text } from "..";
import styles from "./Button.module.css";
import colorStyles from "../Colors.module.css";

export const Button = (props: {
  children?: ReactChild;
  text?: string;
  kind?: "default" | "secondary" | "ghost";
  bgColor?: string;
  iconPosition?: "left" | "right";
  iconName?: string;
  as?: "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  noDecoration?: boolean;
  lhref?: string; // local href (cannot use outside URL)
}) => {
  var renderingElement;
  var renderingElementChildren;
  var renderingText;

  // Processing text if being passed
  if (props.text) {
    if (props.children)
      throw "Either Button.props.text or Button.props.children can be specified at once.";
    const textColor = (function () {
      const textColorKind = {
        default: "white",
        secondary: "gray100",
        ghost: "primary",
      };
      if (props.kind) return textColorKind[props.kind];
      return textColorKind["default"];
    })();
    renderingText = (
      <Text kind="normal" color={textColor}>
        {props.text}
      </Text>
    );
  } else if (!props.children) {
    throw "Neither Button.props.text nor Button.props.children was specified.";
  }

  const bgColor = (function () {
    if (props.bgColor) return props.bgColor;
    const bgColorKind = {
      default: "bgPrimary",
      secondary: "bgWhite",
      ghost: "bgTransparent",
    };
    if (props.kind) return bgColorKind[props.kind];
    return "bgPrimary"; //default
  })();
  var cs;
  // No decoration,
  if (props.noDecoration) {
    cs = styles["button-nodecoration"];
  } else {
    cs = classnames(
      styles.button,
      styles["button-nodecoration"],
      props.kind ? styles[props.kind] : styles["default"],
      colorStyles[bgColor]
    );
  }

  const renderingElementMainChild = props.text ? renderingText : props.children;

  if (props.iconPosition) {
    if (!props.iconName) throw "No Button.props.iconName was specified.";
    if (props.kind === "ghost") throw 'Button type "ghost" doesn\'t use icon';

    const iconColor =
      props.kind && props.kind !== "default" ? "primary" : "white" || "white";
    const iconElement = <Icon icon={props.iconName} color={iconColor} />;
    var leftElement;
    var rightElement;
    if (props.iconPosition === "left") {
      leftElement = <Box margins="mr8">{iconElement}</Box>;
      rightElement = renderingElementMainChild;
    } else {
      rightElement = <Box margins="ml8">{iconElement}</Box>;
      leftElement = renderingElementMainChild;
    }

    if (leftElement && rightElement)
      renderingElementChildren = (
        <InlineIcon>
          {leftElement}
          {rightElement}
        </InlineIcon>
      );
  } else {
    renderingElementChildren = renderingElementMainChild;
  }
  renderingElement = (
    <button className={cs} onClick={props.onClick}>
      {renderingElementChildren}
    </button>
  );

  if (props.lhref) {
    // Wrapping link outside
    return <Link to={props.lhref}>{renderingElement}</Link>;
  } else return renderingElement;
};
