import {useCallback, useEffect} from "react";
import config from "../configs/global.config.json";

export type Analytics = {
    pushEvent: (category: string, action: string, name: string) => void;
    setDocumentTitle: (title: string) => void;
};

export const EventCategories = {
    button: "button",
};

export const EventActions = {
    click: "click",
    startHold: "startHold",
};

let scriptSet = false;

export default function useAnalyticsInit(): Analytics {
    useEffect(() => {
        if (import.meta.env.DEV) return;

        let _paq = (window._paq = window._paq || []);

        _paq.push(["trackPageView"]);
        (async () => {
            if (scriptSet) return;

            const u = config.analytics.url;
            _paq.push(["setTrackerUrl", u + "matomo.php"]);
            _paq.push(["setSiteId", "1"]);
            _paq.push(["requireCookieConsent"]);
            _paq.push(["enableHeartBeatTimer"]);
            _paq.push(["enableLinkTracking"]);
            const d = document,
                g = d.createElement("script"),
                s = d.getElementsByTagName("script")[0];
            g.async = true;
            g.src = u + "matomo.js";
            s.parentNode!.insertBefore(g, s);
            scriptSet = true;
        })();
    }, []);

    const pushEvent = useCallback(
        (category: string, action: string, name: string) => {
            window._paq?.push(["trackEvent", category, action, name]);
        },
        [],
    );

    const setDocumentTitle = useCallback((title: string) => {
        window._paq?.push(["setDocumentTitle", title]);
        window._paq?.push(["trackPageView"]);
    }, []);

    return {
        pushEvent,
        setDocumentTitle,
    };
}
