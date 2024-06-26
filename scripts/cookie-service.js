export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
  const nameEQ = `${name}=`;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(nameEQ))
      ?.split("=")[1] || null
  );
}

export function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}
