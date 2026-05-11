"use client";

import React, { useState } from "react";

export default function BredbandsjekkLanding() {
  const [step, setStep] = useState(1);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);

  const addressSuggestions = [
    "Karl Johans gate 1, 0154 Oslo",
    "Karl Johans gate 5, 0154 Oslo",
    "Karl Johans gate 12, 0154 Oslo",
    "Karl Johans gate 23, 0159 Oslo",
    "Karl Johans gate 31, 0159 Oslo",
    "Storgata 1, 0155 Oslo",
    "Storgata 10, 0184 Oslo",
    "Bogstadveien 1, 0355 Oslo",
    "Bogstadveien 23, 0355 Oslo",
    "Markveien 35, 0554 Oslo",
    "Thorvald Meyers gate 40, 0555 Oslo",
    "Dronning Eufemias gate 16, 0191 Oslo",
  ];

  const [form, setForm] = useState({
    address: "",
    name: "",
    phone: "",
    email: "",
    currentProvider: "",
    speed: "",
    connectionTypes: [],
    priorities: [],
    consent: false,
  });

  const filteredAddressSuggestions = addressSuggestions
    .filter((address) =>
      address.toLowerCase().includes(form.address.trim().toLowerCase())
    )
    .slice(0, 5);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleConnectionType = (value) => {
    setForm((prev) => {
      const alreadySelected = prev.connectionTypes.includes(value);

      return {
        ...prev,
        connectionTypes: alreadySelected
          ? prev.connectionTypes.filter((item) => item !== value)
          : [...prev.connectionTypes, value],
      };
    });
  };

  const togglePriority = (value) => {
    setForm((prev) => {
      const alreadySelected = prev.priorities.includes(value);

      return {
        ...prev,
        priorities: alreadySelected
          ? prev.priorities.filter((item) => item !== value)
          : [...prev.priorities, value],
      };
    });
  };

  const canGoNext = form.address.trim().length > 4;
  const canSubmit =
    form.name.trim().length > 1 &&
    form.phone.trim().length >= 8 &&
    form.address.trim().length > 4 &&
    form.consent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    console.log("Lead sendt inn:", form);
    setStep(3);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LogoMark />
              <span className="text-xl font-bold tracking-tight">Bredbåndsjekk.no</span>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-blue-50 ring-1 ring-white/15 md:flex">
              <Icon>✓</Icon> Gratis og uforpliktende sjekk
            </div>
          </nav>

          <div className="grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-blue-50 ring-1 ring-white/15">
                <Icon>★</Icon> Gratis sjekk av bredbåndsmuligheter
              </div>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Finn bedre bredbåndsmuligheter på adressen din
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-blue-100">
                Fyll inn adressen din, så sjekker vi hvilke bredbåndsmuligheter som kan være aktuelle der du bor. Helt gratis og uforpliktende.
              </p>

              <div className="mt-8 grid gap-3 text-sm text-blue-50 sm:grid-cols-3">
                <Benefit icon="✓" text="Gratis sjekk" />
                <Benefit icon="⏱" text="Personlig oppfølging" />
                <Benefit icon="🔒" text="Ingen binding" />
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl md:p-7">
                {step === 1 && (
                  <div>
                    <div className="mb-5">
                      <p className="text-sm font-semibold text-blue-700">Steg 1 av 2</p>
                      <h2 className="mt-1 text-2xl font-bold">Skriv inn adressen din</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Adressen hjelper oss å vurdere hvilke bredbåndsalternativer som kan være relevante der du bor.
                      </p>
                    </div>

                    <label className="text-sm font-semibold text-slate-800">Adresse</label>
                    <div className="relative mt-2">
                      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:bg-white">
                        <span className="text-slate-400">📍</span>
                        <input
                          value={form.address}
                          onChange={(e) => {
                            updateField("address", e.target.value);
                            setShowAddressSuggestions(true);
                          }}
                          onFocus={() => setShowAddressSuggestions(true)}
                          placeholder="F.eks. Karl Johans gate 1, Oslo"
                          autoComplete="street-address"
                          className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                        />
                      </div>

                      {showAddressSuggestions && form.address.trim().length >= 3 && filteredAddressSuggestions.length > 0 && (
                        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                          {filteredAddressSuggestions.map((address) => (
                            <button
                              key={address}
                              type="button"
                              onClick={() => {
                                updateField("address", address);
                                setShowAddressSuggestions(false);
                              }}
                              className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-blue-50"
                            >
                              <span className="mt-0.5 text-slate-400">📍</span>
                              <span>
                                <span className="block font-semibold text-slate-900">{address.split(",")[0]}</span>
                                <span className="block text-sm text-slate-500">{address.split(",").slice(1).join(",").trim()}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (canGoNext) {
                          setShowAddressSuggestions(false);
                          setStep(2);
                        }
                      }}
                      disabled={!canGoNext}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 font-bold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      Sjekk adressen <span>→</span>
                    </button>

                    <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm text-blue-900 ring-1 ring-blue-100">
                      <p className="font-semibold">Tips</p>
                      <p className="mt-1 leading-6 text-blue-800">
                        Begynn å skrive adressen din slik du vanligvis gjør i Google Maps for best resultat.
                      </p>
                    </div>

                    <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                      Dette er en uforpliktende forespørsel. Du blir ikke bundet til noe.
                    </p>
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <p className="text-sm font-semibold text-blue-700">Steg 2 av 2</p>
                      <h2 className="mt-1 text-2xl font-bold">Hvor kan vi kontakte deg?</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Legg igjen kontaktinfo, så følger vi opp med relevante bredbåndsalternativer dersom vi kan hjelpe deg.
                      </p>
                    </div>

                    <div className="grid gap-4">
                      <Field label="Navn" value={form.name} onChange={(v) => updateField("name", v)} placeholder="Ditt navn" />
                      <Field label="Telefon" value={form.phone} onChange={(v) => updateField("phone", v)} placeholder="Telefonnummer" type="tel" />
                      <Field label="E-post, valgfritt" value={form.email} onChange={(v) => updateField("email", v)} placeholder="din@email.no" type="email" />

                      <div>
                        <label className="text-sm font-semibold text-slate-800">Hva er du mest interessert i?</label>

                        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {[
                            { label: "Fiber", value: "Fiber", icon: "⚡" },
                            { label: "Bredbånd", value: "Bredbånd", icon: "📶" },
                            { label: "Trådløst", value: "Trådløst", icon: "📡" },
                            { label: "Usikker", value: "Usikker", icon: "🤔" },
                          ].map((type) => {
                            const active = form.connectionTypes.includes(type.value);

                            return (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => toggleConnectionType(type.value)}
                                className={`rounded-2xl border px-4 py-4 text-left transition ${
                                  active
                                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                                }`}
                              >
                                <div className="text-2xl">{type.icon}</div>
                                <div className="mt-2 font-bold text-slate-900">{type.label}</div>
                                <div className="mt-1 text-sm text-slate-500">
                                  {type.value === "Fiber" && "Høy hastighet og stabilitet"}
                                  {type.value === "Bredbånd" && "Vanlig internett til hjemmet"}
                                  {type.value === "Trådløst" && "Mobilt eller trådløst bredbånd"}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-slate-800">Hva er viktigst for deg?</label>

                        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {[
                            { label: "Lavest mulig pris", value: "Pris", icon: "💰" },
                            { label: "Høy hastighet", value: "Hastighet", icon: "⚡" },
                            { label: "Stabilitet", value: "Stabilitet", icon: "🛡️" },
                            { label: "Usikker / ønsker hjelp", value: "Hjelp", icon: "🤝" },
                          ].map((item) => {
                            const active = form.priorities.includes(item.value);

                            return (
                              <button
                                key={item.value}
                                type="button"
                                onClick={() => togglePriority(item.value)}
                                className={`rounded-2xl border px-4 py-4 text-left transition ${
                                  active
                                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                                }`}
                              >
                                <div className="text-2xl">{item.icon}</div>
                                <div className="mt-2 font-bold text-slate-900">{item.label}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-slate-800">Nåværende leverandør</label>
                        <select
                          value={form.currentProvider}
                          onChange={(e) => updateField("currentProvider", e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="">Velg, hvis du vet</option>
                          <option>Telenor</option>
                          <option>Altibox</option>
                          <option>Telia</option>
                          <option>GlobalConnect</option>
                          <option>NextGenTel</option>
                          <option>Annet / vet ikke</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-slate-800">Ønsket hastighet</label>
                        <select
                          value={form.speed}
                          onChange={(e) => updateField("speed", e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
                        >
                          <option value="">Velg hastighet</option>
                          <option>Under 100 Mbps</option>
                          <option>100–300 Mbps</option>
                          <option>300–700 Mbps</option>
                          <option>700+ Mbps</option>
                          <option>Usikker / ønsker anbefaling</option>
                        </select>
                      </div>

                      <label className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => updateField("consent", e.target.checked)}
                          className="mt-1 h-4 w-4"
                        />
                        <span>
                          Jeg samtykker til at Bredbåndsjekk kan kontakte meg på telefon, SMS eller e-post om bredbåndsmuligheter på min adresse.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 font-bold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      Få gratis bredbåndssjekk <span>→</span>
                    </button>

                    <button type="button" onClick={() => setStep(1)} className="mt-3 w-full text-sm font-semibold text-slate-500 hover:text-slate-800">
                      Tilbake
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="py-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
                      ✓
                    </div>
                    <h2 className="mt-5 text-2xl font-bold">Takk, forespørselen er registrert</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Vi går gjennom adressen din og tar kontakt dersom vi finner relevante alternativer. Dette er helt uforpliktende.
                    </p>
                    <button
                      onClick={() => {
                        setStep(1);
                        setForm({ address: "", name: "", phone: "", email: "", currentProvider: "", speed: "", connectionTypes: [], priorities: [], consent: false });
                      }}
                      className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white"
                    >
                      Sjekk en ny adresse
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <InfoCard icon="📍" title="1. Skriv inn adressen" text="Skriv inn adressen din slik at vi kan se hvilke muligheter som kan være relevante." />
          <InfoCard icon="📶" title="2. Vi sjekker alternativene" text="Vi ser på bredbåndsmuligheter som kan passe boligen og behovet ditt." />
          <InfoCard icon="☎" title="3. Du blir kontaktet" text="Du får en enkel og uforpliktende oppfølging med aktuelle valg." />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">Hvorfor sjekke?</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Det kan være store forskjeller fra adresse til adresse</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Hvilke leverandører og hastigheter som er tilgjengelige varierer mye fra bolig til bolig. Derfor kan en enkel sjekk gi deg bedre oversikt før du bestemmer deg.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SmallPoint text="Ingen betaling på nettsiden" />
            <SmallPoint text="Ingen binding ved innsending" />
            <SmallPoint text="Passer for fiber og bredbånd" />
            <SmallPoint text="Rask og enkel prosess" />
            <SmallPoint text="Du velger selv om du vil gå videre" />
            <SmallPoint text="Passer både eiere og leietakere" />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Bredbåndsjekk.no</p>
          <p>Personvern • Kontakt • Vilkår</p>
        </div>
      </footer>
    </main>
  );
}

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[1rem] bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 shadow-[0_10px_30px_rgba(37,99,235,0.35)] ring-1 ring-white/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_40%)]" />

      <svg
        viewBox="0 0 48 48"
        className="relative h-7 w-7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 25C14.5 21.8 19 20 24 20C29 20 33.5 21.8 37 25"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        <path
          d="M17 31C18.8 29.3 21.2 28.3 24 28.3C26.8 28.3 29.2 29.3 31 31"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        <circle cx="24" cy="36" r="2.8" fill="white" />

        <path
          d="M24 9V15"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        <path
          d="M17 13L24 17L31 13"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Icon({ children }) {
  return <span className="inline-flex h-5 w-5 items-center justify-center text-base leading-none">{children}</span>;
}

function Benefit({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
      <Icon>{icon}</Icon>
      <span>{text}</span>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-800">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
      />
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-700">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function SmallPoint({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">✓</span>
      <span className="font-semibold text-slate-700">{text}</span>
    </div>
  );
}
