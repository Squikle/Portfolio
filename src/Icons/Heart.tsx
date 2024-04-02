import classNames from "classnames";

export default function Heart({ className }: { className: string }) {
  return (
    <div className={classNames(className)}>
      <img alt="heart" src="/public/heart1.svg" />
    </div>
  );
}
