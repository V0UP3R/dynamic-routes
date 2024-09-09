import NavBar from "../components/NavBar/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <NavBar />
      {children}
    </main>
  );
}
