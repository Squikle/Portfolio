import { useCurrentSectionContext } from "../Page/CurrentPageContext/useContexts";
import classNames from "classnames";
import styles from "./InfoCard.module.css";
import React from "react";

type Props = { propsStyles?: React.CSSProperties };

export default function InfoCard({ propsStyles }: Props) {
  const isActive = useCurrentSectionContext().isActive;

  return (
    <div
      className={classNames(styles.card, {
        [styles.active]: isActive,
      })}
      style={propsStyles}
    >
      <h1>Michael Dovhalov</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut assumenda
        perferendis laudantium numquam architecto, iusto, porro debitis facilis
        magnam minima in optio officiis placeat eum consequuntur possimus
        nostrum repellat dolorem molestiae illo! Vitae, consectetur voluptas
        doloribus optio repellendus facere, tenetur delectus autem illo deserunt
        distinctio provident atque veritatis et! Unde?
      </p>
    </div>
  );
}
