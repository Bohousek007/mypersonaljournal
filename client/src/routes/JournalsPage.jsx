import JournalList from "../components/JournalList";

const JournalsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4">Seznam mých deníků</h1>
      <JournalList />
    </div>
  );
};

export default JournalsPage;
