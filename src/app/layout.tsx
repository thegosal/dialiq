import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DialIQ - AI Receptionist for Veterinary Practices",
  description: "Never miss another appointment. DialIQ's AI receptionist handles calls, schedules appointments, and provides instant support for your veterinary practice 24/7.",
  keywords: "AI receptionist, veterinary practice, appointment scheduling, HIPAA compliant, veterinary software",
  authors: [{ name: "DialIQ" }],
  openGraph: {
    title: "DialIQ - AI Receptionist for Veterinary Practices",
    description: "Never miss another appointment. DialIQ's AI receptionist handles calls, schedules appointments, and provides instant support for your veterinary practice 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
