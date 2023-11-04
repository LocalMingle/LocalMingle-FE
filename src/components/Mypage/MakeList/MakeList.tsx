import React from "react";
import * as St from "./STMakeList";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { userState } from "../../../recoil/atoms/UserState";
import { getEvents, deleteEvent } from "../../../api/api";
import { useLanguage } from "../../../util/Locales/useLanguage";

interface Event {
  eventId: number;
  eventName: string;
  eventDate: string;
  eventImg: string;
  eventLocation: string;
  content: string;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const MakeList: React.FC = () => {
  const user = useRecoilValue(userState);
  const userId = user.userId;
  const navigate = useNavigate();
  const { t } = useLanguage();

  const fetchEvents = async () => {
    if (!userId) throw new Error("사용자가 로그인하지 않았습니다");
    const data = await getEvents(Number(userId));
    const userEvents = data.HostEvents.map(
      (item: { Event: Event }) => item.Event
    );
    return userEvents.sort((a: Event, b: Event) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const { data: events, refetch } = useQuery<Event[], Error>(
    ["events", userId],
    fetchEvents,
    {
      enabled: !!userId,
    }
  );

  const mutation = useMutation<number, Error, number>(deleteEvent, {
    onSuccess: () => {
      refetch();
      toast.success(t("삭제가 완료되었습니다."), {
        className: "toast-success toast-container",
      });
    },
  });

  const handleDeleteEvent = (eventId: number) => {
    const toastId = toast(
      <St.ToastWrapper>
        {t("정말로 삭제하시겠습니까?")}
        <St.ConfirmButton
          onClick={async () => {
            await mutation.mutateAsync(eventId);
            toast.dismiss(toastId);
          }}
        >
          {t("삭제")}
        </St.ConfirmButton>
        <St.CancelButton onClick={() => toast.dismiss(toastId)}>
          {t("취소")}
        </St.CancelButton>
      </St.ToastWrapper>
    );
  };

  const handlePostClick = (eventId: number) => {
    navigate(`/postview/${eventId}`);
  };

  const handleUpdateClick = (eventId: number) => {
    navigate(`/post/update/${eventId}`);
  };

  return (
    <>
      {events && events.length > 0 ? (
        <St.MyPageContainer>
          <St.MyPageWrap>
            <div>
              {events.map((event) => (
                <St.UserPostForm key={event.eventId}>
                  <h2 onClick={() => handlePostClick(event.eventId)}>
                    {event.eventName}
                  </h2>
                  <St.UserPostButtonWrap>
                    <button onClick={() => handleUpdateClick(event.eventId)}>
                      {t("수정")}
                    </button>
                    <button onClick={() => handleDeleteEvent(event.eventId)}>
                      {t("삭제")}
                    </button>
                  </St.UserPostButtonWrap>
                </St.UserPostForm>
              ))}
            </div>
          </St.MyPageWrap>
        </St.MyPageContainer>
      ) : (
        <St.MyPageContainer>
          <St.MyPageWrap>
            <St.NoEventMessage>
              {t("생성하신 이벤트가 없습니다.")}
            </St.NoEventMessage>
          </St.MyPageWrap>
        </St.MyPageContainer>
      )}
    </>
  );
};

export default MakeList;
