export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen px-2 sm:px-6 lg:px-8 mx-auto w-full max-w-xl md:max-w-4xl lg:max-w-6xl">
      {children}
    </main>
  );
}
