// Base Theme class using OOP principles
export abstract class BaseTheme {
  protected _mode: "light" | "dark" = "light"
  protected _observers: Array<(theme: string) => void> = []

  abstract getColors(): Record<string, string>
  abstract getBreakpoints(): Record<string, string>

  get mode(): string {
    return this._mode
  }

  // Observer pattern for theme changes
  subscribe(callback: (theme: string) => void): void {
    this._observers.push(callback)
  }

  unsubscribe(callback: (theme: string) => void): void {
    this._observers = this._observers.filter((obs) => obs !== callback)
  }

  protected notify(): void {
    this._observers.forEach((callback) => callback(this._mode))
  }

  abstract toggle(): void
  abstract setMode(mode: "light" | "dark"): void
}

// Light Theme implementation
export class LightTheme extends BaseTheme {
  constructor() {
    super()
    this._mode = "light"
  }

  getColors(): Record<string, string> {
    return {
      background: "#ffffff",
      foreground: "#0f172a",
      primary: "#808034",
      secondary: "#dbd4ff",
      accent: "#ffffe3",
      muted: "#f1f5f9",
      border: "#e2e8f0",
      card: "#ffffff",
      destructive: "#ef4444",
    }
  }

  getBreakpoints(): Record<string, string> {
    return {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    }
  }

  toggle(): void {
    // Will be handled by ThemeManager
  }

  setMode(mode: "light" | "dark"): void {
    this._mode = mode
    this.notify()
  }
}

// Dark Theme implementation
export class DarkTheme extends BaseTheme {
  constructor() {
    super()
    this._mode = "dark"
  }

  getColors(): Record<string, string> {
    return {
      background: "#0f172a",
      foreground: "#f8fafc",
      primary: "#9ca3af",
      secondary: "#374151",
      accent: "#1f2937",
      muted: "#374151",
      border: "#374151",
      card: "#1e293b",
      destructive: "#dc2626",
    }
  }

  getBreakpoints(): Record<string, string> {
    return {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    }
  }

  toggle(): void {
    // Will be handled by ThemeManager
  }

  setMode(mode: "light" | "dark"): void {
    this._mode = mode
    this.notify()
  }
}

// Singleton Theme Manager
export class ThemeManager {
  private static instance: ThemeManager
  private lightTheme: LightTheme
  private darkTheme: DarkTheme
  private currentTheme: BaseTheme

  private constructor() {
    this.lightTheme = new LightTheme()
    this.darkTheme = new DarkTheme()
    this.currentTheme = this.lightTheme
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager()
    }
    return ThemeManager.instance
  }

  getCurrentTheme(): BaseTheme {
    return this.currentTheme
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme.mode === "light" ? this.darkTheme : this.lightTheme
    this.applyTheme()
  }

  setTheme(mode: "light" | "dark"): void {
    this.currentTheme = mode === "light" ? this.lightTheme : this.darkTheme
    this.applyTheme()
  }

  private applyTheme(): void {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", this.currentTheme.mode === "dark")
      localStorage.setItem("theme", this.currentTheme.mode)
    }
  }

  initializeTheme(): void {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark"
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light")
      this.setTheme(initialTheme)
    }
  }
}
