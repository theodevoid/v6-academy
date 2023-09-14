import { CourseShowCaseSection, HeroSection } from '~/features/home';

export default function Home() {
  return (
    <>
      <main className="container max-w-screen-md px-4">
        <HeroSection />
        <CourseShowCaseSection />
      </main>
    </>
  );
}
