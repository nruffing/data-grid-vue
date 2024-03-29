export function getElementHeight(element: HTMLElement): number {
  if (!element) {
    return 0
  }
  const style = getComputedStyle(element)
  const padding = Number.parseFloat(style.paddingBottom) + Number.parseFloat(style.paddingTop)
  const margin = Number.parseFloat(style.marginBottom) + Number.parseFloat(style.marginTop)
  return element.clientHeight + padding + margin
}

export function getElementWidth(element: HTMLElement): number {
  if (!element) {
    return 0
  }
  const style = getComputedStyle(element)
  const padding = Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight)
  const margin = Number.parseFloat(style.marginLeft) + Number.parseFloat(style.marginRight)
  return element.clientWidth + padding + margin
}

export function isPxSize(width?: string): boolean {
  return /^\d+px$/.test(width?.trim() ?? '')
}

export function isPercentageSize(width?: string): boolean {
  return /^\d+%$/.test(width?.trim() ?? '')
}

export function asPxSize(value: number): string {
  return `${value.toFixed(3)}px`
}
