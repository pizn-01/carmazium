# Mobile TradeXchange — device test checklist

**Status:** everything below was verified by reading code against the backend and web only.
Nothing has been run on a device. Tick a row only after seeing it work on the APK.

**Before building on `C:\ca\carmazium\`:** `git pull`, then `npm ci` (both
`@react-native-community/netinfo` 11.4.1 and `expo-location` ~19.0.8 are declared in
`package.json` and the lockfile, but were not installed on the dev machine). `android/` is
gitignored — run `npx expo prebuild --clean --platform android` if the native config is stale.

Use two accounts: a **buyer/seller** and a **verified dealer**. Service providers need an
approved capability (admin approves on web) to see the provider screens.

## 1. Discoverability
| # | Step | Expect |
|---|---|---|
| 1.1 | Open Home | "TradeXchange" chip (2nd in the chip row) and a TradeXchange row at the bottom of the utility list |
| 1.2 | Tap either | Services hub opens |
| 1.3 | Hamburger → Services | Same hub |
| 1.4 | Repeat 1.1–1.3 as buyer **and** dealer | Visible to both (web shows TradeXchange to every account) |

## 2. Services hub
| # | Step | Expect |
|---|---|---|
| 2.1 | Count the service cards | Exactly four: Delivery & Recovery, Vehicle Inspection, Vehicle Finance, Warranty (no Maintenance / Insurance) |
| 2.2 | Tap each card | Delivery/Inspection → job form; Finance/Warranty → enquiry form |
| 2.3 | `GET /services/settings` returns an `availability` map | A service set `false` shows greyed, non-tappable, "Temporarily not accepting new requests" |
| 2.4 | "My service jobs", "My enquiries", "Provide services" cards | Open the jobs list, enquiries list, Partner dashboard |

## 3. Post a job — `POST /services/jobs`
| # | Step | Expect |
|---|---|---|
| 3.1 | Delivery, leave title blank, submit | Error: job title needed. No request sent |
| 3.2 | Delivery, one postcode missing | Error: both postcodes needed |
| 3.3 | Delivery, vehicle with no reg and no make+model | Error |
| 3.4 | Date `2020-01-01` / `tomorrow` / `2026-13-45` | Error (must be real `YYYY-MM-DD`, today or later). Blank = ASAP |
| 3.5 | Valid delivery, 2 vehicles, Recovery on | 201, lands on the job detail (`CustomerServiceJobDetail`), job is `OPEN` |
| 3.6 | Valid inspection (postcode + reg) | 201, lands on job detail; vehicle notes = the "what to check" text |
| 3.7 | Back from the job | Does **not** return to the filled form (screen was replaced) |
| 3.8 | Add 12 vehicles | "Add another vehicle" disappears at 12 |
| 3.9 | Kill switch on for the service | Error message from the backend shown in the form |

## 4. Finance / warranty enquiry — `POST /services/leads`
| # | Step | Expect |
|---|---|---|
| 4.1 | Submit without consent | Error: confirm provider contact |
| 4.2 | Finance: no postcode / no value / no employment / neither budget nor income | Each gives its own error |
| 4.3 | Valid finance enquiry | 201, lands on enquiry detail with status OPEN |
| 4.4 | Valid warranty enquiry | 201; no finance fields in the payload |
| 4.5 | Enquiries list (`GET /services/leads/my`) | New enquiry appears; pull-to-refresh works |
| 4.6 | Enquiry detail | "No provider replied yet" or provider responses with price/APR/term |
| 4.7 | Close enquiry (`POST /services/leads/:id/close`) | Confirm dialog; status becomes CLOSED, close button disappears |
| 4.8 | Open `carmazium://services/leads` and `/services/leads/<id>` | Open the list / the enquiry |

**Watch for** `property X should not exist` errors — the backend rejects unknown fields.

## 5. Delivery from a purchase — `POST /services/jobs/from-purchase`
| # | Step | Expect |
|---|---|---|
| 5.1 | Buyer offers → an **Accepted** offer | "Get delivery quotes" button below Message Seller / Cancel Sale |
| 5.2 | Pending / rejected offer | No button |
| 5.3 | Tap, leave postcode blank | "Enter the delivery postcode" |
| 5.4 | Tap, valid postcode | Job created with pickup = seller postcode and the listing vehicle prefilled; opens job detail |
| 5.5 | Won auction → auction detail as the winner | Button shown; hidden after a refused purchase |
| 5.6 | Pay the £125 buyer fee | Confirmation screen shows the button too |
| 5.7 | Press it twice for the same purchase | Backend's answer (existing job or a clear error) is shown in the sheet |

## 6. Customer job lifecycle
| # | Step | Expect |
|---|---|---|
| 6.1 | Provider quotes → customer accepts | Stripe Checkout opens in the browser; return and refresh shows `PAID` |
| 6.2 | Provider completes → customer sees CONFIRM SERVICE | Dispute reason box visible above RAISE DISPUTE |
| 6.3 | Raise dispute with a reason typed | `POST .../dispute` body includes `reason`; job becomes DISPUTED |
| 6.4 | Confirm completion → job `RELEASED` | REVIEW YOUR TRANSPORTER/INSPECTOR card appears (`canReview`) |
| 6.5 | Submit with no stars | Button disabled |
| 6.6 | Submit 4 stars + comment | Published review shown read-only; form gone |
| 6.7 | Submit a review that fails (e.g. offline) | Typed rating/comment **kept** |

## 7. Dealer navigation
| # | Step | Expect |
|---|---|---|
| 7.1 | Dealer drawer | New entries: My Auction Bids, Won Auctions, Messages, Sale Cancellations |
| 7.2 | Staff **without** `VIEW_TRADE` | No "My Auction Bids" |
| 7.3 | Staff **without** `VIEW_PURCHASES` | No "Won Auctions" |
| 7.4 | Drawer → Won Auctions (buyer and dealer) | Opens My Auctions **on the Won tab** |
| 7.5 | Won rows | Third line shows: Payment needed / Handover in progress / Handover complete / Purchase refused |
| 7.6 | Open My Auctions, switch to Live/All, then drawer → Won Auctions (twice in a row, switching tab between) | Switches to the Won tab each time (params carry a `_t` nonce) |

## 8. Provider side (unchanged code — first real run)
Partner dashboard → Service areas (apply) → Verification (document upload, multipart) →
Matching (postcode areas / lead criteria) → Jobs feed → quote → start → complete →
Leads inbox → respond. Record any screen that fails to open or any 4xx from
`/services/*`.

## Known limits (by design, not bugs)
- "On or after" date is typed text; there is no date picker.
- Verified-dealer-only rules apply to **bidding** (`VerifiedDealerGuard` on the auctions
  controller), not to the service pages — Services is open to every signed-in account.
