import React, { useEffect, useState } from "react";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  PieChart, Pie, Cell
} from "recharts";
import { motion } from "framer-motion";
import { useUserContext } from "../context/UserContext";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57"];

const Dashboard = () => {
  const { userId } = useUserContext();
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [range, setRange] = useState("7d");

  useEffect(() => {
    if (!userId) return;
    console.log(userId);
    
    const fetchStories = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/get-user-stats/${userId}`);
        const data = await response.json();
        console.log(data);
        
        if (data.success) {
          setStories(data.data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStories();
  }, [userId]);

  // 📅 Filter by date range
  useEffect(() => {
    if (!stories.length) return;

    const now = new Date();
    const ranges = {
      today: new Date(now.setHours(0, 0, 0, 0)),
      "7d": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      "1m": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      "1y": new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    };

    const filtered = stories.filter(story => {
      const createdAt = new Date(story.created_at);
      return createdAt >= ranges[range];
    });

    setFilteredStories(filtered);
  }, [stories, range]);

  // 🧠 Prepare data for charts
  const moodCount = filteredStories.reduce((acc, story) => {
    acc[story.mood] = (acc[story.mood] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(moodCount).map(([mood, count]) => ({
    name: mood,
    value: count,
  }));

  const lineData = filteredStories.map(story => ({
    date: story.created_at.split(" ")[0],
    mood: story.mood,
  }));

  // 🧾 Stats summary
  const totalStories = filteredStories.length;
  const mostCommonMood =
    Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

 return (
  <div className="p-6 py-20 min-h-screen bg-gray-900 text-gray-100 transition-colors duration-300">
    <motion.h1
      className="text-3xl font-bold text-center text-indigo-400 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      📈 Mood Analytics Dashboard
    </motion.h1>



    {/* Time Range Selector */}
    <div className="flex justify-center gap-4 mb-8">
      {["today", "7d", "1m", "1y"].map((r) => (
        <button
          key={r}
          className={`px-4 py-2 rounded-full font-medium transition ${
            range === r
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
          onClick={() => setRange(r)}
        >
          {r === "7d"
            ? "Last 7 Days"
            : r === "1m"
            ? "Last Month"
            : r === "1y"
            ? "Last Year"
            : "Today"}
        </button>
      ))}
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        className="bg-gray-800 rounded-2xl shadow-md p-5 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-2xl font-bold text-indigo-400">{totalStories}</h2>
        <p className="text-gray-400">Stories Generated</p>
      </motion.div>

      <motion.div
        className="bg-gray-800 rounded-2xl shadow-md p-5 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-2xl font-bold text-indigo-400">{mostCommonMood}</h2>
        <p className="text-gray-400">Most Frequent Mood</p>
      </motion.div>

      <motion.div
        className="bg-gray-800 rounded-2xl shadow-md p-5 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-2xl font-bold text-indigo-400">{stories.length}</h2>
        <p className="text-gray-400">Total All-Time Stories</p>
      </motion.div>
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pie Chart */}
      <motion.div
        className="bg-gray-800 rounded-2xl shadow-md p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-indigo-400">Mood Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#fff" }} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        className="bg-gray-800 rounded-2xl shadow-md p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-indigo-400">Mood Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
            <Legend />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  </div>
);

};

export default Dashboard;
