# Company Remote Support (MeshCentral)

A self-hosted, "build your own" version of the kind of link-based remote-access
service you were looking at. It lets your IT/helpdesk **see and control a
company device's screen from a browser**, transfer files, and run sessions —
with a **consent prompt and an on-screen banner** so the employee always knows
when a session is active.

This is built on [MeshCentral](https://meshcentral.com) — open source, runs on
your own server (e.g. your AWS box), no third-party SaaS.

> ⚠️ **Use only on company-owned devices with staff informed.** Keep consent
> prompts ON (step 5) and make remote support part of a written IT policy.
> Secretly controlling someone's computer is unauthorized access and is illegal
> in most places — this setup is intentionally configured to be visible.

---

## How it compares to a browser-only approach

| | Browser-only (WebRTC) | MeshCentral (this) |
|---|---|---|
| Install anything? | No | Tiny agent on each device |
| See the screen | ✅ (if user shares) | ✅ |
| **Control the whole OS** (mouse/keyboard, any app) | ❌ browsers can't | ✅ |
| File transfer, terminal, reboot | ❌ | ✅ |
| Share a link to a session | limited | ✅ |
| Consent prompt + visible banner | you build it | ✅ built in |

Browsers are sandboxed, so a pure web page can only *view* a shared screen — it
can't drive the remote machine. Real remote control needs the small agent.

---

## Deploy (on your own server)

Prerequisites: a Linux server with Docker, a public IP, and ideally a domain
name pointed at it. Ports **443** and **80** open.

1. **Configure** — edit [`data/config.json`](data/config.json):
   - `cert` → your domain (or public IP).
   - `sessionKey` → a long random secret: `openssl rand -hex 32`.
   - (Recommended) uncomment the `letsencrypt` block and set your email + domain
     for a free trusted HTTPS certificate.

2. **Start it:**
   ```bash
   cd remote-support
   docker compose up -d
   docker compose logs -f          # watch it boot
   ```

3. **Open** `https://YOUR_DOMAIN` and create the **first account** — it
   automatically becomes the **administrator**. Then turn off open signups is
   already handled (`newAccounts: false`); create accounts for your IT staff
   from the *My Users* tab.

---

## Enroll company devices

4. In the web UI: **My Devices → Add Device Group** (e.g. "Workstations").
   Open the group → **Add Agent** → download the installer for Windows/macOS/
   Linux and run it on each company machine (push via your MDM/GPO for scale).
   The device shows up in the dashboard within seconds.

---

## ✅ Turn ON consent (do this — it's the whole point)

5. Open the **Device Group → Edit (pencil) → "User Consent"** and enable:
   - **Desktop: Prompt for user consent** — employee must click *Allow* before
     anyone can view/control.
   - **Show connection toolbar / privacy bar** — a visible banner appears on
     their screen for the whole session.
   - Optionally require consent for Terminal and File transfer too.

   You can also set a custom notification message so staff see exactly who is
   connecting and why.

Now an IT agent clicks a device → **Desktop**, the employee gets an *"IT
support wants to view your screen — Allow / Deny"* prompt, and a banner stays up
until the session ends.

---

## Sharing a session by link

From a device's **Desktop** view, use **"Sharing"** to generate a time-limited
link (optionally view-only) you can hand to another technician — the same
session-link idea as the service you saw, but self-hosted and consent-gated.

---

## Where things live

```
remote-support/
├── docker-compose.yml   # the service
├── data/
│   └── config.json      # your settings (edit cert + sessionKey)
├── user_files/          # created on first run
└── backups/             # created on first run
```

`data/` holds the database and TLS certs — **back it up**, don't commit secrets.

---

## Alternatives worth knowing

- **RustDesk** (self-hosted) — closest to TeamViewer/AnyDesk UX; great if you
  want a desktop client instead of a browser dashboard.
- **Apache Guacamole** — clientless RDP/VNC/SSH gateway in the browser; good when
  machines already run RDP/VNC and you don't want an agent.

Ask and I can scaffold either of these too, or build a browser-only WebRTC
screen-*viewing* demo if you specifically want the no-install, view-only flow.
