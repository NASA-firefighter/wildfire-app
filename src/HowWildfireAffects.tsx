import { contentStyle } from "./App";

// How Wildfire Affects Component
export const HowWildfireAffects: React.FC = () => {
  return (
    <div style={contentStyle}>
      <h2>How Wildfire Affects Our System</h2>
      <h3>Ecological Impact</h3>
      <p>
        Wildfires can significantly alter ecosystems. While some species have
        adapted to thrive in fire-prone environments, many others suffer
        devastating losses. Fires can lead to habitat destruction and
        displacement of wildlife, but they can also stimulate new growth and
        maintain the health of certain ecosystems.
      </p>
      <h3>Climate Change</h3>
      <p>
        Wildfires contribute to climate change by releasing large amounts of
        carbon dioxide and other greenhouse gases into the atmosphere. This can
        exacerbate global warming, creating a feedback loop that leads to more
        frequent and intense wildfires.
      </p>
      <h3>Community Effects</h3>
      <p>
        Communities near wildfire-prone areas face risks to property, air
        quality, and public health. Evacuations and loss of infrastructure can
        disrupt lives and local economies. Awareness and preparation are
        essential for mitigating these risks.
      </p>
    </div>
  );
};
