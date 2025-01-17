import Button from '../atoms/Button';

function ConfirmChoiseBox() {
  return (
    <div className="hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div className="w-[75%] max-w-3xl h-36 lg:h-40 flex flex-col justify-evenly items-center rounded-lg bg-white">
        <p className="text-center lg:text-lg">
          Are you sure you want to delete this? This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button text="Cancel" />
          <Button text="Delete" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmChoiseBox;
