import React, { useState } from "react";

const TABS = [
  { key: "students", label: "Students" },
  { key: "coaches", label: "Coaches" },
  { key: "alumni", label: "Alumni" }
];

const ATHLETES_DATA = {
  students: [
    {
      image: "https://via.placeholder.com/150",
      name: "Rohan Sharma",
      branch: "Computer Science",
      roll: "CS21B1001",
      events: ["100m Dash", "200m Dash"],
      achv: ["Gold - 100m Dash, Inter-IIT 2023", "Institute Record Holder (10.8s)", "National University Games Finalist"],
      phone: "+91 9876543210",
      email: "rohan@iiti.ac.in"
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Priya Singh",
      branch: "Electrical Engineering",
      roll: "EE21B1045",
      events: ["Javelin Throw", "Shot Put"],
      achv: ["Silver - Javelin, Inter-IIT 2023", "Institute Record Holder (58.3m)", "National Junior Athletics Champion"],
      phone: "+91 9876543211",
      email: "priya@iiti.ac.in"
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Amit Patel",
      branch: "Mechanical Engineering",
      roll: "ME21B1078",
      events: ["Long Jump", "Triple Jump"],
      achv: ["Gold - Long Jump, T vs M 2023", "Bronze - Triple Jump, Inter-IIT 2022", "State Level Champion"],
      phone: "+91 9876543212",
      email: "amit@iiti.ac.in"
    }
  ],
  coaches: [
    {
      image: "https://via.placeholder.com/150",
      name: "Rajesh Kumar",
      role: "Head Coach",
      spec: "Track Events",
      events: ["Sprints", "Relays"],
      achv: ["Former National Level Athlete", "15+ Years Coaching Experience", "NIS Certified Coach", "Produced 10+ National Level Athletes"],
      phone: "+91 9876543201",
      email: "rajesh.coach@iiti.ac.in"
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Sunita Devi",
      role: "Field Events Coach",
      spec: "Throws",
      events: ["Javelin", "Shot Put"],
      achv: ["Asian Games Medalist", "10+ Years Coaching Experience", "Sports Authority of India Certified", "Specialist in Biomechanics"],
      phone: "+91 9876543202",
      email: "sunita.coach@iiti.ac.in"
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Vikram Singh",
      role: "Endurance Coach",
      spec: "Long Distance",
      events: ["1500m", "Marathon"],
      achv: ["Boston Marathon Finisher", "Sports Science Masters", "8+ Years Coaching Experience", "Nutrition Specialist"],
      phone: "+91 9876543203",
      email: "vikram.coach@iiti.ac.in"
    }
  ],
  alumni: [
    {
      image: "https://via.placeholder.com/150",
      name: "Neha Gupta",
      batch: "Batch of 2018",
      branch: "Computer Science",
      events: ["400m Hurdles", "Heptathlon"],
      achv: ["Inter-IIT Gold Medalist (2017)", "National University Champion", "Currently: Sports Officer, TCS"],
      contact: "linkedin.com/nehagupta",
      email: "neha.gupta@tcs.com"
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Rahul Verma",
      batch: "Batch of 2016",
      branch: "Electrical Engineering",
      events: ["Decathlon", "Pole Vault"],
      achv: ["Inter-IIT Record Holder (2015)", "National Games Participant", "Currently: Sports Entrepreneur"],
      contact: "linkedin.com/rahulverma",
      email: "rahul@athletex.com"
    },
    {
      image: "suresh profile.jpg",
      name: "Bhukya Suresh",
      batch: "Batch of 2027",
      branch: "MEMS",
      events: ["800m", "1500m"],
      achv: ["Inter-IIT Silver Medalist (2019)", "University Games Champion", "Currently: PhD in Sports Science"],
      contact: "linkedin.com/anjalimishra",
      email: "suryammu24@gmail.com"
    }
  ]
};

export default function Athletes() {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <section id="athletes" className="py-20 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-900">
          Our Athletes
        </h2>
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`${activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600"
                  } px-6 py-2 rounded-lg transition`}
                onClick={() => setActiveTab(tab.key)}
                aria-selected={activeTab === tab.key}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Tab Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ATHLETES_DATA[activeTab].map((ath, idx) => (
            <div className="flip-card h-96" key={idx}>
              <div className="flip-card-inner h-full rounded-xl shadow-lg">
                {/* Front */}
                <div className="flip-card-front bg-white rounded-xl p-6 flex flex-col items-center">
                  <img src={ath.image} alt={ath.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200" />
                  <h3 className="text-xl font-bold text-blue-800">{ath.name}</h3>
                  {/* For Students */}
                  {ath.branch && <p className="text-gray-600">{ath.branch}</p>}
                  {ath.roll && <p className="text-gray-500 text-sm">Roll No: {ath.roll}</p>}
                  {/* For Coaches */}
                  {ath.role && <p className="text-gray-600">{ath.role}</p>}
                  {ath.spec && <p className="text-gray-500 text-sm">Specialization: {ath.spec}</p>}
                  {/* For Alumni */}
                  {ath.batch && <p className="text-gray-600">{ath.batch}</p>}
                  <div className="mt-4">
                    {ath.events && ath.events.map((e, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-1 inline-block">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Back */}
                <div className="flip-card-back bg-blue-600 rounded-xl p-6 flex flex-col justify-center text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {activeTab === 'coaches' ? "Credentials" : "Achievements"}
                  </h3>
                  <ul className="list-disc pl-5 text-sm">
                    {ath.achv.map((a, i) => (
                      <li className="mb-1" key={i}>{a}</li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-blue-400">
                    {ath.phone &&
                      <p className="flex items-center mb-1">
                        <i className="fas fa-phone-alt mr-2" /> {ath.phone}
                      </p>
                    }
                    {ath.email &&
                      <p className="flex items-center mb-1">
                        <i className="fas fa-envelope mr-2" /> {ath.email}
                      </p>
                    }
                    {ath.contact &&
                      <p className="flex items-center mb-1">
                        <i className="fab fa-linkedin mr-2" /> {ath.contact}
                      </p>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}