import { contentStyle } from "./App";

// Firefighter Game Component
export const FirefighterGame: React.FC = () => {
  return (
    <div style={contentStyle}>
      <h2>Firefighter Game</h2>
      <p>
        Welcome to the Firefighter Game! In this interactive simulation, you
        will step into the shoes of a firefighter, tasked with battling
        wildfires and protecting your community.
      </p>
      <h3>Game Objective</h3>
      <p>
        Your mission is to strategically manage resources, coordinate
        firefighting efforts, and successfully extinguish fires while minimizing
        damage to the environment and ensuring the safety of local residents.
      </p>
      <h3>Gameplay Mechanics</h3>
      <ul>
        <li>Navigate through various terrains affected by wildfires.</li>
        <li>
          Make decisions on resource allocation and firefighting strategies.
        </li>
        <li>Respond to emergency situations and save lives!</li>
      </ul>
      <p>
        Are you ready to take on the challenge and become a hero in the fight
        against wildfires?
      </p>
    </div>
  );
};
