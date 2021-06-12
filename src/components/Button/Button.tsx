import classnames from "classnames";
import React, { ReactChild } from "react";
import { Link } from "react-router-dom";
import { Box, Icon, InlineIcon, Text } from "..";
import styles from "./Button.module.css";
import colorStyles from "../Colors.module.css";
import { iconColors } from "../types";
import { backgroundColors } from "../types";
import { textColors } from "../types";

type ButtonKind = "default" | "secondary" | "ghost" | "danger" | "disabled";
type IconColors = typeof iconColors[number];
type TextColors = typeof textColors[number];
type BackgroundColors = typeof backgroundColors[number];
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Button = (props: {
  children?: ReactChild;
  text?: string;
  kind?: ButtonKind;
  iconPosition?: "left" | "right";
  iconName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  noDecoration?: boolean;
  lhref?: string; // local href (cannot use outside URL)
  wid?: "100";
  as?: "div";
  textAlign?: "left";
}) => {
  var renderingElement;
  var renderingElementChildren;
  var renderingText;

  const kind = props.kind || "default";

  const BUTTON_BG_COLOR: { [key in ButtonKind]: BackgroundColors } = {
    default: "primary",
    secondary: "white",
    ghost: "transparent",
    danger: "white",
    disabled: "gray20",
  };

  const BUTTON_ICON_COLOR: { [key in ButtonKind]: IconColors } = {
    default: "white",
    secondary: "primary",
    ghost: "primary",
    danger: "danger",
    disabled: "gray50",
  };

  const TEXT_COLOR_KIND: { [key in ButtonKind]: TextColors } = {
    default: "white",
    secondary: "gray100",
    ghost: "primary",
    danger: "gray100",
    disabled: "gray50",
  };

  const bgColor = (function () {
    return "bg" + capitalizeFirstLetter(BUTTON_BG_COLOR[kind]);
  })();

  const iconColor = (function () {
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
    cs = classnames(
      styles["button-nodecoration"],
      props.textAlign && styles["textAlign" + props.textAlign],
      props.wid && styles["wid" + props.wid]
    );
  } else {
    cs = classnames(
      styles.button,
      styles["button-nodecoration"],
      styles[kind],
      colorStyles[bgColor],
      props.wid && styles["wid" + props.wid]
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

  const wrapperCs = classnames(styles.wrapper);

  const renderAs = () => {
    if (props.as) return props.as;
    if (props.lhref) return "div";
    return "button";
  };

  const renderingButton = React.createElement(
    renderAs(),
    {
      className: cs,
      onClick: props.onClick,
      onFocus: props.onFocus,
    },
    renderingElementChildren
  );

  renderingElement = <div className={wrapperCs}>{renderingButton}</div>;

  if (props.lhref) {
    // Wrapping link outside
    return <Link to={props.lhref}>{renderingButton}</Link>;
  } else return renderingButton;
};
