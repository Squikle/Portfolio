import {CSSProperties} from "react";

export default function getCssDimensions(
    thickness: number,
    lenght: number,
    isVertical: boolean,
): CSSProperties {
    return isVertical
        ? {
            width: lenght + "em",
            height: thickness + "em",
        }
        : {
            width: thickness + "em",
            height: lenght + "em",
        };
}
