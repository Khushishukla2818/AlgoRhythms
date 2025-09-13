import { React, useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Dashboard from "./pages/Dashboard";
import AlumniDirectory from "./pages/AlumniDirectory";
import Events from "./pages/Events";
import Mentorship from "./pages/Mentorship";
import Login from "./pages/Login";
import Placement from "./pages/Placement";
import Profile from "./pages/Profile";
import DiscussionForums from "./pages/DiscussionForums";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import BatchDetails from "./features/alumnidirectory/BatchDetails";
import ProgramDetails from "./features/mentorship/ProgramDetails";
import ForumQuestions from "./features/forums/ForumsQuestions";
import QuestionDiscussion from "./features/forums/QuestionDiscussion";
import JobDetails from "./features/jobs/JobDetails";
import { Provider } from "react-redux";
import store from "./store";
import Donation from "./pages/Donation";
import OpenSource from "./pages/OpenSource";
import ProjectDetails from "./features/opensource/ProjectDetails";
import Chat from "./pages/Chat";
import AddProjectForm from "./features/opensource/AddProject";
import AddJob from "./features/jobs/JobForm";

const socket = io.connect("https://algorhythms.onrender.com");

const App = () => {
  const [username, setUsername] = useState("khushi");
  const [room, setRoom] = useState("");
  const [userRole, setUserRole] = useState("alumni");

  useEffect(() => {
    if (userRole === "alumni") {
      socket.emit("check_rooms", { alumniUsername: username });
    }

    socket.on("join_chat", ({ room }) => {
      setRoom(room);
      console.log(`Joined chat room: ${room}`);
      // showNotification(`You joined chat room: ${room}`);
    });

    socket.on("alumni_joined", ({ room, alumniUsername }) => {
      // showNotification(`${alumniUsername} has joined the chat in room: ${room}`);
    });

    return () => {
      socket.off("join_chat");
      socket.off("alumni_joined");
    };
  }, [socket, username, userRole]);

  // const showNotification = (message) => {
  //     alert(message);
  // };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="login" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="alumnidirectory" element={<AlumniDirectory />} />
            <Route
              path="/alumnidirectory/:year"
              element={
                <BatchDetails
                  username={username}
                  setUsername={setUsername}
                  room={room}
                  setRoom={setRoom}
                  socket={socket}
                />
              }
            />
            <Route
              path="chat/:roomName"
              element={<Chat socket={socket} username={username} />}
            />
            <Route path="events" element={<Events />} />
            <Route path="mentorship" element={<Mentorship />} />
            <Route path="mentorship/:id" element={<ProgramDetails />} />
            <Route path="placement" element={<Placement />} />
            <Route path="placement/:id" element={<JobDetails />} />
            <Route path="addplacement" element={<AddJob />} />
            <Route path="profile" element={<Profile />} />
            <Route path="donation" element={<Donation />} />
            <Route path="opensource" element={<OpenSource />} />
            <Route path="/opensource/:id" element={<ProjectDetails />} />
            <Route path="addproject" element={<AddProjectForm />} />
            <Route path="discussionforums" element={<DiscussionForums />} />
            <Route
              path="/discussionforums/:forumId"
              element={<ForumQuestions />}
            />
            <Route
              path="/discussionforums/:forumId/questions/:questionId"
              element={<QuestionDiscussion />}
            />
          </Route>
          <Route path="login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
