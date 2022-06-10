export function handleRTCtime(rtc : string) : string {
    let p1 = rtc.indexOf('T'), p2 = rtc.indexOf('.');
    let date : string = rtc.substring(0, p1);
    let time : string = rtc.substring(p1 + 1, p2);
    return date + " " + time;
}