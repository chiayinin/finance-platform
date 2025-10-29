import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { zhTW } from '@clerk/localizations';
import { neobrutalism } from '@clerk/themes';
import { QueryProviders } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={zhTW}
      appearance={{
        cssLayerName: 'clerk',
        baseTheme: neobrutalism,
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
          unsafe_disableDevelopmentModeWarnings: true,
        },
        variables: {
          colorPrimary: '#6366f1',
        }
    }}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryProviders>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
