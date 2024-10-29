export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen mx-auto w-full max-w-2xl md:max-w-5xl lg:max-w-full">
      {children}
    </main>
  );
}
