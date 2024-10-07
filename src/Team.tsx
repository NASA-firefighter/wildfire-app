import React from "react";
import "./Team.css";

import member1Image from "./assets/member1.jpeg";
import member2Image from "./assets/member2.jpeg";
import member3Image from "./assets/member3.jpeg";

export const Team: React.FC = () => {
  return (
    <div className="team-container">
      <h2 className="text-center">Team FireFighter</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <div className="member-photo-container">
              <img
                src={member.image}
                alt={member.name}
                className="member-photo"
              />
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p className="member-description">{member.description}</p>
            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="member-linkedin"
              >
                Connect on the Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Dayeon Yoo",
    image: member1Image,
    description:
      "Dayeon Yoo is a full-stack developer and startup founder with expertise in AI, and app & web development. She has successfully led projects like SnapIT!, an AI-powered photo booth app, and co-founded HospitalPeople, a healthcare startup. Dayeon is passionate about solving real-world problems through innovative software solutions. She is currently an undergraduate Computer Science student at UNM, where she also works as a faculty aide in the machine learning field.",
    website: "https://www.linkedin.com/in/dayeon-yoo-71a705276/",
  },
  {
    name: "Chaeeun Park",
    image: member2Image,
    description:
      "Chaeeun Park is a master's student at UNM. She is an entrepreneur who has won the Lobo Hackathon twice and was a finalist in a fintech idea competition. She is currently researching machine learning. She enjoys taking on challenges!!",
    website: "https://www.linkedin.com/in/chaeeun-park-a91328221/",
  },
  {
    name: "Gwanwoo Jin",
    image: member3Image,
    description:
      "As a CEO of STGD, Biodiversity Conservation Advocacy Team, Main director of youth session artwork project of the 8th IUCN ASIA RCF. Gwanwoo Jin is an artist who uses language to create animal illustrations, with a strong focus on biodiversity education. As an ambassador for the National Ecological Institute, he also leverages his influence to promote environmental awareness..",
    website: "https://www.instagram.com/animals_in_korean/",
  },
];
