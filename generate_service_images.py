import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs('public/assets/services', exist_ok=True)

# Brand Colors
NAVY_DEEP = (5, 32, 74)
NAVY_PRIMARY = (8, 43, 99)
NAVY_LIGHT = (13, 62, 141)
GOLD_MAIN = (255, 191, 0)
GOLD_BRIGHT = (255, 201, 40)
GOLD_LIGHT = (255, 235, 170)
WHITE = (255, 255, 255)
LIGHT_BLUE = (234, 243, 255)
SLATE_GRAY = (148, 163, 184)

WIDTH, HEIGHT = 1200, 800

def create_base_canvas(theme_accent_start, theme_accent_end, pattern_type="grid"):
    # Create smooth radial/linear gradient
    img = Image.new('RGB', (WIDTH, HEIGHT), NAVY_DEEP)
    draw = ImageDraw.Draw(img)
    
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(theme_accent_start[0] * (1 - ratio) + theme_accent_end[0] * ratio)
        g = int(theme_accent_start[1] * (1 - ratio) + theme_accent_end[1] * ratio)
        b = int(theme_accent_start[2] * (1 - ratio) + theme_accent_end[2] * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))
        
    # Draw geometric / architectural elements
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    
    # Elegant curved glowing arches (matching PlutoTax brand identity)
    for i in range(4):
        bbox = [-200 + i * 40, -100 + i * 20, WIDTH + 300 - i * 60, HEIGHT + 400 - i * 40]
        ov_draw.arc(bbox, start=190, end=350, fill=(255, 191, 0, 18 - i * 3), width=2 + i)
        
    # Subtle dot matrix or grid
    if pattern_type == "grid":
        grid_step = 40
        for x in range(0, WIDTH, grid_step):
            ov_draw.line([(x, 0), (x, HEIGHT)], fill=(255, 255, 255, 10), width=1)
        for y in range(0, HEIGHT, grid_step):
            ov_draw.line([(0, y), (WIDTH, y)], fill=(255, 255, 255, 10), width=1)
    elif pattern_type == "dots":
        for x in range(30, WIDTH, 30):
            for y in range(30, HEIGHT, 30):
                ov_draw.ellipse([x-1, y-1, x+1, y+1], fill=(255, 255, 255, 15))
                
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
    return img

def render_glass_card(draw, x0, y0, x1, y1, title, subtitle, icon_symbol, accent_color=GOLD_MAIN):
    # Outer glow
    draw.rounded_rectangle([x0-2, y0-2, x1+2, y1+2], radius=24, outline=(255, 191, 0, 70), width=2)
    # Card surface
    draw.rounded_rectangle([x0, y0, x1, y1], radius=22, fill=(10, 38, 85, 215), outline=(255, 255, 255, 60), width=1)
    # Header badge
    draw.rounded_rectangle([x0+40, y0+40, x0+120, y0+120], radius=16, fill=(255, 191, 0, 40), outline=accent_color, width=2)
    
    # Text placeholder / fallback font
    try:
        font_lg = ImageFont.truetype('arial.ttf', 38)
        font_md = ImageFont.truetype('arial.ttf', 24)
        font_sm = ImageFont.truetype('arial.ttf', 18)
    except:
        font_lg = font_md = font_sm = ImageFont.load_default()
        
    # Draw title
    draw.text((x0 + 145, y0 + 48), title, fill=WHITE, font=font_lg)
    draw.text((x0 + 145, y0 + 96), subtitle, fill=GOLD_MAIN, font=font_md)

