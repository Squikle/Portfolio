import {useCallback, useRef, useState} from "react";

export default function useLongPress(
    onLongPress: (event: TouchEvent | MouseEvent) => void,
    onClick?: (event: TouchEvent | MouseEvent) => void,
    {delay = 300} = {},
) {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();

    const start = useCallback(
        (event: TouchEvent | MouseEvent) => {
            if (timeout.current) return;

            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay],
    );

    const clear = useCallback(
        (event: TouchEvent | MouseEvent, shouldTriggerClick = true) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
                timeout.current = undefined;
            }
            shouldTriggerClick && !longPressTriggered && onClick && onClick(event);
            setLongPressTriggered(false);
        },
        [onClick, longPressTriggered],
    );

    return {
        onMouseDown: (e: TouchEvent | MouseEvent) => start(e),
        onTouchStart: (e: TouchEvent | MouseEvent) => start(e),
        onMouseUp: (e: TouchEvent | MouseEvent) => clear(e),
        onMouseLeave: (e: TouchEvent | MouseEvent) => clear(e, false),
        onTouchEnd: (e: TouchEvent | MouseEvent) => clear(e),
    };
}
