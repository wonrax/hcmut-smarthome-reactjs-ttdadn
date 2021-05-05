import { Icons } from "../icons";
import styles from "./Icon.module.css";

export const Icon = (props: { icon: string; iconBackground?: boolean }) => {
  const IconComp: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  > = Icons[props.icon];
  return (
    <div className={props.iconBackground ? styles["icon-w-bg"] : styles.icon}>
      <IconComp />
    </div>
  );
};
