export function seconds_to_duration_str(secs) {
  if (secs) {
    let mins = (secs / 60).toFixed(0).toString().padStart(2, "0");
    let restSecs = (secs % 60).toFixed(0).toString().padStart(2, "0");
    return mins + ":" + restSecs;
  } else {
    return "??:??";
  }
}
