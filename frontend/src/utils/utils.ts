export default class Utils {
  static secondsToDurationStr (secs: number): string {
    if (secs) {
      const mins = (secs / 60).toFixed(0).toString().padStart(2, "0")
      const restSecs = (secs % 60).toFixed(0).toString().padStart(2, "0")
      return mins + ":" + restSecs
    } else {
      return "??:??"
    }
  }
}
