import { Button } from '~/components/ui/button';

export const HeroSection = () => {
  return (
    <div className="mb-16 mt-20 flex flex-col items-center gap-4">
      <h1 className="text-center font-heading text-5xl font-semibold leading-[1.15] lg:text-7xl lg:leading-[1.15]">
        <span className="text-cyan-500">Suplemen belajar</span>
        &nbsp;lo, buat ilmu tech industry.
      </h1>
      <p className="max-w-screen-sm text-center">
        Gak bermaksud jadi pengganti bootcamp ataupun kuliah. Hanya berharap
        jadi pelengkap aja.
      </p>
      <Button className="mt-6 w-fit self-center">Mulai Belajar 🚀</Button>
    </div>
  );
};
