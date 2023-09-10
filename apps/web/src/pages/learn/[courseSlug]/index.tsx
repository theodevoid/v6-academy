import { GetServerSideProps } from 'next';
import Image from 'next/image';

import { toRupiah } from '~/utils/format';
import { Alert, AlertDescription } from '~/components/ui/alert';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { RoadmapListSection, SectionContent } from '~/features/course';
import { CourseWithUnitsCountAndAuthor, getCourses } from '~/features/home';

interface CoursePageProps {
  course: CourseWithUnitsCountAndAuthor;
}

const CoursePage: React.FC<CoursePageProps> = ({ course }) => {
  return (
    <main className="container min-h-screen max-w-screen-md">
      <h1 className="text-center font-heading text-4xl font-bold uppercase">
        {course.name}
      </h1>
      <AspectRatio ratio={16 / 9}>
        <Image
          alt={`thumbnail ${course.name}`}
          className="mt-4 rounded"
          fill
          src={course.thumbnailUrl as string}
        />
      </AspectRatio>
      <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
        {course.description}
      </p>

      <div className="mt-20 flex flex-col gap-16">
        <SectionContent title="🤔 Apa aja yang bakal dipelajarin?">
          <ul className="-mt-2 list-inside list-disc leading-8">
            {course.mainLearningPoints.map((point, idx) => {
              return <li key={idx}>{point}</li>;
            })}
          </ul>
        </SectionContent>

        <SectionContent title="😅 Apa course ini cocok buat gue?">
          <Alert>
            <AlertDescription>{course.prerequisiteNotes}</AlertDescription>
          </Alert>
        </SectionContent>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 text-center font-heading text-3xl font-bold">
          Roadmap Pembelajaran Course 🛣️
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RoadmapListSection items={course.units.map((unit) => unit.title)} />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="mb-6 text-center font-heading text-3xl font-bold">
          Gabung course ini
        </h2>

        <div className="flex flex-col items-center justify-center">
          <Card className="max-w-xl text-center">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                {toRupiah(course.fiatPrice)}
              </CardTitle>
              <CardDescription>
                Kalian bisa beli course ini dengan harga{' '}
                {toRupiah(course.fiatPrice)}. Iya, pake uang beneran. Transaksi
                akan dilakukan via payment gateway Xendit, dan akan diproses
                secara otomatis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full">
                Beli course seharga {toRupiah(course.fiatPrice)}
              </Button>
            </CardContent>
          </Card>

          <p className="my-4 text-center">atau</p>

          <Card className="max-w-xl text-center">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                {course.pointsPrice.toLocaleString('id-ID')} ✨dev points✨
              </CardTitle>
              <CardDescription>
                Kalian juga bisa beli course ini pake <em>dev points</em>, bukan
                uang beneran. Dev points bisa kalian dapetin dengan cara
                selesaiin course, jawab quiz dengan benar, sama ngerjain tugas
                dari course yang kalian ikutin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" variant="secondary" className="w-full">
                Beli course pake {course.pointsPrice.toLocaleString('id-ID')}{' '}
                dev points
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default CoursePage;

export const getServerSideProps: GetServerSideProps<CoursePageProps> = async (
  context,
) => {
  const { data } = await getCourses({
    slug: context.query.courseSlug as string,
  });

  return {
    props: {
      course: data.records[0],
    },
  };
};
