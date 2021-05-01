import { Icons } from "../icons";
import styles from "./Icon.module.css";

export const Icon = (props: { icon: string }) => {
  const IconComp: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  > = Icons[props.icon];
  return (
    <div className={styles.icon}>
      <IconComp />
    </div>
  );
};