# Services list with distinct visual themes and elements
services_data = [
    {
        "id": "tax-planning",
        "title": "Advance Tax Planning",
        "badge": "STRATEGIC ADVISORY",
        "color1": (7, 35, 78), "color2": (12, 54, 120),
        "accent": GOLD_MAIN,
        "detail": "Long-Term Wealth & Tax Shield Architecture",
        "chart_type": "wealth_growth",
        "metrics": [("Tax Alpha", "+34.2%"), ("Deductions", "$45.8K"), ("Audit Risk", "<0.01%")]
    },
    {
        "id": "federal-tax",
        "title": "Federal & Multi-State Tax",
        "badge": "FORM 1040 / 1040-NR",
        "color1": (5, 28, 65), "color2": (10, 48, 110),
        "accent": (56, 189, 248),
        "detail": "Resident, Non-Resident & Dual-Status Filing",
        "chart_type": "tax_forms",
        "metrics": [("States Covered", "50 States"), ("Filing Accuracy", "99.9%"), ("Avg. Refund", "$6,420")]
    },
    {
        "id": "fbar-fatca",
        "title": "FBAR & FATCA Compliance",
        "badge": "FinCEN 114 & FORM 8938",
        "color1": (8, 40, 88), "color2": (15, 65, 140),
        "accent": GOLD_BRIGHT,
        "detail": "Foreign Assets & International Accounts",
        "chart_type": "global_map",
        "metrics": [("IRS Disclosure", "Protected"), ("Threshold", "$10,000+"), ("Penalty Shield", "100%")]
    },
    {
        "id": "itin-processing",
        "title": "ITIN Processing Services",
        "badge": "CERTIFYING ACCEPTANCE AGENT",
        "color1": (6, 30, 70), "color2": (14, 58, 125),
        "accent": (234, 179, 8),
        "detail": "CAA Fast-Track Form W-7 Without Surrendering Passports",
        "chart_type": "itin_seal",
        "metrics": [("CAA Status", "Authorized"), ("Passport Safe", "In-Hand"), ("Approval Rate", "99.6%")]
    },
    {
        "id": "business-tax",
        "title": "Business Tax & Bookkeeping",
        "badge": "LLC • S-CORP • C-CORP",
        "color1": (7, 32, 75), "color2": (12, 52, 115),
        "accent": (52, 211, 153),
        "detail": "Corporate Returns, Payroll & Fractional CFO",
        "chart_type": "corporate_ledger",
        "metrics": [("Entity Types", "All Forms"), ("Quarterly Filings", "Auto"), ("Deduction Max", "100%")]
    },
    {
        "id": "nri-tax",
        "title": "Indian Cross-Border Tax",
        "badge": "US-INDIA DTAA TREATY",
        "color1": (9, 38, 86), "color2": (16, 62, 132),
        "accent": (251, 146, 60),
        "detail": "NRI Capital Gains, Property Sales & Foreign Tax Credits",
        "chart_type": "india_us_bridge",
        "metrics": [("DTAA Article 25", "Applied"), ("FTC Form 1116", "Maximized"), ("Repatriation", "Compliant")]
    },
    {
        "id": "tax-extension",
        "title": "Tax Extension Filing",
        "badge": "FORM 4868 & FORM 7004",
        "color1": (5, 25, 60), "color2": (11, 46, 105),
        "accent": (167, 139, 250),
        "detail": "Immediate IRS Extension & Penalty Shielding",
        "chart_type": "deadline_calendar",
        "metrics": [("Extension Granted", "+6 Months"), ("IRS Confirmation", "Instant"), ("Penalty Avoidance", "Active")]
    },
    {
        "id": "audit-assistance",
        "title": "Audit Assistance & IRS Defense",
        "badge": "CPA & ENROLLED REPRESENTATION",
        "color1": (8, 33, 76), "color2": (13, 50, 112),
        "accent": (248, 113, 113),
        "detail": "IRS Notice Response, CP2000 & Audit Resolution",
        "chart_type": "audit_shield",
        "metrics": [("Notice Handling", "Within 24h"), ("IRS Settlement", "Expert"), ("Direct Rep", "CPA/EA")]
    },
    {
        "id": "wealth-advisory",
        "title": "Wealth & Stock Advisory",
        "badge": "RSU • ESPP • CRYPTO • REAL ESTATE",
        "color1": (9, 42, 94), "color2": (17, 68, 145),
        "accent": GOLD_MAIN,
        "detail": "Executive Equity, Real Estate 1031 & Multi-Asset Planning",
        "chart_type": "wealth_portfolio",
        "metrics": [("Cap Gains Shield", "Active"), ("Crypto Reconciliation", "Precise"), ("Real Estate 1031", "Supported")]
    },
]

