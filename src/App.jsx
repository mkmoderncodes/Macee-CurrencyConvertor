import { useState, useEffect } from "react";

// Approximate rates relative to USD (updated Dec 2024)
const RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.89,
  CNY: 7.24,
  INR: 83.8,
  MXN: 17.2,
  BRL: 4.97,
  KRW: 1325,
  SGD: 1.34,
  HKD: 7.83,
  NOK: 10.57,
  SEK: 10.43,
  DKK: 6.89,
  NZD: 1.63,
  ZAR: 18.63,
  AED: 3.67,
};
const FLAGS = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
  CHF: "🇨🇭",
  CNY: "🇨🇳",
  INR: "🇮🇳",
  MXN: "🇲🇽",
  BRL: "🇧🇷",
  KRW: "🇰🇷",
  SGD: "🇸🇬",
  HKD: "🇭🇰",
  NOK: "🇳🇴",
  SEK: "🇸🇪",
  DKK: "🇩🇰",
  NZD: "🇳🇿",
  ZAR: "🇿🇦",
  AED: "🇦🇪",
};
const NAMES = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  INR: "Indian Rupee",
  MXN: "Mexican Peso",
  BRL: "Brazilian Real",
  KRW: "South Korean Won",
  SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar",
  NOK: "Norwegian Krone",
  SEK: "Swedish Krona",
  DKK: "Danish Krone",
  NZD: "New Zealand Dollar",
  ZAR: "South African Rand",
  AED: "UAE Dirham",
};

const convert = (amount, from, to) => {
  const usd = amount / RATES[from];
  return usd * RATES[to];
};

const fmt = (n, currency) => {
  const decimals = ["JPY", "KRW"].includes(currency) ? 0 : 2;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(n);
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [history, setHistory] = useState([]);
  const [favorites] = useState(["EUR", "GBP", "JPY", "CAD", "AUD", "CHF"]);
  const [search, setSearch] = useState("");

  const result =
    parseFloat(amount) > 0 ? convert(parseFloat(amount), from, to) : 0;
  const rate = convert(1, from, to);

  const swap = () => {
    const t = from;
    setFrom(to);
    setTo(t);
  };

  const addHistory = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setHistory((h) => [
      {
        from,
        to,
        amount: parseFloat(amount),
        result,
        rate,
        date: new Date().toLocaleTimeString(),
      },
      ...h.slice(0, 4),
    ]);
  };

  // Simulated mini sparkline for rate variation
  const sparkData = Array.from(
    { length: 14 },
    (_, i) => rate * (1 + Math.sin(i * 0.8 + from.charCodeAt(0)) * 0.03),
  );

  const filtered = Object.keys(RATES).filter(
    (c) =>
      c.toLowerCase().includes(search.toLowerCase()) ||
      NAMES[c].toLowerCase().includes(search.toLowerCase()),
  );

  const CurrencySelect = ({ value, onChange, label }) => (
    <div style={{ flex: 1 }}>
      <div
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 28 }}>{FLAGS[value]}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            flex: 1,
          }}
        >
          {Object.keys(RATES).map((c) => (
            <option key={c} value={c} style={{ background: "#1a1a2e" }}>
              {c} — {NAMES[c]}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 12,
          marginTop: 6,
          paddingLeft: 4,
        }}
      >
        {NAMES[value]}
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap'); *{box-sizing:border-box;} select:focus,input:focus{outline:none;} option{background:#1a1a2e;}`}</style>

      <div style={{ width: "100%", maxWidth: 520 }}>
        <h1
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 26,
            fontWeight: 800,
            marginBottom: 6,
          }}
        >
          💱 Currency Converter
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.3)",
            fontSize: 13,
            marginBottom: 28,
          }}
        >
          Indicative rates · Updated Dec 2024
        </p>

        <div
          style={{
            background: "#12121E",
            borderRadius: 24,
            padding: 24,
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 16,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Amount input */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Amount
            </div>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              min="0"
              placeholder="Enter amount"
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: -0.5,
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* From / To */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <CurrencySelect value={from} onChange={setFrom} label="From" />
            <button
              onClick={swap}
              style={{
                marginTop: 28,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(99,102,241,0.4)",
                color: "#818CF8",
                fontSize: 18,
                cursor: "pointer",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "rotate(180deg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "rotate(0deg)")
              }
            >
              ⇄
            </button>
            <CurrencySelect value={to} onChange={setTo} label="To" />
          </div>

          {/* Result */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
              borderRadius: 16,
              padding: "20px 24px",
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              {amount || "1"} {FLAGS[from]} {from} =
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              {FLAGS[to]} {fmt(result, to)}{" "}
              <span style={{ fontSize: 20, opacity: 0.7 }}>{to}</span>
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 12,
                marginTop: 8,
              }}
            >
              1 {from} = {fmt(rate, to)} {to} · 1 {to} = {fmt(1 / rate, from)}{" "}
              {from}
            </div>
          </div>

          <button
            onClick={addHistory}
            style={{
              width: "100%",
              marginTop: 14,
              padding: "12px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Save to history
          </button>
        </div>

        {/* Quick compare grid */}
        <div
          style={{
            background: "#12121E",
            borderRadius: 20,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              margin: "0 0 14px",
            }}
          >
            Quick Compare — 1 {from}
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            {favorites
              .filter((c) => c !== from)
              .map((c) => (
                <button
                  key={c}
                  onClick={() => setTo(c)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: 10,
                    background:
                      to === c
                        ? "rgba(99,102,241,0.15)"
                        : "rgba(255,255,255,0.04)",
                    border: `1px solid ${to === c ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)"}`,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 14 }}>
                    {FLAGS[c]}{" "}
                    <span
                      style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}
                    >
                      {c}
                    </span>
                  </span>
                  <span
                    style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}
                  >
                    {fmt(convert(1, from, c), c)}
                  </span>
                </button>
              ))}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div
            style={{
              background: "#12121E",
              borderRadius: 20,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                margin: "0 0 14px",
              }}
            >
              History
            </h3>
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom:
                    i < history.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                  fontSize: 13,
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  {FLAGS[h.from]} {fmt(h.amount, h.from)} {h.from}
                </span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                  →
                </span>
                <span style={{ color: "#fff", fontWeight: 600 }}>
                  {FLAGS[h.to]} {fmt(h.result, h.to)} {h.to}
                </span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>
                  {h.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
