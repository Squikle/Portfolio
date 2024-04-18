type DebouncingFunc = (...args: any[]) => void;

export function debounceAndExecute(func: DebouncingFunc, delay: number) {
    let timeoutId: NodeJS.Timeout;

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function (this: any) {
            func.apply(this, args);
        }, delay);
    };
}

export function executeAndDebounce(func: DebouncingFunc, delay: number) {
    let timeoutId: NodeJS.Timeout;
    let throttled = false;

    return function (this: any, ...args: any[]) {
        const execute = () => {
            if (!throttled) {
                throttled = true;
                func.apply(this, args);
            }
        };

        const unblock = () => {
            throttled = false;
        };

        execute();
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(unblock, delay);
    };
}
