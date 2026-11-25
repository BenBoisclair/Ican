# Inner pages — v1 (2026-11-25, pending client approval)

The copy is condensed from the 2019 site (`old-site/`) and the ICAN Alert brochure. The wording itself lives in `src/data/` (one file per page type), so this note lists what each page holds and where it came from.
English only: the site targets international firms in Thailand.

## Site map
| Page | URL | Source in the old site | Copy in |
| --- | --- | --- | --- |
| Network & IT Infrastructure | /solutions/network-it-infrastructure | IT Infrastructure page (network systems) | `src/data/solutions.ts` |
| Server Room & Cabling | /solutions/server-room-cabling | IT Infrastructure page (data center, cabling, power, fire) | `src/data/solutions.ts` |
| Software & Applications | /solutions/software-applications | Software & Application page (20 systems) | `src/data/solutions.ts` |
| IT Outsourcing | /solutions/it-outsourcing | Out Sources page | `src/data/solutions.ts` |
| ICAN Alert | /solutions/ican-alert | Services & Product page + English brochure (`BS-EN.jpg`) | `src/data/solutions.ts` |
| IT Security Assessment, Enterprise Wi-Fi, IT Consulting & Assessment | not built yet | nothing in the old site | waiting on `content/solution-briefs.md` |
| Portfolio: IT Infrastructure | /portfolio/it-infrastructure (also /portfolio) | 11 portfolio galleries | `src/data/portfolio.ts` |
| Portfolio: Software & Application | /portfolio/software | software portfolio | `src/data/portfolio.ts` |
| About | /about | About Us page | `src/data/about.ts` |
| Contact | /contact | Contact Us page | `src/data/contact.ts` |
| Social Responsibility | /social-responsibility | new: ICAN's Facebook company page and "Ican-group Ican" albums, 2016–2025 | `src/data/csr.ts` |

Removed on purpose: Join Us (jobs), For Employees (portal links), Shop link. They need constant updating.

## Every solution page
Breadcrumb · title · lead · three key facts · photo · **Get a quote** (opens the contact form with the solution picked) · content blocks · "Our work" (portfolio photos) · links to the other solutions · call-to-action band with the phones.
Infrastructure pages share **How we work**: Survey → Design (you approve a To-be Design) → Install and test (results in the delivery report) → Maintain (anywhere in Thailand).

## Portfolio
199 infrastructure photos and drawings in 11 categories, plus 22 software screenshots, resized from the old site. Category chips filter the page (and still work as jump links without JavaScript). Photos open full size in a viewer.
Left out: vendor stock product photos (Cisco phones, APC UPS, servers), near-duplicate drawings, and images under ~600 px.

## Social Responsibility
"Giving back, together". Two groups, newest first. Each card: a photo (more open in the viewer), month, title and one line.
- **Community and charity** (5): Mae Hong Son school equipment (Apr 2025) · laptops for remote-area education (May 2024) · Computers for Kids at Ban Phu Sawan (Mar 2024) and Ban Thung Kham (Jan 2022) · 16 computers and 2 notebooks for a school in Nan (Jun 2016)
- **Life at ICAN** (7): New Year parties 2017, 2018, 2020, 2023 · Pattaya trips 2019 and 2022 · last-working-day gifts (2019, 2020) · merit-making at the office (2018, 2019)
Photos are screen captures from Facebook (about 1,000–1,270 px wide; the 2019 Pattaya ones are smaller). Client names on office binders were cropped out.
Source: facebook.com/ican.co.th (public; ICAN gave permission to use its photos, keeping clients' faces out), plus two 2024–2025 posts from the company page. The footer and "Visit our Facebook page" both link to facebook.com/ican.co.th.

## Contact form
- **What can we help with?** Get a quote · Ask about a solution · Book a consultation · Get technical help · Something else
- **Which solution?** (only for the first two): the eight solutions + Other
- Name, Company (optional), Email, Phone (optional), Message
- Sends to websupport@ican.co.th (confirmed 2026-11-25). Until a Web3Forms key is added in `src/data/contact.ts`, "Send message" opens the visitor's email app with the message filled in.
- Side panel: phones, email, address with Google Maps and Area54 links, and a Chang ICAN box for home and office jobs. (The old company LINE @ican-group is no longer used.)

## To confirm with the client
- The old fax number (+66 2-272-3115) was left off.
- IT Outsourcing and ICAN Alert blurbs are new copy.
