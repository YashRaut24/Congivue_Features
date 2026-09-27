import { useCallback, useEffect, useRef } from "react";
import { sendActivityBatch } from "../services/activityService";

const useActivityTracker = ({
  userId,
  topicId,
  resourceId,
  sessionId
}) => {
  const activityBuffer = useRef([]);
  const activeTimeRef = useRef(0);
  const lastActiveTimeRef = useRef(Date.now());
  const isVisibleRef = useRef(!document.hidden);
  const scrollMilestonesRef = useRef(new Set());

  const addActivity = useCallback(
    (interactionType, data = {}) => {
      activityBuffer.current.push({
        userId,
        topicId,
        resourceId,
        sessionId,
        interactionType,
        timestamp: new Date().toISOString(),
        ...data
      });
    },
    [userId, topicId, resourceId, sessionId]
  );

  const updateActiveTime = useCallback(() => {
    const now = Date.now();

    if (isVisibleRef.current) {
      const elapsed = Math.max(
        0,
        Math.floor((now - lastActiveTimeRef.current) / 1000)
      );

      activeTimeRef.current += elapsed;
    }

    lastActiveTimeRef.current = now;
  }, []);

  const handleScroll = useCallback(() => {
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) {
      return;
    }

    const scrollPosition = window.scrollY;
    const scrollPercentage = Math.min(
      100,
      Math.round((scrollPosition / documentHeight) * 100)
    );

    const milestones = [25, 50, 75, 100];

    milestones.forEach((milestone) => {
      if (
        scrollPercentage >= milestone &&
        !scrollMilestonesRef.current.has(milestone)
      ) {
        scrollMilestonesRef.current.add(milestone);

        addActivity("SCROLL", {
          completionRatio: milestone / 100,
          metadata: {
            scrollPercentage: milestone
          }
        });
      }
    });
  }, [addActivity]);

  const flushActivities = useCallback(async () => {
    updateActiveTime();

    if (activeTimeRef.current > 0) {
      addActivity("ACTIVE_TIME", {
        duration: activeTimeRef.current
      });

      activeTimeRef.current = 0;
    }

    if (!activityBuffer.current.length) {
      return;
    }

    const activities = [...activityBuffer.current];

    activityBuffer.current = [];

    try {
      await sendActivityBatch(activities);
    } catch (error) {
      activityBuffer.current.unshift(...activities);
      console.error("Activity upload failed:", error);
    }
  }, [addActivity, updateActiveTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      updateActiveTime();

      isVisibleRef.current = !document.hidden;

      if (!document.hidden) {
        lastActiveTimeRef.current = Date.now();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [updateActiveTime]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const interval = setInterval(() => {
      flushActivities();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [flushActivities]);

  return {
    addActivity,
    flushActivities
  };
};

export default useActivityTracker;