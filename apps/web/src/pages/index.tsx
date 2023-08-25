import { CourseShowCaseSection, HeroSection, SearchBar } from '~/features/home';

export default function Home() {
  return (
    <>
      <main className="container my-8 max-w-screen-md px-4">
        <SearchBar />
        <HeroSection />
        <CourseShowCaseSection />
      </main>
    </>
  );
}
