import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          description: 'text-black font-medium',
          toast: 'group',
          title: 'font-semibold',
        }
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "hsl(142.1, 76.2%, 36.3%)",
          "--success-text": "white",
          "--success-description": "black",
          "--error-bg": "hsl(346.8, 77.2%, 49.8%)",
          "--error-text": "white",
          "--error-description": "black",
          "--description": "black",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
