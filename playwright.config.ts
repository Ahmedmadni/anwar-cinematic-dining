import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:8080",
    trace: "off",
  },
  projects: [
    { name: "iphone-se",  use: { ...devices["iPhone SE"] } },
    { name: "iphone-12",  use: { ...devices["iPhone 12"] } },
    { name: "pixel-7",    use: { ...devices["Pixel 7"] } },
    { name: "galaxy-s9",  use: { viewport: { width: 360, height: 740 }, userAgent: devices["Galaxy S9+"].userAgent } },
  ],
});