#!/usr/bin/env python3
"""Generate public/apps/index.html from public/apps.json. Every app shows all 5 store badges;
live listings link, others sit in a muted slot with a 'בקרוב · Coming soon' tag (badge artwork unaltered)."""
import json, html, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
data = json.loads((root/'public/apps.json').read_text())
PLAT = [("appstore","appstore-he.svg","להורדה ב-App Store","iPhone · iPad"),
        ("macappstore","macappstore-he.svg","להורדה ב-Mac App Store","Mac"),
        ("play","play-he.png","קבלו ב-Google Play","Android"),
        ("galaxy","galaxy-he.png","זמין ב-Galaxy Store","Samsung Galaxy"),
        ("microsoft","ms-he.svg","קבלו מ-Microsoft","Windows")]
e = html.escape
def card(a):
    L = a.get('links', {})
    out = [f'<article class="card"><img class="icon" src="/apps/icons/{a["icon"]}" alt="{e(a["name"])}" width="96" height="96" loading="lazy"><h2>{e(a["name"])}</h2>']
    if a.get('name_en') and a['name_en'] != a['name']: out.append(f'<div class="en-name" dir="ltr">{e(a["name_en"])}</div>')
    out.append(f'<p>{e(a["he"])}</p><p class="en" dir="ltr">{e(a["en"])}</p><div class="badges">')
    for k, f, alt, plat in PLAT:
        img = f'<img class="b b-{k}" src="/apps/badges/{f}" alt="{alt}">'
        if L.get(k):
            out.append(f'<a class="slot live" href="{e(L[k])}" rel="noopener">{img}<span class="plat">{plat}</span></a>')
        else:
            out.append(f'<div class="slot soon" title="בקרוב · Coming soon"><span class="tag">בקרוב · Coming soon</span>{img}<span class="plat">{plat}</span></div>')
    out.append('</div>')
    if L.get('web'): out.append(f'<a class="web" href="{e(L["web"])}" rel="noopener">לאתר · Website</a>')
    out.append('</article>')
    return ''.join(out)
src = (root/'public/apps/index.html').read_text()
head, rest = src.split('<main>', 1)
_, tail = rest.split('</main>', 1)
css = '''.badges{margin-top:auto;padding-top:14px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:stretch;--h:56px}
.slot{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:5px;padding:8px;border-radius:14px;text-decoration:none;color:inherit}
.slot.soon{background:rgba(0,0,0,.28);border:1px dashed #4d3c63;cursor:default}
.slot .tag{font-size:11px;font-weight:700;color:#1b1225;background:#c9b6e4;border-radius:999px;padding:2px 9px}
.slot .plat{font-size:11px;color:#ab9cbb}
.b{height:var(--h);width:auto;display:block}.b-play{height:calc(var(--h)*1.488);margin:calc(var(--h)*-.244)}
.b-galaxy,.b-microsoft{height:calc(var(--h)*1.02)}
@media(max-width:600px){.badges{--h:48px}main{grid-template-columns:1fr}}'''
import re
head = re.sub(r'\.badges\{.*?\.badge\.soon span\{[^}]*\}', lambda m: css, head, flags=re.S)
(root/'public/apps/index.html').write_text(head + '<main>\n' + '\n'.join(card(a) for a in data['apps']) + '\n</main>' + tail)
