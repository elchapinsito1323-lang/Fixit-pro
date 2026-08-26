"use client";

import { useState } from "react";

const commonIssues = [
  { icon: "↯", title: "Car won’t start", text: "The engine does not turn over when I press start." },
  { icon: "!", title: "Warning light", text: "A warning light appeared on my dashboard." },
  { icon: "◉", title: "Strange noise", text: "I hear a new or unusual noise while driving." },
  { icon: "≈", title: "Overheating", text: "The temperature gauge is high and the engine may be overheating." },
];

const diagnosticRules = [
  {
    terms: ["overheat", "temperature", "steam", "coolant"],
    title: "Possible cooling-system issue",
    summary: "A low coolant level, coolant leak, stuck thermostat, or radiator fan fault may be causing the high temperature.",
    checks: ["Turn the engine off and let it cool completely.", "After cooling, check the coolant reservoir level.", "Look beneath the vehicle for fresh, colored fluid."],
    urgency: "critical",
  },
  {
    terms: ["won’t start", "does not turn", "click", "battery", "start"],
    title: "Battery or starting-system issue",
    summary: "A weak battery or loose terminal is the most common cause. The starter motor or charging system may also need testing.",
    checks: ["Check whether the interior and dashboard lights are dim.", "Inspect battery terminals for looseness or corrosion.", "Try a jump start only if you can do so safely."],
    urgency: "moderate",
  },
  {
    terms: ["brake", "grind", "squeal", "stopping"],
    title: "Possible brake-system issue",
    summary: "Worn pads, damaged rotors, or low brake fluid can affect stopping performance and should be inspected promptly.",
    checks: ["Do not continue driving if braking feels weak or uneven.", "Check for a red brake warning light.", "Arrange a professional brake inspection."],
    urgency: "critical",
  },
  {
    terms: ["light", "dashboard", "check engine", "warning"],
    title: "Dashboard warning needs a code scan",
    summary: "The warning light identifies a system that needs attention. An OBD-II scan can narrow down the specific fault.",
    checks: ["Note the light color and whether it is flashing.", "Check the fuel cap is fully tightened.", "Have the diagnostic trouble code scanned."],
    urgency: "moderate",
  },
];

const maintenanceItems = [
  ["Oil & filter", "Every 5,000–7,500 miles"],
  ["Tire pressure", "Check monthly"],
  ["Brake inspection", "Every 12 months"],
  ["Coolant level", "Check every 3 months"],
];

export default function Home() {
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState([]);

  function analyzeIssue() {
    const input = issue.toLowerCase();
    const match = diagnosticRules.find((rule) => rule.terms.some((term) => input.includes(term)));
    setResult(match || {
      title: "A technician should inspect this symptom",
      summary: "The description does not point to one clear system yet. Record when it happens, any lights you see, and whether performance changes.",
      checks: ["Note when the symptom occurs.", "Check the dashboard for warning lights.", "Avoid driving if the vehicle feels unsafe."],
      urgency: "moderate",
    });
    setTimeout(() => document.getElementById("diagnosis")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><span>F</span> Fixit Pro</div>
        <div className="status"><i /> Assistant online</div>
      </header>
      <section className="hero">
        <p className="eyebrow">Vehicle repair assistant</p>
        <h1>Understand what your car is telling you.</h1>
        <p className="lede">Describe the symptoms and get a clear, safety-first diagnostic suggestion in seconds.</p>
      </section>
      <section className="workspace">
        <div className="card diagnostic-card">
          <div className="step"><span>01</span><div><h2>Tell us about your vehicle</h2><p>Start with the basics, then describe what you notice.</p></div></div>
          <div className="vehicle-grid">
            <label>Year<select defaultValue="2021"><option>2021</option><option>2020</option><option>2019</option></select></label>
            <label>Make<select defaultValue="Toyota"><option>Toyota</option><option>Honda</option><option>Ford</option></select></label>
            <label>Model<input defaultValue="Camry" /></label>
          </div>
          <label className="problem-label">What’s happening?
            <textarea value={issue} onChange={(event) => setIssue(event.target.value)} placeholder="Example: My car makes a clicking sound when I turn the key..." />
          </label>
          <button className="primary" type="button" onClick={analyzeIssue} disabled={!issue.trim()}>Analyze my issue <b>→</b></button>
        </div>
        <aside className="side-card">
          <p className="eyebrow">Quick start</p>
          <h2>Common issues</h2>
          <p>Choose a symptom to fill in the details.</p>
          <div className="quick-list">
            {commonIssues.map(({ icon, title, text }) => <button key={title} onClick={() => { setIssue(text); setResult(null); }}><span>{icon}</span><div><strong>{title}</strong><small>{text}</small></div><b>›</b></button>)}
          </div>
        </aside>
      </section>
      {result && <section className="result-wrap" id="diagnosis">
        <div className="result-heading"><div><p className="eyebrow">Diagnostic suggestion</p><h2>{result.title}</h2></div><span className={`urgency ${result.urgency}`}>{result.urgency === "critical" ? "Stop & check" : "Service soon"}</span></div>
        <p className="result-summary">{result.summary}</p>
        <div className="result-grid">
          <div className="next-steps"><h3>What to check next</h3>{result.checks.map((check, index) => <div key={check}><span>{index + 1}</span><p>{check}</p></div>)}</div>
          <div className="safety"><span className="safety-icon">!</span><div><h3>Safety first</h3><p>{result.urgency === "critical" ? "Stop in a safe place, switch off the engine, and do not continue driving until the vehicle is checked." : "If a warning light flashes, you smell fuel, see smoke, or the vehicle becomes hard to control, pull over safely and call for roadside assistance."}</p></div></div>
        </div>
        <p className="disclaimer">Fixit Pro provides general guidance, not a confirmed mechanical diagnosis. When in doubt, consult a qualified technician.</p>
      </section>}
      <section className="maintenance">
        <div className="maintenance-copy"><p className="eyebrow">Stay road-ready</p><h2>A little maintenance prevents a lot of repairs.</h2><p>Use this quick checklist to keep the essentials on your radar.</p></div>
        <div className="checklist">{maintenanceItems.map(([title, cadence], index) => <label key={title} className={checked.includes(index) ? "done" : ""}><input type="checkbox" checked={checked.includes(index)} onChange={() => setChecked((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index])}/><span className="fake-check">✓</span><span><strong>{title}</strong><small>{cadence}</small></span></label>)}</div>
      </section>
      <footer><div className="brand"><span>F</span> Fixit Pro</div><p>Clear guidance for the road ahead.</p></footer>
    </main>
  );
}
