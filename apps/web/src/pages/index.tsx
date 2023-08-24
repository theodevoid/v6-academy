import { CourseShowCaseSection, SearchBar } from '~/features/home';

export default function Home() {
  return (
    <div className="container max-w-screen-md my-8">
      <SearchBar />
      <CourseShowCaseSection />
    </div>
  );
}
