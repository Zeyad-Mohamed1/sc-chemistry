import Details from "../components/details";
import Resources from "../components/resources";
import Title from "../components/title";
import Video from "../components/video";

const LessonPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <Title />
      <div className="flex flex-col lg:flex-row gap-4 w-screen">
        <div className="flex flex-col gap-4 w-full lg:w-2/3 mx-auto p-4">
          <Video />
          <Details />
        </div>
        <div className="w-full lg:w-1/3">
          <Resources />
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
