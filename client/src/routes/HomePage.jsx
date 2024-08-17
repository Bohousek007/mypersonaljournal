import { Link } from "react-router-dom";

const HomePage = () => (
  <>
    <div className="content-container mt-5">
      <div className="">
        <h1 className="display-5 text-center mb-4">
          MY PERSONAL JOURNAL
        </h1>
        <div className="card mx-auto mt-4 shadow-lg" style={{ paddingBottom: "20px", paddingTop: "20px"}}>
          <div className="card-body p-4">
            <h5 className="card-title text-uppercase">
              Prozkoumejte své deníky
            </h5>
            <p className="card-text text-muted">
              Objevte své myšlenky, pocity a zkušenosti.
            </p>
            <Link
              to="/journals"
              className="btn btn-primary btn-block btn-md mt-3"
            >
              Podívat se
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
