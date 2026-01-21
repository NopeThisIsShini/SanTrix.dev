import { ThemeProvider } from "@/components/theme-provider"
import { SanTrixDemo } from "@/components/santrix-demo"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SanTrixDemo />
    </ThemeProvider>
  )
}

export default App