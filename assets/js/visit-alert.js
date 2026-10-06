/* Sends a push notification and an email (through ntfy.sh) when someone opens the site.
   Subscribe to the topic below in the ntfy app or at https://ntfy.sh/<topic> to receive it.
   The topic name is the only "password", so keep it private. */

(function () {
    const NTFY_TOPIC = "resume-visit-9a91d631484a380279";
    const ALERT_EMAIL = "deep7197@gmail.com"; // ntfy also forwards each alert to this address
    const QUIET_MINUTES = 30; // one alert per browser per 30 minutes, not one per page

    const host = location.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host === "") return;

    // Visit any page with ?owner=1 once to stop alerts for your own browser, ?owner=0 to turn them back on
    try {
        const flag = new URLSearchParams(location.search).get("owner");
        if (flag === "1") localStorage.setItem("msr-owner", "1");
        if (flag === "0") localStorage.removeItem("msr-owner");
        if (localStorage.getItem("msr-owner") === "1") return;

        const last = Number(localStorage.getItem("msr-last-alert") || 0);
        if (Date.now() - last < QUIET_MINUTES * 60 * 1000) return;
        localStorage.setItem("msr-last-alert", String(Date.now()));
    } catch (e) {
        // Storage is blocked: still send, the alert is just not rate limited
    }

    const device = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop";
    const lines = [
        "Page: " + location.pathname,
        "From: " + (document.referrer || "direct visit"),
        "Device: " + device,
        "Language: " + navigator.language,
        "Time zone: " + (Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown")
    ];

    const params = new URLSearchParams({ title: "Someone is viewing your resume", tags: "eyes", email: ALERT_EMAIL });
    fetch("https://ntfy.sh/" + NTFY_TOPIC + "?" + params, {
        method: "POST",
        body: lines.join("\n"),
        mode: "no-cors",
        keepalive: true
    }).catch(function () { /* an alert failing must never affect the page */ });
})();
