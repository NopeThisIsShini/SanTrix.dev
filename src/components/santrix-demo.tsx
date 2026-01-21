import { useEffect, useRef, useState, useMemo } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { 
  Sparkles, 
  Zap, 
  Monitor, 
  Tablet, 
  Smartphone,
  ExternalLink,
  Code2,
  Layout,
  Globe,
  Github
} from "lucide-react"

type ViewMode = "desktop" | "tablet" | "mobile"

export function SanTrixDemo() {
  const { theme } = useTheme()
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const [isEditorLoaded, setIsEditorLoaded] = useState(false)
  const [activePlugin, setActivePlugin] = useState("full")
  const [viewMode, setViewMode] = useState<ViewMode>("desktop")

  const pluginConfigs = useMemo(() => ({
    minimal: {
      plugins: "",
      toolbar: "undo redo | bold italic"
    },
    standard: {
      plugins: "lists link image",
      toolbar: "undo redo | bold italic underline | bullist numlist | link image"
    },
    full: {
      plugins: "lists link image table code codesample emoticons fullscreen preview searchreplace wordcount",
      toolbar: "undo redo | blocks | bold italic underline strikethrough | bullist numlist | link image table | code codesample emoticons | fullscreen preview | searchreplace"
    }
  }), [])

  useEffect(() => {
    // Load SanTrix script
    const existingScript = document.querySelector('script[src*="santrix"]')
    if (!existingScript) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/santrix/santrix.min.js"
      script.async = true
      script.onload = () => {
        initEditor()
      }
      document.head.appendChild(script)
    } else {
      initEditor()
    }

    return () => {
      if ((window as any).santrix) {
        try {
          (window as any).santrix.remove("#santrix-editor")
        } catch (e) {
          // ignore
        }
      }
    }
  }, [])

  useEffect(() => {
    const currentTheme = theme === "system" 
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme

    if ((window as any).santrix) {
      try {
        (window as any).santrix.remove("#santrix-editor")
      } catch (e) {
        // ignore
      }
      const timer = setTimeout(() => initEditor(currentTheme), 50)
      return () => clearTimeout(timer)
    }
  }, [activePlugin, theme])

  const initEditor = (currentTheme: string = "dark") => {
    if ((window as any).santrix && editorContainerRef.current) {
      const config = pluginConfigs[activePlugin as keyof typeof pluginConfigs]
      const isDark = currentTheme === "dark"
      
      ;(window as any).santrix.init({
        selector: "#santrix-editor",
        height: 500,
        plugins: config.plugins,
        toolbar: config.toolbar,
        skin: isDark ? "oxide-dark" : "oxide",
        content_css: isDark ? "dark" : "default",
        promotion: false,
        branding: false,
        menubar: true,
        statusbar: true,
        resize: true,
        setup: (editor: any) => {
          editor.on("init", () => {
            setIsEditorLoaded(true)
          })
        }
      })
    }
  }

  const getViewModeWidth = () => {
    switch (viewMode) {
      case "tablet": return "768px"
      case "mobile": return "375px"
      default: return "100%"
    }
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary/20 transition-colors duration-500">
      {/* Professional Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-linear-to-b from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">SanTrix</span>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/NopeThisIsShini/SanTrix" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </a>
            <div className="w-px h-6 bg-border mx-2"></div>
            <ModeToggle />
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Simple & Clean Hero */}
        <section className="pt-24 pb-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold mb-8">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>THE NEXT GENERATION EDITOR</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Writing perfected <br />
              <span className="text-muted-foreground/60">for the modern web.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              A professional rich text editor that combines power with simplicity. 
              Built for performance, reliability, and beautiful user experiences.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button 
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                size="lg" 
                className="h-12 px-8 rounded-full text-base font-medium"
              >
                Experience SanTrix
              </Button>
              <a href="https://www.npmjs.com/package/santrix" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-base font-medium">
                  Documentation
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Feature Highlights - Clean Grid */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: Layout, title: "Modern UI", desc: "Designed for today's apps" },
              { icon: Code2, title: "Extensible", desc: "Powerful plugin ecosystem" },
              { icon: Globe, title: "Universal", desc: "Works everywhere you do" },
              { icon: Sparkles, title: "Refined", desc: "Polished to perfection" }
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-colors shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Demo Section - The Focus */}
        <section id="demo" className="py-24 px-6 bg-muted/30 border-y border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10">
              <div className="text-left">
                <h2 className="text-3xl font-bold mb-3 tracking-tight">Interactive Playground</h2>
                <p className="text-muted-foreground text-lg">Test configurations and responsiveness in real-time.</p>
              </div>

              <div className="flex items-center gap-4 p-1.5 rounded-2xl bg-card border border-border/50 shadow-sm">
                <div className="flex gap-1 p-1 bg-muted/50 rounded-[14px]">
                  {(["minimal", "standard", "full"] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setActivePlugin(preset)}
                      className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                        activePlugin === preset
                          ? "bg-background text-foreground shadow-sm scale-100"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/20 scale-95"
                      }`}
                    >
                      {preset.charAt(0).toUpperCase() + preset.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="flex gap-1">
                  {([
                    { mode: "desktop" as ViewMode, icon: Monitor },
                    { mode: "tablet" as ViewMode, icon: Tablet },
                    { mode: "mobile" as ViewMode, icon: Smartphone }
                  ]).map(({ mode, icon: Icon }) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-2.5 rounded-xl transition-all ${
                        viewMode === mode
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/5 shadow-sm"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Editor Canvas */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-10"></div>
              <div 
                className=""
                style={{ maxWidth: getViewModeWidth() }}
              >
                {!isEditorLoaded && (
                  <div className="flex items-center justify-center h-[500px]">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-[3px] border-primary/10 border-t-primary rounded-full animate-spin"></div>
                      <span className="text-sm font-semibold text-muted-foreground animate-pulse">Initializing SanTrix Engine...</span>
                    </div>
                  </div>
                )}
                <div ref={editorContainerRef} className={isEditorLoaded ? "p-1" : "hidden"}>
                  <textarea 
                    id="santrix-editor" 
                    defaultValue="<h1>Unleash your creativity.</h1><p>SanTrix provides the ultimate writing experience for your users.</p><p>&nbsp;</p><h3>Key Features:</h3><ul><li><strong>Performance:</strong> Lightweight and incredibly fast.</li><li><strong>Customization:</strong> Tailor it to your brand effortlessly.</li><li><strong>Reliability:</strong> Built on a battle-tested foundation.</li></ul><p>&nbsp;</p><p>Experience the difference today.</p>"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready for a better editor?</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://www.npmjs.com/package/santrix" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl shadow-primary/20">
                  Get Started for Free
                </Button>
              </a>
              <a href="https://github.com/NopeThisIsShini/SanTrix" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" className="h-14 px-10 rounded-full text-lg gap-2">
                  View Source <ExternalLink className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  )
}
