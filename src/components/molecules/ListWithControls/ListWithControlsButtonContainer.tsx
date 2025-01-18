export const ListWithControlsButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex gap-2">{children}</div>
    </>
  );
};
