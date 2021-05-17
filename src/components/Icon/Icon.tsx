import classnames from "classnames";
import { Icons } from "../icons";
import styles from "./Icon.module.css";
import colorStyles from "../Colors.module.css";
import { iconColors } from "../types";

type IconColors = typeof iconColors[number];

export const Icon = (props: {
  icon: string;
  iconBackground?: boolean;
  size?: number;
  color?: IconColors;
}) => {
  const IconComp: React.FunctionComponent<React.SVGProps<SVGSVGElement>> =
    Icons[props.icon];
  const passingProps = props.size && { width: props.size, height: props.size };
  const cs = classnames(
    props.iconBackground && styles["icon-w-bg"],
    styles.icon,
    props.color && colorStyles["icon-" + props.color]
  );
  return (
    <div className={cs}>
      <IconComp {...passingProps} />
    </div>
  );
};
