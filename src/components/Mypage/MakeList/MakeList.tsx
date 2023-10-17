import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateIcon, DeleteIcon } from "../../../asset/icon/Icon";
import * as ST from "./STMakeList";
import { getEvents, deleteEvent } from "../../../api/api";

interface Event {
  eventId: number;
  eventName: string;
  hostUser: { UserId: number }[];
}

interface EventItem {
  event: Event;
  hostUser: { UserId: number }[];
}

const MakeList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");
      const data = await getEvents(Number(userId));
      console.log(data);
      const userEvents = data
        .filter((item: EventItem) => item.hostUser[0].UserId === Number(userId))
        .map((item: EventItem) => item.event);
      setEvents(userEvents);
    } catch (error) {
      console.error("글목록 불러오기 실패:", error);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await deleteEvent(eventId);
      fetchEvents();
    } catch (error) {
      console.error("글 삭제 실패:", error);
    }
  };

  const handlePostClick = (eventId: number) => {
    navigate(`/postview/${eventId}`);
  };

  const handleUpdateClick = (eventId: number) => {
    navigate(`/post/update/${eventId}`);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {events.map((event) => {
        console.log(event.eventName);
        return (
          <ST.UserPostForm key={event.eventId}>
            <label onClick={() => handlePostClick(event.eventId)}>
              {event.eventName}
            </label>
            <div>
              <button onClick={() => handleUpdateClick(event.eventId)}>
                <UpdateIcon />
              </button>
              <button onClick={() => handleDeleteEvent(event.eventId)}>
                <DeleteIcon />
              </button>
            </div>
          </ST.UserPostForm>
        );
      })}
    </div>
  );
};

export default MakeList;
