export const isScrollbarVisible = (element: HTMLElement) =>  element.scrollHeight > element.clientHeight

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  if (firstName && lastName) {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0)}`;
  }
  return name.charAt(0).toUpperCase();
};
