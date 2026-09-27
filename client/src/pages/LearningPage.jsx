import { useEffect } from "react";
import useActivityTracker from "../hooks/useActivityTracker";

const LearningPage = ({
  userId,
  topicId,
  resourceId,
  sessionId
}) => {
  const { addActivity, flushActivities } = useActivityTracker({
    userId,
    topicId,
    resourceId,
    sessionId
  });

  useEffect(() => {
    addActivity("CONTENT_OPEN");

    return () => {
      flushActivities();
    };
  }, [addActivity, flushActivities]);

  return (
    <main>
      <h1>JavaScript Variables</h1>

      <section>
        <h2>Introduction</h2>

        <p>
          Variables are used to store values in JavaScript.
        </p>

        <p>
          JavaScript provides var, let and const for variable
          declaration. Each declaration has different scoping
          and reassignment behavior.
        </p>

        <h2>let</h2>

        <p>
          The let declaration creates a block-scoped variable.
        </p>

        <pre>
          <code>{`let age = 20;`}</code>
        </pre>

        <h2>const</h2>

        <p>
          The const declaration creates a block-scoped binding
          that cannot be reassigned.
        </p>

        <pre>
          <code>{`const name = "Alex";`}</code>
        </pre>

        <h2>var</h2>

        <p>
          The var declaration has function scope and behaves
          differently from let and const.
        </p>

        <pre>
          <code>{`var score = 100;`}</code>
        </pre>

        <div style={{ height: "1000px" }} />

        <h2>Summary</h2>

        <p>
          Understanding the differences between var, let and
          const is an important foundation for JavaScript.
        </p>
      </section>
    </main>
  );
};

export default LearningPage;