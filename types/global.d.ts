export {};

declare global {
  interface Window {
    gtag: (
      command: "config" | "set" | "js" | "event",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
