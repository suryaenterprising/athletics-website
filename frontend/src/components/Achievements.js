import React from "react";

const ACHIEVEMENTS = [
  {
    icon: "fas fa-trophy",
    title: "Inter IIT",
    desc: "Our proud achievements at the prestigious Inter-IIT Sports Meet",
    items: [
      "Gold in 4x100m Relay (2023)",
      "Silver in Long Jump (2023)",
      "Bronze in 100m Dash (2022)",
      "Overall 7th Position (2023)"
    ],
    gradient: "from-blue-600 to-blue-800"
  },
  {
    icon: "fas fa-flag",
    title: "National Level",
    desc: "Representing IIT Indore at national championships",
    items: [
      "3 athletes selected for All India University Games",
      "2nd place in National Inter-Engineering Meet",
      "5 athletes in top 10 at National Athletics Championship"
    ],
    gradient: "from-red-600 to-red-800"
  },
  {
    icon: "fas fa-medal",
    title: "Institute Records",
    desc: "Records set by our athletes in various events",
    items: [
      "100m Dash: 10.8s (Rohan Sharma, 2023)",
      "Long Jump: 7.2m (Amit Patel, 2022)",
      "Javelin Throw: 58.3m (Priya Singh, 2023)",
      "Marathon: 2h 48m (Vikram Joshi, 2021)"
    ],
    gradient: "from-green-600 to-green-800"
  },
  {
    icon: "fas fa-award",
    title: "Other Achievements",
    desc: "Notable accomplishments of our athletes",
    items: [
      "Best Athlete Award at Techfest IIT Bombay",
      "3 athletes awarded Sports Scholarship",
      "Hosted successful Inter-IIT Sports Workshop",
      "Community running initiative with 500+ participants"
    ],
    gradient: "from-purple-600 to-purple-800"
  }
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-900">
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ACHIEVEMENTS.map((ach, idx) => (
            <div key={idx} className="flip-card h-64">
              <div className="flip-card-inner h-full rounded-xl shadow-lg">
                {/* Front */}
                <div
                  className={`flip-card-front bg-gradient-to-br ${ach.gradient} rounded-xl p-6 flex flex-col justify-center items-center text-white`}
                >
                  <i className={`${ach.icon} text-4xl mb-4`} />
                  <h3 className="text-2xl font-bold mb-2">{ach.title}</h3>
                  <p className="text-center">{ach.desc}</p>
                </div>
                {/* Back */}
                <div className="flip-card-back bg-white rounded-xl p-6 flex flex-col justify-center">
                  <ul className="list-disc pl-5 text-gray-700">
                    {ach.items.map((item, i) => (
                      <li key={i} className="mb-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
