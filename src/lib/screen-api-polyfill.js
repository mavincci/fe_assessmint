/**
 * Screen API Polyfill
 *
 * This polyfill provides a fallback implementation for the Screen API
 * which may not be available in all browsers. It uses the Fullscreen API
 * as a fallback mechanism.
 */

// Only add the polyfill if the Screen API is not available
if (!window.getScreens) {
  // Create a mock Screen object
  class MockScreen {
    constructor() {
      this.isPrimary = true
      this.isExtended = false
      this.width = window.screen.width
      this.height = window.screen.height
      this.availWidth = window.screen.availWidth
      this.availHeight = window.screen.availHeight
    }

    async requestFullscreen(options) {
      const element = options?.source || document.documentElement

      if (element.requestFullscreen) {
        return element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        return element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        return element.msRequestFullscreen()
      }

      throw new Error("Fullscreen API not supported")
    }
  }

  // Add the getScreens method to the window object
  window.getScreens = async () => [new MockScreen()]

  // Add exitPresentationMode to document if it doesn't exist
  if (!document.exitPresentationMode) {
    document.exitPresentationMode = () => {
      if (document.exitFullscreen) {
        return document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        return document.msExitFullscreen()
      }

      throw new Error("Fullscreen API not supported")
    }
  }

  // Add presentationMode property to document if it doesn't exist
  if (!Object.getOwnPropertyDescriptor(document, "presentationMode")) {
    Object.defineProperty(document, "presentationMode", {
      get: () =>
        document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement
          ? "fullscreen"
          : "inline",
    })
  }
}
