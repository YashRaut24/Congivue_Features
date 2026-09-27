const API_URL = "http://localhost:5000/api";

export const sendActivityBatch = async (activities) => {
  if (!activities.length) {
    return;
  }

  const response = await fetch(`${API_URL}/activities/batch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      activities
    })
  });

  if (!response.ok) {
    throw new Error("Failed to send activity batch");
  }

  return response.json();
};