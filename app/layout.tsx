import NavigationBar from "./components/NavigationBar";
import MessageContext from "./hooks/MessageContext";
import "./globals.css";

export const metadata = {
  title: "YesNo Survey",
  description: "Tinder but for anything you want.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MessageContext>
          <nav>
            <NavigationBar />
          </nav>
          <main>{children}</main>
        </MessageContext>
      </body>
    </html>
  );
}
