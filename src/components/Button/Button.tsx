import classnames from "classnames";
import React, { ReactChild } from "react";
import { Link } from "react-router-dom";
import { Box, Icon, InlineIcon, Text } from "..";
import styles from "./Button.module.css";
import colorStyles from "../Colors.module.css";
import { iconColors } from "../types";
import { backgroundColors } from "../types";

type ButtonKind = "default" | "secondary" | "ghost";
type IconColors = typeof iconColors[number];
type BackgroundColors = typeof backgroundColors[number];
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Button = (props: {
  children?: ReactChild;
  text?: string;
  kind?: ButtonKind;
  bgColor?: BackgroundColors;
  iconColor?: IconColors;
  iconPosition?: "left" | "right";
  iconName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  noDecoration?: boolean;
  lhref?: string; // local href (cannot use outside URL)
}) => {
  var renderingElement;
  var renderingElementChildren;
  var renderingText;

  const kind = props.kind || "default";

  const BUTTON_BG_COLOR: { [key in ButtonKind]: BackgroundColors } = {
    default: "primary",
    secondary: "white",
    ghost: "transparent",
  };

  const BUTTON_ICON_COLOR: { [key in ButtonKind]: IconColors } = {
    default: "white",
    secondary: "primary",
    ghost: "primary",
  };

  const TEXT_COLOR_KIND = {
    default: "white",
    secondary: "gray100",
    ghost: "primary",
  };

  const bgColor = (function () {
    if (props.bgColor) return "bg" + capitalizeFirstLetter(props.bgColor);
    return "bg" + capitalizeFirstLetter(BUTTON_BG_COLOR[kind]);
  })();

  const iconColor = (function () {
    if (props.iconColor) return props.iconColor;
    return BUTTON_ICON_COLOR[kind];
  })() as IconColors;

  // Processing text if being passed
  if (props.text) {
    if (props.children)
      throw new Error(
        "Either Button.props.text or Button.props.children can be specified at once."
      );
    const textColor = TEXT_COLOR_KIND[kind];
    renderingText = (
      <Text kind="normal" color={textColor}>
        {props.text}
      </Text>
    );
  } else if (!props.children) {
    throw new Error(
      "Neither Button.props.text nor Button.props.children was specified."
    );
  }

  const renderingElementMainChild = props.text ? renderingText : props.children;

  var cs;
  if (props.noDecoration) {
    cs = styles["button-nodecoration"];
  } else {
    cs = classnames(
      styles.button,
      styles["button-nodecoration"],
      styles[kind],
      colorStyles[bgColor]
    );
  }

  if (props.iconPosition) {
    if (!props.iconName)
      throw new Error("No Button.props.iconName was specified.");
    if (kind === "ghost")
      throw new Error('Button type "ghost" doesn\'t use icon');

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
    <div className={styles.wrapper}>
      <button className={cs} onClick={props.onClick}>
        {renderingElementChildren}
      </button>
    </div>
  );

  if (props.lhref) {
    // Wrapping link outside
    return <Link to={props.lhref}>{renderingElement}</Link>;
  } else return renderingElement;
};
