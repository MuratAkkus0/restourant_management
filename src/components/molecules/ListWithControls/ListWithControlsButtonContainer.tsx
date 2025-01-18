const ListWithControlsButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex-shrink-0 flex items-center text-right cursor-pointer">
        {children}
      </div>
    </>
  );
};
export default ListWithControlsButtonContainer;
