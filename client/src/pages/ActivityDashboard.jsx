import { useEffect, useState } from "react";
import {
  getActivities,
  deleteActivity,
  deleteAllActivities
} from "../services/activityDashboardService";
import "./ActivityDashboard.css";

const ActivityDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadActivities = async () => {
    try {
      setLoading(true);

      const response = await getActivities();

      setActivities(response.data);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (activityId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteActivity(activityId);

      setActivities((currentActivities) =>
        currentActivities.filter(
          (activity) => activity._id !== activityId
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteAll = async () => {
    if (!activities.length) {
      return;
    }

    const confirmed = window.confirm(
      `Delete all ${activities.length} interactions? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAllActivities();

      setActivities([]);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <main className="activity-dashboard">
      <div className="activity-header">
        <div>
          <div className="dashboard-label">
            COGNIVUE / ACTIVITY MONITOR
          </div>

          <h1>Learning Interactions</h1>

          <p>
            Monitor behavioral activity collected from the
            learning platform.
          </p>
        </div>

        <div className="header-actions">
          <button
            className="refresh-button"
            onClick={loadActivities}
          >
            Refresh
          </button>

          <button
            className="delete-all-button"
            onClick={handleDeleteAll}
            disabled={!activities.length}
          >
            Delete All
          </button>
        </div>
      </div>

      <div className="activity-summary">
        <div className="summary-card">
          <span>Total Interactions</span>
          <strong>{activities.length}</strong>
        </div>
      </div>

      {error && (
        <div className="activity-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="activity-loading">
          Loading interactions...
        </div>
      ) : (
        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Interaction</th>
                <th>Resource</th>
                <th>Session</th>
                <th>Duration</th>
                <th>Completion</th>
                <th>Timestamp</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-state"
                  >
                    No interactions found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity._id}>
                    <td>
                      <span
                        className={`interaction-badge interaction-${activity.interactionType.toLowerCase()}`}
                      >
                        {activity.interactionType}
                      </span>
                    </td>

                    <td>
                      <div className="resource-name">
                        {activity.resourceId?.title ||
                          "Unknown Resource"}
                      </div>

                      {activity.resourceId?.type && (
                        <span className="resource-type">
                          {activity.resourceId.type}
                        </span>
                      )}
                    </td>

                    <td>
                      <span className="session-id">
                        {activity.sessionId}
                      </span>
                    </td>

                    <td>
                      {activity.duration || 0}s
                    </td>

                    <td>
                      {Math.round(
                        (activity.completionRatio || 0) * 100
                      )}
                      %
                    </td>

                    <td>
                      {new Date(
                        activity.timestamp
                      ).toLocaleString()}
                    </td>

                    <td>
                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(activity._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default ActivityDashboard;