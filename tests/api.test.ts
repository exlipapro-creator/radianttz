import { describe, it, expect, beforeAll, afterAll } from "vitest";

const BASE_URL = process.env.DROIDBOT_TEST_URL || "http://localhost:3000";

describe("GET /", () => {
  it("returns 200 and renders Radiant content", async () => {
    const res = await fetch(`${BASE_URL}/`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toMatch(/Radiant/i);
    expect(html).toMatch(/data-testid="navbar"/);
    expect(html).toMatch(/data-testid="hero"/);
  });
});

describe("GET /does-not-exist", () => {
  it("returns 404, not 500", async () => {
    const res = await fetch(`${BASE_URL}/does-not-exist`);
    expect(res.status).toBe(404);
    expect(res.status).not.toBe(500);
  });
});

describe("GET /api/inquiry", () => {
  it("returns 405 method not allowed", async () => {
    const res = await fetch(`${BASE_URL}/api/inquiry`, { method: "GET" });
    expect(res.status).toBe(405);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });
});

describe("POST /api/inquiry — happy path", () => {
  it("returns 200 ok:true with valid data (no-op when SMTP unconfigured)", async () => {
    const res = await fetch(`${BASE_URL}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test User",
        company: "Test Corp",
        email: "test@example.com",
        phone: "+255700000000",
        service: "freight",
        message: "I would like a quote for sea freight.",
        website: "",
      }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

describe("POST /api/inquiry — validation errors", () => {
  it("returns 400 with field errors for empty body", async () => {
    const res = await fetch(`${BASE_URL}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors).toBeDefined();
    expect(body.errors.fullName).toBeTruthy();
    expect(body.errors.email).toBeTruthy();
  });

  it("returns 400 with email error for invalid email", async () => {
    const res = await fetch(`${BASE_URL}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test User",
        email: "not-an-email",
        phone: "+255700000000",
        service: "cargo",
        message: "Hello",
        website: "",
      }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors.email).toBeTruthy();
  });

  it("returns 400 when message is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test User",
        email: "test@example.com",
        phone: "+255700000000",
        service: "zma",
        website: "",
      }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors.message).toBeTruthy();
  });

  it("returns 400 for invalid service value", async () => {
    const res = await fetch(`${BASE_URL}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test",
        email: "test@example.com",
        phone: "+255700",
        service: "invalid-service",
        message: "test",
        website: "",
      }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });
});

describe("POST /api/inquiry — honeypot", () => {
  it("returns 200 ok:true when honeypot is filled (silently dropped)", async () => {
    const res = await fetch(`${BASE_URL}/api/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Bot User",
        email: "bot@spam.com",
        phone: "+255700000000",
        service: "cargo",
        message: "Spam message",
        website: "http://spam.example.com", // honeypot filled
      }),
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

describe("POST /api/inquiry — all 5 service options", () => {
  const services = ["freight", "materials", "zma", "chandling", "cargo"];

  for (const service of services) {
    it(`accepts service: ${service}`, async () => {
      const res = await fetch(`${BASE_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Service Test",
          email: "servicetest@example.com",
          phone: "+255700000001",
          service,
          message: `Testing service ${service}`,
          website: "",
        }),
      });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
    });
  }
});
