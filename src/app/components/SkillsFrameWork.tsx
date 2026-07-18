import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { GraduationCap, TrendingUp, Target } from 'lucide-react'

const tiers = [
  {
    id: "fundamentals",
    label: "Fundamentals",
    level: 1,
    color: "#ed8416",
    icon: GraduationCap,
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
    color: "#c96d12",
    icon: TrendingUp,
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
    color: "#9d5710",
    icon: Target,
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
  const [hovered, setHovered] = useState<string | null>(null)
  const cardsGridRef = useRef<HTMLDivElement>(null)
  const [cardColumns, setCardColumns] = useState(3);

  useLayoutEffect(() => {
    const el = cardsGridRef.current;
    if (!el) return;
    const minCol = 260;
    const gap = 20;
    const maxCols = 3;
    const compute = () => {
      const w = el.getBoundingClientRect().width;
      const n = Math.max(1, Math.min(maxCols, Math.floor((w + gap) / (minCol + gap))));
      setCardColumns((prev) => (prev === n ? prev : n));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleTierLeave = (e: MouseEvent, tierId: string) => {
    const next = e.relatedTarget;
    if (next instanceof Element && next.closest(`[data-tier="${tierId}"]`)) return;
    setHovered(null);
  };

  return (
    <section style={{
      padding: "80px 24px",
      boxSizing: "border-box",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ color: "#ed8416", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 10px" }}>
          Upskilling Pathways
        </p>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, margin: "0 0 10px" }}>
          SE Skills Framework
        </h2>
        <p style={{ fontSize: "15px", color: "#4b5563", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
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
              <span style={{ fontSize: 11, fontWeight: 500, color: "#6b7280", whiteSpace: "nowrap", marginTop: 6 }}>{tier.label}</span>
            </div>
            {i < tiers.length - 1 && (
              <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${tier.color}, ${tiers[i + 1].color})`, margin: "0 8px", marginBottom: 18 }} />
            )}
          </div>
        ))}
      </div>

      {/* Cards — header segments share one grid row per band, audience-tag footers the next; guarantees one horizontal line for footer tops */}
      <div
        ref={cardsGridRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cardColumns}, minmax(0, 1fr))`,
          columnGap: 20,
          rowGap: 0,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {tiers.map((tier, i) => {
          const col = (i % cardColumns) + 1;
          const band = Math.floor(i / cardColumns);
          const rowMain = band * 2 + 1;
          const rowFoot = band * 2 + 2;
          const isHover = hovered === tier.id;
          const lift = isHover ? "translateY(-4px)" : "translateY(0)";
          const shadow = isHover ? "0 16px 40px rgba(0,0,0,0.13)" : "0 2px 12px rgba(0,0,0,0.06)";
          const Icon = tier.icon;
          return (
            <div key={tier.id} style={{ display: "contents" }}>
              <div
                data-tier={tier.id}
                onMouseEnter={() => setHovered(tier.id)}
                onMouseLeave={(e) => handleTierLeave(e, tier.id)}
                style={{
                  gridColumn: col,
                  gridRow: rowMain,
                  background: tier.color,
                  padding: "22px 20px 20px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "12px 12px 0 0",
                  border: "0.5px solid rgba(0,0,0,0.1)",
                  borderBottom: "none",
                  boxSizing: "border-box",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  transform: lift,
                  boxShadow: shadow,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color="#fff" strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1.2px", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.9)" }}>
                    Level {tier.level}
                  </span>
                </div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 18px" }}>{tier.label}</h3>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 10px" }}>Courses</p>
                {tier.courses.map((course, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: j < tier.courses.length - 1 ? "0.5px solid rgba(255,255,255,0.15)" : "none", fontSize: 14 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.6)", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ color: "#fff", fontWeight: course.linked ? 500 : 400, lineHeight: 1.4 }}>{course.title}</span>
                  </div>
                ))}
              </div>
              <div
                data-tier={tier.id}
                onMouseEnter={() => setHovered(tier.id)}
                onMouseLeave={(e) => handleTierLeave(e, tier.id)}
                style={{
                  gridColumn: col,
                  gridRow: rowFoot,
                  background: "#FFF7ED",
                  padding: "12px 20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  rowGap: 8,
                  alignItems: "center",
                  alignContent: "flex-start",
                  borderRadius: "0 0 12px 12px",
                  border: "0.5px solid rgba(0,0,0,0.1)",
                  borderTop: "none",
                  boxSizing: "border-box",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  transform: lift,
                  boxShadow: shadow,
                  marginBottom: i + cardColumns < tiers.length ? 20 : 0,
                }}
              >
                {tier.audience.map((a, j) => (
                  <span
                    key={j}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      lineHeight: 1.25,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "#fff",
                      border: `1px solid ${tier.color}33`,
                      color: tier.color,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}