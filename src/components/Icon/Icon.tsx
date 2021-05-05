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
  return (
    <div className={props.iconBackground ? styles["icon-w-bg"] : styles.icon}>
      <IconComp {...passingProps} />
    </div>
  );
};
