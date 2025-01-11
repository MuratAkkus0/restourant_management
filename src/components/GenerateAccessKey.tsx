import AccessKeyCard from './AccessKeyCard';

function GenerateAccessKey() {
  // const generateAccessKey = useGenerateAccessKey();
  const handleGenerateAccessKey = async () => {};

  return (
    <>
      <AccessKeyCard
        inputVal={''}
        isInputReadOnly={true}
        btnOnClick={handleGenerateAccessKey}
        btnText="Generate Access Key"
        cardTitle="Generate New Access Key"
        descText="Click on the Generate button below for create new access key."
      />
    </>
  );
}

export default GenerateAccessKey;
