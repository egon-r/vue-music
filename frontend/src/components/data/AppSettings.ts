export enum Themes {
  DARK,
  LIGHT
}

export type AppSettingsType = {
  theme: Themes,
  primaryHue: number,
  secondaryHue: number,
  backendHostPort: string,
  backendHttpBase: () => string,
  backendWsBase: () => string
}

export const AppSettings: AppSettingsType = {
  theme: GetPreferredTheme(),
  primaryHue: 120,
  secondaryHue: 240,
  backendHostPort: "localhost:3000",
  backendHttpBase: function () {
    return "http://" + this.backendHostPort
  },
  backendWsBase: function () {
    return "ws://" + this.backendHostPort
  }
}

export function LoadAppSettings () {
  const settingsJson = localStorage.getItem("app_settings")
  if (settingsJson !== null) {
    Object.assign(AppSettings, JSON.parse(settingsJson))
  }
}

export function SaveAppSettings () {
  localStorage.setItem("app_settings", JSON.stringify(AppSettings))
}

export function ApplyTheme () {
  if (AppSettings.theme === Themes.DARK) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
  document.documentElement.style.setProperty(
    "--primary-hue",
    AppSettings.primaryHue.toString()
  )
  document.documentElement.style.setProperty(
    "--secondary-hue",
    AppSettings.secondaryHue.toString()
  )
}

function GetPreferredTheme (): Themes {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return Themes.DARK
  }
  return Themes.LIGHT
}
