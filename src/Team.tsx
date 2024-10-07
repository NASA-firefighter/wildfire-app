// team.tsx
import React from "react";
import "./Team.css";

export const Team: React.FC = () => {
  return (
    <div className="team-container">
      <h2 className="text-center">Meet Our Team</h2>
      <div className="row">
        {teamMembers.map((member, index) => (
          <div className="col-md-4" key={index}>
            <div className="team-member">
              <img src={'src/assets/akikiki-icon.png'} alt={member.name} className="member-photo" />
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Member 1",
    role: "Role 1",
    image: "path/to/member1.jpg", // Replace with actual image paths
    description: "Brief description about Member 1.",
  },
  {
    name: "Member 2",
    role: "Role 2",
    image: "path/to/member2.jpg", // Replace with actual image paths
    description: "Brief description about Member 2.",
  },
  {
    name: "Member 3",
    role: "Role 3",
    image: "path/to/member3.jpg", // Replace with actual image paths
    description: "Brief description about Member 3.",
  },
];

