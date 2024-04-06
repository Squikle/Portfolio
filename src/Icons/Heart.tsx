import classNames from "classnames";
import heartSvg from "../../public/heart4.svg";

export default function Heart({ className }: { className: string }) {
  return (
    <div className={classNames(className)}>
      <img alt="heart" src={heartSvg} />
    </div>
  );
}
