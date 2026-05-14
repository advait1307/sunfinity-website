import { useState } from "react";

const tiers = [
  {
    id: "fundamentals",
    label: "Fundamentals",
    level: 1,
    color: "#E07B00",
    icon: "🧎",
    audience: ["First time SE", "CSM", "Freshers", "Partners"],
    courses: [
      { title: "Business Value Discovery", linked: true },
      { title: "The Role of a Modern SE", linked: false },
      { title: "Infra Basics", linked: false },
    ],
  },
  {
    id: "applied",
    label: "Applied Skills",
    level: 2,
    color: "#C96A00",
    icon: "🚶",
    audience: ["Experienced SE's", "SE Managers", "Inside teams", "Partners"],
    courses: [
      { title: "Powering Up The Presentation", linked: true },
      { title: "White Boarding", linked: true },
      { title: "Objection Handling", linked: true },
      { title: "Giving a Memorable Demo", linked: true },
      { title: "Webcast Best Practices", linked: true },
    ],
  },
  {
    id: "advanced",
    label: "Advanced Skills",
    level: 3,
    color: "#B05500",
    icon: "🏃",
    audience: ["Enterprise SE", "CSM", "SE Managers"],
    courses: [
      { title: "Trusted Advisor Sales Engineer", linked: true },
      { title: "Executive Connection", linked: true },
      { title: "Story Telling", linked: true },
      { title: "Negotiations And the SE", linked: true },
      { title: "Critical Thinking", linked: false },
      { title: "Large Deal Management", linked: false },
      { title: "Domain Skills", linked: false },
    ],
  },
];

export default function SESkillsFramework() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      padding: "60px 24px",
      boxSizing: "border-box",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ color: "#E07B00", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 10px" }}>
          Upskilling Pathways
        </p>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, margin: "0 0 10px" }}>
          SE Skills Framework
        </h2>
        <p style={{ fontSize: "15px", color: "#666", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
          A structured journey from foundational knowledge to enterprise-level expertise.
        </p>
      </div>

      {/* Stepper */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "500px", margin: "0 auto 40px" }}>
        {tiers.map((tier, i) => (
          <div key={tier.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: tier.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#fff" }}>
                {tier.level}
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#888", whiteSpace: "nowrap", marginTop: 6 }}>{tier.label}</span>
            </div>
            {i < tiers.length - 1 && (
              <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${tier.color}, ${tiers[i + 1].color})`, margin: "0 8px", marginBottom: 18 }} />
            )}
          </div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {tiers.map((tier) => (
          <div
            key={tier.id}
            onMouseEnter={() => setHovered(tier.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: "0.5px solid rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              transform: hovered === tier.id ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hovered === tier.id ? "0 16px 40px rgba(0,0,0,0.13)" : "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            {/* Card body — all orange */}
            <div style={{ background: tier.color, padding: "22px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "8px 10px", fontSize: 22, lineHeight: 1 }}>
                  {tier.icon}
                </div>
                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1.2px", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.9)" }}>
                  Level {tier.level}
                </span>
              </div>
              <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 18px" }}>{tier.label}</h3>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 10px" }}>Courses</p>
              {tier.courses.map((course, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < tier.courses.length - 1 ? "0.5px solid rgba(255,255,255,0.15)" : "none", fontSize: 14 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.6)", flexShrink: 0, marginTop: 6 }} />
                  <span style={{ color: "#fff", fontWeight: course.linked ? 500 : 400, lineHeight: 1.4 }}>{course.title}</span>
                </div>
              ))}
            </div>

            {/* Footer — yellow audience tags */}
            <div style={{ background: "#F5A623", padding: "12px 20px", display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              {tier.audience.map((a, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: "rgba(0,0,0,0.1)", color: "#3A1E00", whiteSpace: "nowrap" }}>{a}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}