for svc in services_data:
    base = create_base_canvas(svc["color1"], svc["color2"], pattern_type="grid")
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    
    # Draw Glass Container
    d.rounded_rectangle([70, 70, WIDTH-70, HEIGHT-70], radius=28, fill=(8, 35, 78, 220), outline=(255, 255, 255, 50), width=1)
    d.rounded_rectangle([68, 68, WIDTH-68, HEIGHT-68], radius=30, outline=(255, 191, 0, 90), width=2)
    
    # Header Badge
    d.rounded_rectangle([110, 105, 460, 150], radius=10, fill=(255, 191, 0, 30), outline=svc["accent"], width=2)
    
    try:
        f_badge = ImageFont.truetype('arial.ttf', 20)
        f_title = ImageFont.truetype('arial.ttf', 44)
        f_desc = ImageFont.truetype('arial.ttf', 22)
        f_stat_val = ImageFont.truetype('arial.ttf', 34)
        f_stat_lbl = ImageFont.truetype('arial.ttf', 17)
        f_seal = ImageFont.truetype('arial.ttf', 16)
    except:
        f_badge = f_title = f_desc = f_stat_val = f_stat_lbl = f_seal = ImageFont.load_default()
        
    d.text((130, 116), svc["badge"], fill=svc["accent"], font=f_badge)
    d.text((110, 175), svc["title"], fill=WHITE, font=f_title)
    d.text((110, 235), svc["detail"], fill=LIGHT_BLUE, font=f_desc)
    
    # Golden divider
    d.line([(110, 280), (WIDTH - 110, 280)], fill=(255, 191, 0, 120), width=2)
    
    # Graphic / Chart visualization center-right
    cx, cy = 780, 480
    
    # Draw chart backdrop
    d.rounded_rectangle([cx - 280, cy - 160, cx + 280, cy + 180], radius=20, fill=(5, 24, 58, 220), outline=(255, 191, 0, 60), width=1)
    
    # Service-specific graphic elements
    if svc["chart_type"] == "wealth_growth":
        # Ascending financial curve with glowing nodes
        points = [(cx - 240, cy + 120), (cx - 160, cy + 70), (cx - 80, cy + 90), (cx, cy + 10), (cx + 100, cy - 40), (cx + 200, cy - 110)]
        for i in range(len(points)-1):
            d.line([points[i], points[i+1]], fill=GOLD_MAIN, width=4)
        for pt in points:
            d.ellipse([pt[0]-8, pt[1]-8, pt[0]+8, pt[1]+8], fill=GOLD_BRIGHT, outline=WHITE, width=2)
        d.text((cx - 230, cy - 130), "PORTFOLIO ALPHA TRAJECTORY", fill=GOLD_LIGHT, font=f_seal)
        
    elif svc["chart_type"] == "tax_forms":
        # 1040 Form graphics with checkmarks
        d.rounded_rectangle([cx - 220, cy - 120, cx - 20, cy + 140], radius=12, fill=(240, 245, 255, 240), outline=WHITE, width=2)
        d.rounded_rectangle([cx + 10, cy - 100, cx + 210, cy + 140], radius=12, fill=(220, 235, 255, 230), outline=(56, 189, 248), width=2)
        # Lines on the 1040 document
        for yl in range(cy - 90, cy + 110, 24):
            d.line([(cx - 200, yl), (cx - 40, yl)], fill=(8, 43, 99, 180), width=3)
            d.line([(cx + 30, yl), (cx + 190, yl)], fill=(13, 62, 141, 160), width=3)
        # Stamp
        d.ellipse([cx + 90, cy - 70, cx + 190, cy + 30], outline=(34, 197, 94), width=3)
        d.text((cx + 110, cy - 30), "FILED", fill=(34, 197, 94), font=f_badge)
        
    elif svc["chart_type"] == "global_map":
        # Global connection network with concentric orbits
        for r in [40, 90, 140]:
            d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 191, 0, 70), width=2)
        # Radial spokes
        for deg in [0, 45, 90, 135, 180, 225, 270, 315]:
            rad = math.radians(deg)
            x_end = cx + int(140 * math.cos(rad))
            y_end = cy + int(140 * math.sin(rad))
            d.line([(cx, cy), (x_end, y_end)], fill=(56, 189, 248, 120), width=2)
            d.ellipse([x_end-5, y_end-5, x_end+5, y_end+5], fill=GOLD_MAIN)
        d.text((cx - 100, cy - 130), "INTERNATIONAL COMPLIANCE MESH", fill=WHITE, font=f_seal)
        
    elif svc["chart_type"] == "itin_seal":
        # Official CAA Seal & Shield
        d.ellipse([cx - 110, cy - 110, cx + 110, cy + 110], fill=(7, 30, 68, 240), outline=GOLD_MAIN, width=4)
        d.ellipse([cx - 95, cy - 95, cx + 95, cy + 95], outline=(255, 255, 255, 90), width=2)
        # Star badge
        d.text((cx - 75, cy - 40), "IRS AUTHORIZED", fill=GOLD_LIGHT, font=f_seal)
        d.text((cx - 40, cy - 10), "CAA", fill=WHITE, font=f_title)
        d.text((cx - 65, cy + 45), "W-7 FAST-TRACK", fill=GOLD_MAIN, font=f_seal)
        
    elif svc["chart_type"] == "corporate_ledger":
        # Balance sheet bars & growth metric
        bars = [60, 110, 95, 150, 185, 230]
        for idx, bh in enumerate(bars):
            bx = cx - 210 + idx * 72
            by = cy + 140 - bh
            d.rounded_rectangle([bx, by, bx + 48, cy + 140], radius=8, fill=(52, 211, 153, 220), outline=WHITE, width=1)
        d.text((cx - 210, cy - 130), "CORPORATE FINANCIAL METRICS", fill=(52, 211, 153), font=f_seal)
        
    elif svc["chart_type"] == "india_us_bridge":
        # India & US bridge: Two pillars connected by golden arch
        d.rounded_rectangle([cx - 200, cy - 40, cx - 70, cy + 140], radius=12, fill=(251, 146, 60, 200), outline=WHITE, width=2)
        d.rounded_rectangle([cx + 70, cy - 40, cx + 200, cy + 140], radius=12, fill=(56, 189, 248, 200), outline=WHITE, width=2)
        d.text((cx - 165, cy + 30), "INDIA", fill=WHITE, font=f_badge)
        d.text((cx - 160, cy + 65), "ITR / NRI", fill=(255, 235, 170), font=f_seal)
        d.text((cx + 115, cy + 30), "USA", fill=WHITE, font=f_badge)
        d.text((cx + 105, cy + 65), "IRS / 1040", fill=(255, 235, 170), font=f_seal)
        # Golden Arch connecting them
        d.arc([cx - 140, cy - 120, cx + 140, cy + 40], start=180, end=360, fill=GOLD_MAIN, width=5)
        d.text((cx - 55, cy - 135), "DTAA TREATY", fill=GOLD_MAIN, font=f_badge)
        
    elif svc["chart_type"] == "deadline_calendar":
        # Calendar with extension pin
        d.rounded_rectangle([cx - 180, cy - 110, cx + 180, cy + 130], radius=16, fill=(245, 247, 250, 240), outline=(167, 139, 250), width=3)
        d.rectangle([cx - 180, cy - 110, cx + 180, cy - 45], fill=(167, 139, 250))
        d.text((cx - 120, cy - 90), "IRS DEADLINE SHIELD", fill=WHITE, font=f_badge)
        d.text((cx - 110, cy - 10), "OCTOBER 15", fill=NAVY_DEEP, font=f_title)
        d.text((cx - 100, cy + 55), "FORM 4868 / 7004 ACTIVE", fill=(109, 40, 217), font=f_badge)
        
    elif svc["chart_type"] == "audit_shield":
        # Defense shield with verification check
        d.polygon([(cx, cy - 120), (cx + 140, cy - 60), (cx + 140, cy + 40), (cx, cy + 130), (cx - 140, cy + 40), (cx - 140, cy - 60)],
                  fill=(15, 42, 85, 230), outline=(248, 113, 113), width=4)
        d.text((cx - 65, cy - 40), "IRS DEFENSE", fill=WHITE, font=f_badge)
        d.text((cx - 60, cy), "CPA BACKED", fill=(248, 113, 113), font=f_badge)
        d.text((cx - 45, cy + 40), "PROTECTED", fill=(34, 197, 94), font=f_seal)
        
    elif svc["chart_type"] == "wealth_portfolio":
        # Multi-asset pie / doughnut distribution
        for rad in [120, 80]:
            d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], outline=(255, 191, 0, 90), width=3)
        d.arc([cx - 110, cy - 110, cx + 110, cy + 110], start=0, end=110, fill=GOLD_MAIN, width=16)
        d.arc([cx - 110, cy - 110, cx + 110, cy + 110], start=120, end=240, fill=(56, 189, 248), width=16)
        d.arc([cx - 110, cy - 110, cx + 110, cy + 110], start=250, end=350, fill=(52, 211, 153), width=16)
        d.text((cx - 60, cy - 15), "EQUITY & TAX", fill=WHITE, font=f_seal)
        d.text((cx - 50, cy + 10), "OPTIMIZED", fill=GOLD_MAIN, font=f_seal)

    # Left-hand 3 Metrics Cards
    my = 330
    for val, lbl in svc["metrics"]:
        d.rounded_rectangle([110, my, 460, my + 100], radius=14, fill=(10, 32, 70, 200), outline=(255, 255, 255, 40), width=1)
        d.rounded_rectangle([112, my + 2, 116, my + 98], radius=2, fill=svc["accent"])
        d.text((140, my + 15), val, fill=WHITE, font=f_stat_val)
        d.text((140, my + 60), lbl, fill=LIGHT_BLUE, font=f_stat_lbl)
        my += 120

    # Save finalized composited image
    final_img = Image.alpha_composite(base.convert('RGBA'), overlay).convert('RGB')
    out_path = f"public/assets/services/{svc['id']}.jpg"
    final_img.save(out_path, quality=94)
    print(f"Generated {out_path}")

