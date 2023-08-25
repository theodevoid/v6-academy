import { subMonths } from 'date-fns';

import { CourseCard } from '~/features/course';

export const CourseShowCaseSection = () => {
  return (
    <div className="mt-8">
      <h3 className="font-heading text-xl font-semibold">
        Nih, course recommended buat lo!
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        <CourseCard
          author="Sandhika Galih (WPU)"
          coverImageUrl="https://cdn.discordapp.com/attachments/1050790741334569091/1144315130507710474/react_wpu.jpg"
          createdDate={new Date()}
          title="Tutorial REACT Paling Masuk Akal UNTUK PEMULA"
          unitCount={21}
        />
        <CourseCard
          author="Dea Afrizal"
          coverImageUrl="https://cdn.discordapp.com/attachments/1050790741334569091/1144315130256040036/express_dea.jpg"
          createdDate={subMonths(new Date(), 15)}
          title="Tutorial Backend API NodeJS Express"
          unitCount={8}
        />
      </div>
    </div>
  );
};
