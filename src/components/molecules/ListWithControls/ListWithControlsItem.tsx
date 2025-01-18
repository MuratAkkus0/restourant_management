const ListWithControlsItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full p-4 bg-white shadow-lg rounded-lg flex justify-between items-center gap-4">
        {children}
      </div>
    </>
  );
};
export default ListWithControlsItem;
