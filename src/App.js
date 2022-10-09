import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  // const posts = JSON.parse(localStorage.getItem("posts"))

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(
    () =>
      JSON.parse(localStorage.getItem("posts")) || [
        {
          text: "Change current tarif (probably in bug)",
          day: "",
          reminder: true,
          id: 2,
        },
        {
          text: "Recount? ",
          day: "",
          reminder: true,
          id: 3,
        },
        {
          text: "watch the full course about react 2021",
          day: "",
          reminder: false,
          id: 4,
        },
      ]
  );

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = (task) => {
    const id = nanoid();
    const newTask = { id, ...task };

    setTasks([newTask, ...tasks]);

    // const newTask = { ...task, id: nanoid() };
    // setTasks([newTask, ...tasks]);
  };

  // Delete task
  const deleteTask = (id) => {
    // console.log("delete", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = (id) => {
    // console.log(id);
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) =>
        prevTask.id === id
          ? { ...prevTask, reminder: !prevTask.reminder }
          : { ...prevTask }
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  <h3>No Tasks To Show</h3>
                )}
              </>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
