import styles from "./Page.module.scss";
import {ReactNode, useRef} from "react";
import {CurrentPageContextProvider} from "./CurrentPageContext/Contexts";
import classNames from "classnames";
import {SwiperClass} from "swiper/react";

type Props<TContextData> = {
    isActive: boolean;
    pageName?: string;
    className?: string;
    children?: ReactNode;
    onActiveUpdate?: (active: boolean) => void;
    backgroundControl?: BackgroundControl;
    isAlwaysVisible?: boolean;
    swiper?: SwiperClass | null;
} & TContextData;

export type BackgroundControl = {
    setOpacity: (opacity: number) => void;
    setClassName: (classNames: classNames.ArgumentArray) => void;
};

export default function Page<TContextData>({
                                               isActive,
                                               pageName,
                                               className,
                                               children,
                                               backgroundControl,
                                               isAlwaysVisible,
                                               swiper,
                                               ...contextData
                                           }: Props<TContextData>) {
    const ref = useRef(null);

    return (
        <CurrentPageContextProvider
            isActive={isActive}
            backgroundControl={backgroundControl}
            swiper={swiper || undefined}
            setCurrentCardActive
            contextName={pageName}
            {...contextData}
        >
            <div
                ref={ref}
                className={classNames(className, styles.page, {
                    [styles.inactive]: !isActive && !isAlwaysVisible,
                })}
            >
                {children}
            </div>
        </CurrentPageContextProvider>
    );
}
