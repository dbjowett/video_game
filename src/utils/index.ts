export const isScrollbarVisible = (element: HTMLElement) =>
  element.scrollHeight > element.clientHeight;

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  if (firstName && lastName) {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0)}`;
  }
  return name.charAt(0).toUpperCase();
};

// Pass functiont to debounced and a wait time
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
