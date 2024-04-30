import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        {children}
        <div style={{ marginBottom: "100px" }}></div>
        <AppFooter />
      </body>
    </html>
  );
}
