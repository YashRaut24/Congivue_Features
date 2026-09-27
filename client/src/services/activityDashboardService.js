const API_URL = "http://localhost:5000/api";

export const getActivities = async () => {
  const response = await fetch(`${API_URL}/activities`);

  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }

  return response.json();
};

export const deleteActivity = async (activityId) => {
  const response = await fetch(
    `${API_URL}/activities/${activityId}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete activity");
  }

  return response.json();
};

export const deleteAllActivities = async () => {
  const response = await fetch(
    `${API_URL}/activities/all`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete all activities");
  }

  return response.json();
};