export const ListWithControlsItem = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <>
      <div className="w-full h-12 px-2 flex justify-between items-center gap-2 shadow-md">
        <p className="text-base border truncate">{text}</p>
        {children}
      </div>
    </>
  );
};
