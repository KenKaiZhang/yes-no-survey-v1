import "../globals.css";
import "./auth.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="authPage">
      <div className="pageBackground" />
      <div className="content">{children}</div>
    </div>
  );
}
