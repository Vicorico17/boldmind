const viewTitles = {
  overview: "BoldMind Deal OS",
  dashboard: "Fund operating cockpit",
  nda: "NDA review assistant",
  portfolio: "Portfolio monitoring preview",
  modules: "Module map"
};

const modules = [
  {
    title: "Opportunity Pipeline",
    status: "core",
    why: "Tracks mock opportunities from initial discussion through closing using configurable stage gates.",
    now: "Core workflow."
  },
  {
    title: "Document Intake",
    status: "core",
    why: "Centralizes IMs, NDAs, Q&A files, financial packs, meeting notes, and board packs before AI workflows run.",
    now: "Core workflow."
  },
  {
    title: "AI Screening and IC Memo",
    status: "core",
    why: "Turns sample review workflows into structured, repeatable screening outputs and memo sections.",
    now: "Core workflow."
  },
  {
    title: "NDA Review Assistant",
    status: "core",
    why: "Captures sample rejected clauses and preferred redlines so future NDAs are reviewed faster and consistently.",
    now: "Core workflow."
  },
  {
    title: "CRM and Stakeholders",
    status: "phase",
    why: "Maps founders, advisors, lenders, co-investors, board members, and LP contacts to opportunities and portfolio companies.",
    now: "Planned module."
  },
  {
    title: "Financial Modeling",
    status: "phase",
    why: "Supports acquisition models, assumptions tracking, scenarios, and extraction of financial data into Excel-ready structures.",
    now: "Planned module."
  },
  {
    title: "Market and Buyer Research",
    status: "phase",
    why: "Structures sector mapping, comparable companies, transaction precedents, and exit buyer universe research.",
    now: "Planned module."
  },
  {
    title: "Knowledge Base and Prompt Library",
    status: "core",
    why: "Stores prompts, precedents, memos, redlines, approved commentary, and reusable research workflows.",
    now: "Shared platform layer."
  },
  {
    title: "Automation Manager",
    status: "phase",
    why: "Defines triggers such as stage changes, document uploads, KPI deadlines, and approval reminders.",
    now: "Activity feed preview."
  },
  {
    title: "AI Agent Manager",
    status: "future",
    why: "Governs specialized agents for screening, legal review, market research, portfolio variance, and reporting.",
    now: "Future module."
  },
  {
    title: "Meeting Notes and Summaries",
    status: "phase",
    why: "Links sample calls, advisor calls, board meetings, transcripts, decisions, and action items to the right object.",
    now: "Planned module."
  },
  {
    title: "Portfolio Monitoring and Reporting",
    status: "core",
    why: "Treats a closed opportunity as a long-lived portfolio company with KPI packs, variance flags, and commentary.",
    now: "Interactive preview screen."
  },
  {
    title: "Board and Governance",
    status: "phase",
    why: "Tracks board packs, minutes, reserved matters, compliance deadlines, and resolutions after closing.",
    now: "Planned module."
  },
  {
    title: "Valuation Tracking",
    status: "phase",
    why: "Maintains quarterly FMV snapshots, inputs, MOIC, IRR, and valuation bridge explanations.",
    now: "Planned module."
  },
  {
    title: "LP and Investor Reporting",
    status: "phase",
    why: "Auto-generates quarterly report drafts, per-portco commentary, fund metrics, and approval workflow.",
    now: "Planned module."
  },
  {
    title: "Document Management",
    status: "phase",
    why: "Provides version control, document types, linked entities, permissions, and export history.",
    now: "Planned module."
  },
  {
    title: "Communications Tracking",
    status: "future",
    why: "Logs emails, founder updates, advisor threads, LP distribution, and internal follow-ups against deals and portcos.",
    now: "Future module."
  },
  {
    title: "BI and KPI Dashboard",
    status: "phase",
    why: "Aggregates pipeline, fund pacing, sector exposure, opportunity conversion, and cross-portfolio operating KPIs.",
    now: "Dashboard preview."
  },
  {
    title: "Finance and Fund Ops",
    status: "future",
    why: "Supports capital calls, distributions, fund accounting reconciliation, invoices, and later waterfall calculations.",
    now: "Future module."
  },
  {
    title: "Permissions and Audit",
    status: "core",
    why: "Controls confidential financials, board materials, LP-visible data, external counsel access, and AI approval logs.",
    now: "Built into the product concept."
  }
];

const navButtons = document.querySelectorAll("[data-view]");
const viewTitle = document.getElementById("viewTitle");
const views = document.querySelectorAll(".view");

function showView(viewId) {
  views.forEach((view) => {
    view.classList.toggle("is-active", view.id === viewId);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewId);
  });

  if (viewTitle) {
    viewTitle.textContent = viewTitles[viewId] || "BoldMind Deal OS";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.viewTarget));
});

function addActivity(message) {
  const feed = document.getElementById("activityFeed");
  if (!feed) return;

  const item = document.createElement("li");
  const time = document.createElement("span");
  const now = new Date();
  time.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  item.append(time, document.createTextNode(message));
  feed.prepend(item);
}

document.getElementById("runNdaBtn")?.addEventListener("click", () => {
  const status = document.getElementById("ndaStatus");
  const stack = document.getElementById("clauseStack");

  if (status) {
    status.textContent = "Reviewed";
    status.className = "badge success";
  }

  if (stack) {
    const summary = document.createElement("article");
    summary.className = "clause-item";
    summary.innerHTML = `
      <div>
        <span class="risk-label">Ready</span>
        <h5>Partner summary generated</h5>
      </div>
      <p>AI recommends accepting the NDA only after narrowing non-solicit, adding a confidentiality sunset, and removing broad residual knowledge language.</p>
      <strong>Next step:</strong>
      <small>Send proposed edits to counsel, then store final fallback language as precedent for future NDAs.</small>
    `;
    stack.prepend(summary);
  }

  addActivity(" NDA review completed and proposed fallback language sent to approval queue.");
});

function renderModules() {
  const grid = document.getElementById("moduleGrid");
  if (!grid) return;

  grid.innerHTML = modules
    .map((module) => {
      const statusLabel = module.status === "core" ? "Core workflow" : module.status === "phase" ? "Phase 2" : "Future";
      const badgeClass = module.status === "core" ? "success" : module.status === "phase" ? "info" : "warning";
      return `
        <article class="module-card ${module.status}">
          <span class="badge ${badgeClass}">${statusLabel}</span>
          <h4>${module.title}</h4>
          <p>${module.why}</p>
          <small>${module.now}</small>
        </article>
      `;
    })
    .join("");
}

renderModules();
