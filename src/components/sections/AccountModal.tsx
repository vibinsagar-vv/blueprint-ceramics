import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AccountModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (email: string, name: string) => void
}

export function AccountModal({ isOpen, onClose, onLoginSuccess }: AccountModalProps) {
  const [activeTab, setActiveTab] = React.useState<"login" | "register">("login")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password || (activeTab === "register" && !name)) {
      setError("Please fill in all required fields.")
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      const mockName = activeTab === "register" ? name : email.split("@")[0]
      // Capitalize first letter of name
      const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1)
      onLoginSuccess(email, formattedName)
      onClose()
      // Reset form
      setEmail("")
      setPassword("")
      setName("")
    }, 1200)
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Content Box */}
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-gray-200/50 bg-[#F9F9FB]/95 backdrop-blur-xl p-8 shadow-2xl transition-all duration-300 rounded-none sm:rounded-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none">
          <DialogPrimitive.Close className="absolute right-5 top-5 text-primary/40 hover:text-primary transition-colors focus:outline-none">
            <Icon icon="ph:x" className="w-5 h-5" />
          </DialogPrimitive.Close>

          {/* Heading */}
          <DialogPrimitive.Title className="text-2xl font-heading font-bold text-primary tracking-wide text-center">
            {activeTab === "login" ? "Welcome Back" : "Join Blueprint"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-xs font-body text-primary/60 tracking-wider text-center mt-1 mb-6 uppercase">
            {activeTab === "login" ? "Sign in to access your saved catalogs and specifications" : "Create an account for personalized design assistance"}
          </DialogPrimitive.Description>

          {/* Tabs */}
          <div className="flex border-b border-gray-200/70 mb-6">
            <button
              onClick={() => {
                setActiveTab("login")
                setError("")
              }}
              className={cn(
                "flex-1 pb-3 text-xs font-body font-bold uppercase tracking-[0.15em] border-b-2 text-center transition-all duration-300 focus:outline-none",
                activeTab === "login"
                  ? "border-accent text-primary"
                  : "border-transparent text-primary/40 hover:text-primary/70"
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab("register")
                setError("")
              }}
              className={cn(
                "flex-1 pb-3 text-xs font-body font-bold uppercase tracking-[0.15em] border-b-2 text-center transition-all duration-300 focus:outline-none",
                activeTab === "register"
                  ? "border-accent text-primary"
                  : "border-transparent text-primary/40 hover:text-primary/70"
              )}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-body tracking-wide flex items-center gap-2 border border-red-100">
              <Icon icon="ph:warning-circle" className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {activeTab === "register" && (
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-body font-bold uppercase tracking-wider text-primary/70">
                  Full Name
                </label>
                <div className="relative">
                  <Icon icon="ph:user" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-gray-200 text-sm font-body px-10 py-3 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-primary/30 text-primary"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-body font-bold uppercase tracking-wider text-primary/70">
                Email Address
              </label>
              <div className="relative">
                <Icon icon="ph:envelope-simple" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-gray-200 text-sm font-body px-10 py-3 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-primary/30 text-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-body font-bold uppercase tracking-wider text-primary/70">
                Password
              </label>
              <div className="relative">
                <Icon icon="ph:lock" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40 w-4 h-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 text-sm font-body px-10 py-3 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-primary/30 text-primary"
                />
              </div>
            </div>

            {activeTab === "login" && (
              <div className="flex items-center justify-between text-xs font-body text-primary/60 mt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="accent-accent" />
                  Remember me
                </label>
                <a href="#" className="hover:text-accent font-medium transition-colors">
                  Forgot Password?
                </a>
              </div>
            )}

            {activeTab === "register" && (
              <div className="flex items-start gap-2 text-xs font-body text-primary/60 mt-1">
                <input type="checkbox" required className="accent-accent mt-0.5" />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:text-accent font-medium underline underline-offset-2 transition-all">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:text-accent font-medium underline underline-offset-2 transition-all">
                    Privacy Policy
                  </a>.
                </span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-primary hover:bg-primary/95 text-white font-body font-bold uppercase tracking-wider text-xs py-3.5 rounded-none flex items-center justify-center gap-2 group/btn"
            >
              {isLoading ? (
                <>
                  <Icon icon="ph:spinner-gap" className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{activeTab === "login" ? "Sign In" : "Register"}</span>
                  <Icon icon="ph:arrow-right-bold" className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Social login mock */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/70"></div>
            </div>
            <span className="relative bg-[#F9F9FB] px-3 text-[10px] font-body text-primary/40 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-xs font-body font-semibold text-primary/80">
              <Icon icon="solar:round-alt-arrow-right-linear" className="w-4 h-4 text-red-500" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-xs font-body font-semibold text-primary/80">
              <Icon icon="solar:round-alt-arrow-right-linear" className="w-4 h-4 text-blue-600" />
              Apple
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
