export default function useOverScroll(
  element: HTMLElement,
  onSwipe: (overScrollPercent: number) => void,
) {
  const scrollTop = element.scrollTop;
  const scrollHeight = element.scrollHeight;
  const clientHeight = element.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    const scrolledPastEnd =
      ((scrollTop + clientHeight - scrollHeight) / scrollHeight) * 100;
    if (onSwipe) onSwipe(scrolledPastEnd);
  }

  if (scrollTop < 0) {
    const scrolledPastTop = (scrollTop / scrollHeight) * 100;
    if (onSwipe) onSwipe(scrolledPastTop);
  }
}
