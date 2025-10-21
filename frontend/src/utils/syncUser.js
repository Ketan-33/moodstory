export const syncUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:8000/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to sync user");
    }

    const data = await response.json();
    console.log("✅ User synced successfully:", data);
  } catch (error) {
    console.error("❌ Error syncing user:", error);
  }
};
