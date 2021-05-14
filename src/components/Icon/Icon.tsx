import classnames from "classnames";
import { Icons } from "../icons";
import styles from "./Icon.module.css";

export const Icon = (props: {
  icon: string;
  iconBackground?: boolean;
  size?: number;
}) => {
  const IconComp: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  > = Icons[props.icon];
  const passingProps = props.size && { width: props.size, height: props.size };
  const cs = classnames(
    props.iconBackground && styles["icon-w-bg"],
    styles.icon
  );
  return (
    <div className={cs}>
      <IconComp {...passingProps} />
    </div>
  );
};
