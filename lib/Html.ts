export function getElementHeight(element: HTMLElement): number {
  if (!element) {
    return 0
  }
  const style = getComputedStyle(element)
  const padding = Number.parseFloat(style.paddingBottom) + Number.parseFloat(style.paddingTop)
  const margin = Number.parseFloat(style.marginBottom) + Number.parseFloat(style.marginTop)
  return element.clientHeight + padding + margin
}