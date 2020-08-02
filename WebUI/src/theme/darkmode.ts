// Based on system preference and user settings
// Use to initially check and enable darkmode

export function prefersDarkmode() {
  const setting = localStorage.getItem("darkmode");
  if (setting !== null) {
    return setting === "true";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Changes based on existence of .dark on <body>
// Use to check if darkmode is wanted by the user (toggleable)
export function wantsDarkmode() {
  const currentSetting = localStorage.getItem("darkmode");
  return currentSetting
    ? currentSetting
    : document.body.classList.contains("dark");
}

export function setDarkmode(darkmode: boolean) {
  document.body.classList.toggle("dark", darkmode);
  localStorage.setItem("darkmode", String(darkmode));
}
