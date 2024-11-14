import BgCourse from "./components/bg-course";

export default async function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-[#f3f4f6]">
      <div className="smooth clr-text-primary">
        <div className="px-2 lg:px-4 sm:px-10 py-8 pb-10 space-y-10">
          <BgCourse />
          {children}
        </div>
      </div>
    </div>
  );
}
