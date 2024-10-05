import { contentStyle } from "./App";

// Overview Component
export const Overview: React.FC = () => {
  return (
    <div style={contentStyle}>
      <h2>Overview</h2>
      <p>
        Wildfires are uncontrolled fires that spread rapidly, consuming
        vegetation, and can cause extensive damage to ecosystems, property, and
        human life. They can occur in forests, grasslands, and even urban areas.
        Understanding wildfires is crucial for implementing effective
        prevention, management, and recovery strategies.
      </p>
      <p>
        In this application, you can explore global wildfire data, learn about
        their effects on ecosystems and communities, view real-time maps of
        wildfires, and even engage with interactive content.
      </p>
    </div>
  );
};
