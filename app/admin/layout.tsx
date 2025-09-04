import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel - Portfolio",
  description: "Admin panel for managing portfolio projects",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
