// Responsive breakpoint manager using OOP
export class ResponsiveManager {
  private static instance: ResponsiveManager
  private breakpoints: Record<string, number>
  private currentBreakpoint = "sm"
  private listeners: Array<(breakpoint: string) => void> = []

  private constructor() {
    this.breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    }

    if (typeof window !== "undefined") {
      this.updateBreakpoint()
      window.addEventListener("resize", this.handleResize.bind(this))
    }
  }

  static getInstance(): ResponsiveManager {
    if (!ResponsiveManager.instance) {
      ResponsiveManager.instance = new ResponsiveManager()
    }
    return ResponsiveManager.instance
  }

  private handleResize(): void {
    this.updateBreakpoint()
  }

  private updateBreakpoint(): void {
    const width = window.innerWidth
    let newBreakpoint = "sm"

    for (const [breakpoint, minWidth] of Object.entries(this.breakpoints)) {
      if (width >= minWidth) {
        newBreakpoint = breakpoint
      }
    }

    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint
      this.notifyListeners()
    }
  }

  getCurrentBreakpoint(): string {
    return this.currentBreakpoint
  }

  isBreakpoint(breakpoint: string): boolean {
    return this.currentBreakpoint === breakpoint
  }

  isBreakpointUp(breakpoint: string): boolean {
    const currentIndex = Object.keys(this.breakpoints).indexOf(this.currentBreakpoint)
    const targetIndex = Object.keys(this.breakpoints).indexOf(breakpoint)
    return currentIndex >= targetIndex
  }

  subscribe(callback: (breakpoint: string) => void): void {
    this.listeners.push(callback)
  }

  unsubscribe(callback: (breakpoint: string) => void): void {
    this.listeners = this.listeners.filter((listener) => listener !== callback)
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.currentBreakpoint))
  }

  getBreakpointClasses(config: Record<string, string>): string {
    const classes: string[] = []

    Object.entries(config).forEach(([breakpoint, className]) => {
      if (breakpoint === "default") {
        classes.push(className)
      } else {
        classes.push(`${breakpoint}:${className}`)
      }
    })

    return classes.join(" ")
  }
}
