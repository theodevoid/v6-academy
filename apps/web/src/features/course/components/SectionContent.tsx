interface SectionContentProps extends React.PropsWithChildren {
  title: string;
}

export const SectionContent: React.FC<SectionContentProps> = ({
  title,
  children,
}) => {
  return (
    <section>
      <h2 className="mb-6 font-heading text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
};
