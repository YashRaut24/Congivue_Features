import { useState } from "react";
import LearningPage from "./pages/LearningPage";
import ActivityDashboard from "./pages/ActivityDashboard";
import "./App.css";

const USER_ID = "6ab8eec1cf96a68356e501f7";
const TOPIC_ID = "6ab8d9dd9184143b21054750";
const RESOURCE_ID = "6ab8dc591ef3833cfafdc54d";

const SESSION_ID =
  "session-4736bbb0-3b4f-4556-ab6d-f35f6641c11a";

function App() {
  const [page, setPage] = useState("learning");

  return (
    <div className="app">
      <nav className="app-navbar">
        <div className="app-brand">
          Cognivue
        </div>

        <div className="app-navigation">
          <button
            className={
              page === "learning"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => setPage("learning")}
          >
            Learning
          </button>

          <button
            className={
              page === "interactions"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => setPage("interactions")}
          >
            View Interactions
          </button>
        </div>
      </nav>

      {page === "learning" && (
        <LearningPage
          userId={USER_ID}
          topicId={TOPIC_ID}
          resourceId={RESOURCE_ID}
          sessionId={SESSION_ID}
        />
      )}

      {page === "interactions" && (
        <ActivityDashboard />
      )}
    </div>
  );
}

export default App;