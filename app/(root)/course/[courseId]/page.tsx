import LessonSection from "../components/lesson-section";
import MainSection from "../components/main-section";

const CoursePage = () => {
  return (
    <>
      {/* start Main */}
      <MainSection />
      {/* end Main */}

      {/* Lessons */}
      <div className="w-full relative overflow-hidden bg-[#f3f4f6] smooth clr-text-primary">
        <LessonSection />
      </div>
      {/* Lessons */}
    </>
  );
};

export default CoursePage;