# Also generate client portal illustration and about visual
portal_base = create_base_canvas((5, 25, 65), (10, 50, 115), pattern_type="grid")
p_overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
pd = ImageDraw.Draw(p_overlay)
pd.rounded_rectangle([70, 70, WIDTH-70, HEIGHT-70], radius=28, fill=(8, 35, 78, 220), outline=(255, 191, 0, 90), width=2)
# Draw portal dashboard representation
pd.rounded_rectangle([120, 120, WIDTH-120, HEIGHT-120], radius=18, fill=(4, 20, 48, 230), outline=(255, 255, 255, 50), width=1)
# Top app bar
pd.rounded_rectangle([120, 120, WIDTH-120, 190], radius=18, fill=(10, 40, 88), outline=(255, 191, 0, 60), width=1)
try:
    f_p_head = ImageFont.truetype('arial.ttf', 24)
    f_p_lg = ImageFont.truetype('arial.ttf', 38)
    f_p_sm = ImageFont.truetype('arial.ttf', 18)
except:
    f_p_head = f_p_lg = f_p_sm = ImageFont.load_default()
pd.text((160, 140), "PLUTOTAX SECURE CLIENT PORTAL | 256-BIT ENCRYPTION", fill=GOLD_MAIN, font=f_p_head)

# Left column: document cards
for dy in range(230, 600, 110):
    pd.rounded_rectangle([160, dy, 580, dy + 90], radius=12, fill=(12, 45, 95), outline=(255, 255, 255, 50), width=1)
    pd.rounded_rectangle([180, dy + 20, 230, dy + 70], radius=8, fill=(255, 191, 0, 40), outline=GOLD_MAIN, width=1)
    pd.text((250, dy + 22), "Form 1040_2025_Final_Approved.pdf", fill=WHITE, font=f_p_sm)
    pd.text((250, dy + 52), "Verified by Certified Public Accountant (CPA)", fill=(34, 197, 94), font=f_p_sm)

