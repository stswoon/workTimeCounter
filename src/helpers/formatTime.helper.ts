export const formatTime = (time: number): string => {
    let t = Math.abs(time);
    const d = Math.floor(t / (8 * 60));
    t = t - d * 8 * 60;
    const h = Math.floor(t / 60);
    t = t - h * 60;
    const m = t;

    let result = "";

    if (time === 0) {
        result += "";
    } else if (time > 0) {
        result += "+ ";
    } else {
        result += "- ";
    }

    if (d > 0) {
        result += d + "d ";
    }
    if (h > 0) {
        result += h + "h ";
    }
    if (m > 0) {
        result += m + "m";
    }
    if (d === 0 && h === 0 && m === 0) {
        result = "0m"
    }

    return result;
}