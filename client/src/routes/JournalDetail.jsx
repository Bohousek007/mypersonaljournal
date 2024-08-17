import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calls from "../utils/api";
import JournalEntryList from "../components/JournalEntryList";

function JournalDetail() {
  const { journalId } = useParams();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchJournal = async () => {
    try {
      setLoading(true);
      const data = await Calls.journalDetail(journalId);
      setJournal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournal();
  }, [journalId]);

  if (!journal) {
    return <p>Načítám...</p>;
  }
  if (loading) {
    return <p>Načítám...</p>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/journals")}
        className="bg-gray-500 text-white rounded hover:bg-gray-700 mb-4 transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg text-decoration-none"
      >
        Zpátky do Journals
      </button>
      <h3 className="text-2xl font-bold mb-4">{journal._doc.name}</h3>
      <JournalEntryList
        journalId={journalId}
        journal={journal}
        journalDetail={fetchJournal}
      />
    </div>
  );
}

export default JournalDetail;