# Right column: status tracker
pd.rounded_rectangle([620, 230, WIDTH-160, 630], radius=14, fill=(10, 36, 80), outline=(255, 191, 0, 70), width=1)
pd.text((660, 260), "TAX FILING LIVE STATUS", fill=GOLD_MAIN, font=f_p_head)
steps = [
    ("1. Documents Uploaded", "COMPLETED", (34, 197, 94)),
    ("2. CPA Review & Calculations", "COMPLETED", (34, 197, 94)),
    ("3. Client Signature & Approval", "IN PROGRESS", GOLD_BRIGHT),
    ("4. IRS E-File Transmission", "QUEUED", SLATE_GRAY)
]
sy = 320
for sname, sstatus, scolor in steps:
    pd.ellipse([660, sy+5, 680, sy+25], fill=scolor)
    pd.text((700, sy), sname, fill=WHITE, font=f_p_sm)
    pd.text((920, sy), sstatus, fill=scolor, font=f_p_sm)
    sy += 70

portal_img = Image.alpha_composite(portal_base.convert('RGBA'), p_overlay).convert('RGB')
portal_img.save("public/assets/client-portal.jpg", quality=95)
portal_img.save("public/assets/about-advisory.jpg", quality=95)
print("Saved client-portal.jpg and about-advisory.jpg")
