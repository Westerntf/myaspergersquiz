import React, { useState } from "react";

const categories = [
  {
    label: "Quiz",
    links: [
      { href: "/", text: "Home" },
      { href: "/quiz", text: "Take the Quiz" },
      { href: "/results", text: "Results" },
      { href: "/full-report", text: "Full Report" },
      { href: "/review", text: "Review" },
    ],
  },
  {
    label: "Resources",
    links: [
      { href: "/resources", text: "Resources" },
      { href: "/contact", text: "Contact" },
    ],
  },
  {
    label: "Legal",
    links: [
      { href: "/privacy", text: "Privacy" },
      { href: "/terms", text: "Terms" },
    ],
  },
];

export default function CategoryAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="category-accordion">
      {categories.map((cat, idx) => (
        <div className="accordion-item" key={cat.label}>
          <button
            className={`accordion-header${openIndex === idx ? " open" : ""}`}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span>{cat.label}</span>
            <span className="chevron">{openIndex === idx ? "▲" : "▼"}</span>
          </button>
          <div
            className={`accordion-content${openIndex === idx ? " open" : ""}`}
            style={{ maxHeight: openIndex === idx ? 200 : 0 }}
          >
            {cat.links.map((link) => (
              <a href={link.href} key={link.href} className="accordion-link">
                {link.text}
              </a>
            ))}
          </div>
        </div>
      ))}
      <style jsx>{`
        .category-accordion {
          max-width: 800px;
          margin: 2rem auto;
          border-radius: 18px;
          background:rgba(247, 251, 253, 0.29);
          box-shadow: 0 4px 24px rgba(49,117,138,0.10);
          border: 1.5px solidrgba(178, 214, 230, 0.24);
          overflow: hidden;
        }
        .accordion-item + .accordion-item {
          border-top: 1px solid #eaf4fa;
        }
        .accordion-header {
            width: 100%;
          background: none;
          border: none;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 800;
          font-size: 1.18rem;
          color: #23687a;
          padding: 1.1rem 1.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .accordion-header.open {
          background: #eaf4fa;
        }
        .chevron {
          font-size: 1.1rem;
          margin-left: 1rem;
        }
        .accordion-content {
          background: #f7fbfd;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          padding: 0 1.5rem;
        }
        .accordion-content.open {
          padding: 0.7rem 1.5rem 1.1rem 1.5rem;
        }
        .accordion-link {
          color: #2a7b8c;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.08rem;
          margin: 0.3rem 0;
          border-radius: 6px;
          padding: 0.4rem 0.7rem;
          transition: background 0.15s, color 0.15s;
        }
        .accordion-link:hover {
          background: #eaf4fa;
          color: #23687a;
        }
        @media (max-width: 600px) {
          .category-accordion {
            max-width: 98vw;
            margin: 1rem auto;
          }
          .accordion-header, .accordion-content, .accordion-content.open {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
