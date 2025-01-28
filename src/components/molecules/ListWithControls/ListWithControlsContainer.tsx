const ListWithControlsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="w-full overflow-y-auto flex flex-col gap-3 px-2 sm:px-4 py-4 rounded-lg bg-white">
        {children}
      </div>
    </>
  );
};
export default ListWithControlsContainer;
