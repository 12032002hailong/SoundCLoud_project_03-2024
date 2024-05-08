import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import NProgressWrapper from "@/lib/nprogress.wrapper";
import { TrackContextProvider } from "@/lib/track.wrapper";
import { ToastProvider } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Title from layout',
  description: 'description layout',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NProgressWrapper>
            <NextAuthWrapper>
              <ToastProvider>
                <TrackContextProvider>{children}</TrackContextProvider>
              </ToastProvider>
            </NextAuthWrapper>
          </NProgressWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
