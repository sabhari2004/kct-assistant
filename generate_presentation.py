import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Clean, professional color palette
    NAVY_DARK = RGBColor(15, 23, 42)       # #0F172A
    INDIGO_PRIMARY = RGBColor(67, 56, 202) # #4338CA
    INDIGO_LIGHT = RGBColor(99, 102, 241)  # #6366F1
    TEXT_MAIN = RGBColor(30, 41, 59)       # #1E293B
    TEXT_MUTED = RGBColor(100, 116, 139)   # #64748B
    CARD_BG = RGBColor(248, 250, 252)      # #F8FAFC
    CARD_BORDER = RGBColor(226, 232, 240)  # #E2E8F0
    WHITE = RGBColor(255, 255, 255)
    
    # Status Accent Colors
    GREEN_BG = RGBColor(236, 253, 245)     # #ECFDF5
    GREEN_TXT = RGBColor(4, 120, 87)       # #047857
    AMBER_BG = RGBColor(254, 243, 199)     # #FEF3C7
    AMBER_TXT = RGBColor(180, 83, 9)       # #B45309
    BLUE_BG = RGBColor(239, 246, 255)      # #EFF6FF
    BLUE_TXT = RGBColor(29, 78, 216)       # #1D4ED8

    def add_header(slide, title, category="0th Project Review • MCA (2026–2027)"):
        # Header banner
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(1.1))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p0 = tf.paragraphs[0]
        p0.text = category.upper()
        p0.font.name = "Segoe UI"
        p0.font.size = Pt(10)
        p0.font.bold = True
        p0.font.color.rgb = INDIGO_PRIMARY
        p0.space_after = Pt(2)
        
        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.name = "Segoe UI"
        p1.font.size = Pt(22)
        p1.font.bold = True
        p1.font.color.rgb = NAVY_DARK

        # Underline rule
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.45), Inches(11.733), Inches(0.02))
        line.fill.solid()
        line.fill.fore_color.rgb = CARD_BORDER
        line.line.color.rgb = CARD_BORDER

    def add_footer(slide, current_num):
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(6.9), Inches(11.733), Inches(0.35))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = f"Kumaraguru College of Technology  •  Dept. of Computer Applications  •  0th Review (21/08/2026)      |      Slide {current_num} of 8"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED

    def draw_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1)
        return shape

    # =========================================================================
    # SLIDE 1: COURSE DETAILS
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    
    # Dark modern title background
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = NAVY_DARK
    bg1.line.fill.background()

    # Inner container
    draw_card(s1, Inches(1.2), Inches(0.9), Inches(10.933), Inches(5.7), RGBColor(30, 41, 59), RGBColor(51, 65, 85))

    tb1 = s1.shapes.add_textbox(Inches(1.8), Inches(1.3), Inches(9.733), Inches(4.9))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_top = tf1.margin_right = tf1.margin_bottom = 0

    p = tf1.paragraphs[0]
    p.text = "ACADEMIC PROJECT REVIEW (PHASE 0)"
    p.font.name = "Segoe UI"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = RGBColor(56, 189, 248) # Sky blue
    p.space_after = Pt(6)

    p = tf1.add_paragraph()
    p.text = "0th Project Review Presentation"
    p.font.name = "Segoe UI"
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.space_after = Pt(22)

    course_items = [
        ("Course / Degree", "Master of Computer Applications (MCA — 2 Year PG)"),
        ("Department", "Department of Computer Applications"),
        ("Institution", "Kumaraguru College of Technology, Coimbatore"),
        ("Affiliation", "Autonomous Institution Affiliated to Anna University"),
        ("Academic Year", "2026 – 2027"),
        ("Project Review", "0th Review (Problem Identification & Feasibility)"),
        ("Review Date", "21 August 2026 (During Lab Hours)")
    ]

    for label, val in course_items:
        p = tf1.add_paragraph()
        r1 = p.add_run()
        r1.text = f"•  {label.ljust(20)}:  "
        r1.font.name = "Segoe UI"
        r1.font.size = Pt(13)
        r1.font.bold = True
        r1.font.color.rgb = RGBColor(148, 163, 184)

        r2 = p.add_run()
        r2.text = val
        r2.font.name = "Segoe UI"
        r2.font.size = Pt(13.5)
        r2.font.bold = True
        r2.font.color.rgb = WHITE
        p.space_after = Pt(8)

    # =========================================================================
    # SLIDE 2: STUDENT DETAILS
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_header(s2, "Student & Academic Guide Details")
    add_footer(s2, 2)

    # Left Box: Student Information
    draw_card(s2, Inches(0.8), Inches(1.75), Inches(5.65), Inches(4.8), CARD_BG, CARD_BORDER)
    tb2_l = s2.shapes.add_textbox(Inches(1.15), Inches(2.0), Inches(4.95), Inches(4.3))
    tf2_l = tb2_l.text_frame
    tf2_l.word_wrap = True

    p = tf2_l.paragraphs[0]
    p.text = "STUDENT INFORMATION"
    p.font.name = "Segoe UI"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = INDIGO_PRIMARY
    p.space_after = Pt(14)

    student_data = [
        ("Student Name", "Shree Sabhari"),
        ("Register Number", "[Register No. / Roll No.]"),
        ("Programme", "Master of Computer Applications (MCA)"),
        ("Department", "Department of Computer Applications"),
        ("College / Institution", "Kumaraguru College of Technology (KCT)"),
        ("Email Address", "shreesabhari@kct.ac.in")
    ]
    for lbl, val in student_data:
        p = tf2_l.add_paragraph()
        r1 = p.add_run()
        r1.text = f"{lbl}\n"
        r1.font.name = "Segoe UI"
        r1.font.size = Pt(10)
        r1.font.color.rgb = TEXT_MUTED

        r2 = p.add_run()
        r2.text = f"{val}\n"
        r2.font.name = "Segoe UI"
        r2.font.size = Pt(12.5)
        r2.font.bold = True
        r2.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(4)

    # Right Box: Guide & Review Information
    draw_card(s2, Inches(6.85), Inches(1.75), Inches(5.65), Inches(4.8), CARD_BG, CARD_BORDER)
    tb2_r = s2.shapes.add_textbox(Inches(7.2), Inches(2.0), Inches(4.95), Inches(4.3))
    tf2_r = tb2_r.text_frame
    tf2_r.word_wrap = True

    p = tf2_r.paragraphs[0]
    p.text = "PROJECT SUPERVISION"
    p.font.name = "Segoe UI"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = INDIGO_PRIMARY
    p.space_after = Pt(14)

    guide_data = [
        ("Project Guide", "[Guide Name, Designation / Faculty Advisor]"),
        ("Department", "Department of Computer Applications"),
        ("Institution", "Kumaraguru College of Technology, Coimbatore"),
        ("Review Milestone", "0th Review (Phase 0 Evaluation)"),
        ("Review Date", "21 August 2026"),
        ("Evaluation Mode", "In-Person Lab Review")
    ]
    for lbl, val in guide_data:
        p = tf2_r.add_paragraph()
        r1 = p.add_run()
        r1.text = f"{lbl}\n"
        r1.font.name = "Segoe UI"
        r1.font.size = Pt(10)
        r1.font.color.rgb = TEXT_MUTED

        r2 = p.add_run()
        r2.text = f"{val}\n"
        r2.font.name = "Segoe UI"
        r2.font.size = Pt(12.5)
        r2.font.bold = True
        r2.font.color.rgb = TEXT_MAIN
        p.space_after = Pt(4)

    # =========================================================================
    # SLIDE 3: PROJECT TITLE
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_header(s3, "Project Title & System Overview")
    add_footer(s3, 3)

    # Title Card
    draw_card(s3, Inches(0.8), Inches(1.75), Inches(11.733), Inches(1.9), NAVY_DARK, INDIGO_PRIMARY)
    tb3_top = s3.shapes.add_textbox(Inches(1.15), Inches(1.95), Inches(11.0), Inches(1.5))
    tf3_t = tb3_top.text_frame
    tf3_t.word_wrap = True

    p = tf3_t.paragraphs[0]
    p.text = "PROJECT TITLE"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = RGBColor(56, 189, 248)
    p.space_after = Pt(4)

    p = tf3_t.add_paragraph()
    p.text = "KCT AI College Assistant"
    p.font.name = "Segoe UI"
    p.font.size = Pt(26)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.space_after = Pt(6)

    p = tf3_t.add_paragraph()
    p.text = "One-line description: A full-stack, AI-powered conversational web application designed to provide instantaneous, verified institutional information and administrative management for college students and staff."
    p.font.name = "Segoe UI"
    p.font.size = Pt(12)
    p.font.color.rgb = RGBColor(226, 232, 240)

    # 3 Simple Feature Columns
    cols_s3 = [
        ("💬 Student AI Chat Portal", [
            "Answers questions on academics, 2-year MCA syllabus, and exams.",
            "Supports bilingual interaction: English, Tamil, and Tanglish.",
            "Stores chat history chronologically using Cloud Firestore."
        ]),
        ("⚡ Verified Knowledge Base", [
            "Injected with factual KCT institutional ground truth.",
            "Covers 18+ academic programmes, departments, and facilities.",
            "Provides accurate info on MG Merit & Achiever scholarships."
        ]),
        ("🛠️ Admin Management Portal", [
            "Dashboard with real-time student usage and query analytics.",
            "Document upload and storage repository for official college PDFs.",
            "Centralized FAQ and Notice Board management."
        ])
    ]

    cw = Inches(3.644)
    gap = Inches(0.4)
    for i, (col_title, items) in enumerate(cols_s3):
        c_left = Inches(0.8) + i * (cw + gap)
        draw_card(s3, c_left, Inches(3.95), cw, Inches(2.7), CARD_BG, CARD_BORDER)
        tb = s3.shapes.add_textbox(c_left + Inches(0.2), Inches(4.1), cw - Inches(0.4), Inches(2.4))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = col_title
        p.font.name = "Segoe UI"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = INDIGO_PRIMARY
        p.space_after = Pt(8)

        for item in items:
            p = tf.add_paragraph()
            p.text = f"•  {item}"
            p.font.name = "Segoe UI"
            p.font.size = Pt(10.5)
            p.font.color.rgb = TEXT_MAIN
            p.space_after = Pt(5)

    # =========================================================================
    # SLIDE 4: PROBLEM STATEMENT
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_header(s4, "Problem Statement")
    add_footer(s4, 4)

    prob_cards = [
        ("1. What problem currently exists?", [
            "Information is scattered across separate PDFs, website pages, and notice boards.",
            "Students frequently struggle to find quick, verified answers for academic queries."
        ]),
        ("2. Who faces this problem?", [
            "Enrolled students looking for syllabi, exam schedules, and scholarship rules.",
            "Prospective students inquiring about MCA eligibility and admission procedures.",
            "College staff handling repetitive queries during admission and exam periods."
        ]),
        ("3. Why is the existing approach insufficient?", [
            "Manual helpdesks operate only during working hours (no 24/7 access).",
            "Static college web pages require time-consuming manual document navigation.",
            "Lack of bilingual support (Tamil / Tanglish) for regional language students."
        ]),
        ("4. Why is a new system needed?", [
            "Provides a 24/7 centralized AI assistant with instant, verified responses.",
            "Significantly reduces administrative workload and repetitive inquiries.",
            "Offers an intuitive, user-friendly interface accessible on any device."
        ])
    ]

    gw = Inches(5.65)
    gh = Inches(2.35)
    coords4 = [
        (Inches(0.8), Inches(1.75)),
        (Inches(6.85), Inches(1.75)),
        (Inches(0.8), Inches(4.35)),
        (Inches(6.85), Inches(4.35))
    ]

    for i, (title, items) in enumerate(prob_cards):
        cx, cy = coords4[i]
        draw_card(s4, cx, cy, gw, gh, CARD_BG, CARD_BORDER)
        tb = s4.shapes.add_textbox(cx + Inches(0.25), cy + Inches(0.18), gw - Inches(0.5), gh - Inches(0.36))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Segoe UI"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = INDIGO_PRIMARY
        p.space_after = Pt(6)

        for item in items:
            p = tf.add_paragraph()
            p.text = f"•  {item}"
            p.font.name = "Segoe UI"
            p.font.size = Pt(10.5)
            p.font.color.rgb = TEXT_MAIN
            p.space_after = Pt(4)

    # =========================================================================
    # SLIDE 5: ABSTRACT
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_header(s5, "Project Abstract")
    add_footer(s5, 5)

    # Abstract Box
    draw_card(s5, Inches(0.8), Inches(1.75), Inches(11.733), Inches(2.2), BLUE_BG, RGBColor(191, 219, 254))
    tb5_a = s5.shapes.add_textbox(Inches(1.1), Inches(1.9), Inches(11.133), Inches(1.9))
    tf5_a = tb5_a.text_frame
    tf5_a.word_wrap = True

    p = tf5_a.paragraphs[0]
    p.text = "ABSTRACT (118 WORDS)"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = BLUE_TXT
    p.space_after = Pt(4)

    p = tf5_a.add_paragraph()
    p.text = (
        "In higher education institutions, students often face delays finding reliable academic and administrative information. "
        "The KCT AI College Assistant is an intelligent web application developed for Kumaraguru College of Technology to solve this problem. "
        "Built using React 19, TypeScript, Tailwind CSS v4, Firebase, and Groq Cloud AI, the platform provides instantaneous, multi-turn "
        "answers about admissions, 2-year MCA syllabus, examinations, scholarships, and campus facilities. The system supports bilingual "
        "queries in English and Tamil/Tanglish, saves conversation histories, and includes an administrative dashboard with analytics. "
        "The application streamlines student assistance and reduces administrative workload through automated, verified responses."
    )
    p.font.name = "Segoe UI"
    p.font.size = Pt(11.5)
    p.font.color.rgb = NAVY_DARK
    p.line_spacing = 1.25

    # 4 Structured Summary Cards
    abs_cols = [
        ("Background & Problem", "Academic information is scattered across documents, causing query delays and staff workload."),
        ("Proposed Solution", "A 24/7 intelligent conversational chatbot powered by Groq LLM and verified KCT ground truth."),
        ("Core Technologies", "React 19, TypeScript, Tailwind CSS v4, Firebase Auth & Firestore, and Groq Cloud API."),
        ("Expected Outcome", "Instant query resolution, bilingual support, chat persistence, and administrative usage analytics.")
    ]

    ab_w = Inches(2.7)
    ab_gap = Inches(0.31)
    for i, (title, desc) in enumerate(abs_cols):
        cx = Inches(0.8) + i * (ab_w + ab_gap)
        draw_card(s5, cx, Inches(4.25), ab_w, Inches(2.4), CARD_BG, CARD_BORDER)
        tb = s5.shapes.add_textbox(cx + Inches(0.18), Inches(4.4), ab_w - Inches(0.36), Inches(2.1))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Segoe UI"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = INDIGO_PRIMARY
        p.space_after = Pt(6)

        p = tf.add_paragraph()
        p.text = desc
        p.font.name = "Segoe UI"
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_MAIN

    # =========================================================================
    # SLIDE 6: TECHNOLOGY, CLOUD PLATFORM & SERVICES USED
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_header(s6, "Technology Stack & Services Used")
    add_footer(s6, 6)

    tech_cols = [
        ("Frontend", [
            ("React 19", "Modern UI component framework"),
            ("TypeScript", "Type safety and maintainability"),
            ("Vite 8", "Fast build tool and dev server"),
            ("Tailwind CSS v4", "Responsive styling & dark mode"),
            ("Lucide React", "Icon library for navigation"),
            ("Recharts", "Admin dashboard analytics charts")
        ]),
        ("Backend & Database", [
            ("Firebase Auth", "Email/password user authentication"),
            ("Cloud Firestore", "NoSQL chat history database"),
            ("Firebase Storage", "Official college PDF/doc storage"),
            ("Firebase Analytics", "Usage telemetry tracking"),
            ("Role Separation", "Student & Admin shells"),
            ("Data Isolation", "Per-user conversation security")
        ]),
        ("AI & LLM Services", [
            ("Groq Cloud API", "High-speed LLM inference"),
            ("Primary Model", "openai/gpt-oss-120b"),
            ("Fallback Model 1", "openai/gpt-oss-20b"),
            ("Fallback Model 2", "groq/compound-mini"),
            ("KCT Knowledge Base", "Verified institutional context"),
            ("Bilingual Engine", "English & Tamil/Tanglish support")
        ]),
        ("Status Summary", [
            ("CURRENTLY USED", ""),
            ("• React 19 + TypeScript + Vite", ""),
            ("• Firebase Auth & Firestore", ""),
            ("• Groq LLM Multi-Model Engine", ""),
            ("PLANNED / FUTURE", ""),
            ("• Vector DB (RAG for PDF search)", ""),
            ("• Push Notifications (FCM)", "")
        ])
    ]

    for i, (cat_title, items) in enumerate(tech_cols):
        cx = Inches(0.8) + i * (ab_w + ab_gap)
        draw_card(s6, cx, Inches(1.75), ab_w, Inches(4.9), CARD_BG, CARD_BORDER)
        tb = s6.shapes.add_textbox(cx + Inches(0.18), Inches(1.9), ab_w - Inches(0.36), Inches(4.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = cat_title
        p.font.name = "Segoe UI"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = INDIGO_PRIMARY
        p.space_after = Pt(8)

        for name, desc in items:
            p = tf.add_paragraph()
            if desc == "":
                if name in ["CURRENTLY USED", "PLANNED / FUTURE"]:
                    p.text = name
                    p.font.name = "Segoe UI"
                    p.font.size = Pt(9.5)
                    p.font.bold = True
                    p.font.color.rgb = GREEN_TXT if name == "CURRENTLY USED" else AMBER_TXT
                    p.space_after = Pt(2)
                else:
                    p.text = name
                    p.font.name = "Segoe UI"
                    p.font.size = Pt(10)
                    p.font.color.rgb = TEXT_MAIN
                    p.space_after = Pt(3)
                continue

            r1 = p.add_run()
            r1.text = f"• {name}: "
            r1.font.name = "Segoe UI"
            r1.font.size = Pt(9.5)
            r1.font.bold = True
            r1.font.color.rgb = TEXT_MAIN

            r2 = p.add_run()
            r2.text = desc
            r2.font.name = "Segoe UI"
            r2.font.size = Pt(9)
            r2.font.color.rgb = TEXT_MUTED
            p.space_after = Pt(3)

    # =========================================================================
    # SLIDE 7: PROJECT TIMELINE
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_header(s7, "Project Timeline & Progress Status")
    add_footer(s7, 7)

    timeline_phases = [
        ("COMPLETED (Phase 0 — Current Status at 0th Review)", GREEN_BG, GREEN_TXT, [
            ("Week 1–2", "Problem Identification & Domain Study", "Analyzed student query bottlenecks, 2-year MCA syllabus, and KCT academic rules."),
            ("Week 3–4", "UI/UX Design & Frontend Prototyping", "Built responsive Student and Admin portals using React 19 and Tailwind CSS v4."),
            ("Week 5–6", "AI Integration & Backend Setup", "Integrated Groq LLM API with multi-model fallback, Firebase Auth, and Firestore.")
        ]),
        ("CURRENTLY IN PROGRESS (Phase 1)", AMBER_BG, AMBER_TXT, [
            ("Week 7–8", "Knowledge Base Expansion & Admin CRUD", "Enhancing verified KCT domain data and wiring dynamic FAQ and Notice management.")
        ]),
        ("PLANNED / FUTURE WORK (Phase 2 & 3)", BLUE_BG, BLUE_TXT, [
            ("Week 9–10", "Vector RAG Pipeline & PDF Search", "Adding Retrieval-Augmented Generation for deep indexing of uploaded college PDFs."),
            ("Week 11–12", "Testing & Security Hardening", "Performing usability testing, latency optimization, and role-based route security."),
            ("Week 13–14", "Deployment & Final Documentation", "Hosting deployment, final project documentation, and final review presentation.")
        ])
    ]

    y = Inches(1.75)
    heights = [Inches(2.2), Inches(1.15), Inches(1.65)]

    for idx, (title, bg, txt_col, items) in enumerate(timeline_phases):
        h = heights[idx]
        draw_card(s7, Inches(0.8), y, Inches(11.733), h, bg, CARD_BORDER)
        tb = s7.shapes.add_textbox(Inches(1.05), y + Inches(0.12), Inches(11.233), h - Inches(0.24))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"●  {title}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = txt_col
        p.space_after = Pt(4)

        for w_tag, step_title, desc in items:
            p = tf.add_paragraph()
            r1 = p.add_run()
            r1.text = f"[{w_tag}]  {step_title} — "
            r1.font.name = "Segoe UI"
            r1.font.size = Pt(10)
            r1.font.bold = True
            r1.font.color.rgb = TEXT_MAIN

            r2 = p.add_run()
            r2.text = desc
            r2.font.name = "Segoe UI"
            r2.font.size = Pt(9.5)
            r2.font.color.rgb = TEXT_MUTED
            p.space_after = Pt(2)

        y += h + Inches(0.12)

    # =========================================================================
    # SLIDE 8: CONCLUSION
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_header(s8, "Conclusion & Next Steps")
    add_footer(s8, 8)

    concl_grid = [
        ("🎯 Project Goal", [
            "Build an intelligent, bilingual 24/7 college assistant for Kumaraguru College of Technology.",
            "Provide instantaneous, verified answers to academic and administrative inquiries."
        ]),
        ("✅ Current Status (0th Review)", [
            "Complete Student and Admin portal UI developed with responsive design.",
            "Live Groq Cloud AI inference with verified KCT institutional context.",
            "Firebase Authentication and Firestore conversation history persistence integrated."
        ]),
        ("🌟 Expected Outcome", [
            "Significant reduction in manual administrative inquiry workload.",
            "Easy, 24/7 access to verified college information for students in English & Tamil."
        ]),
        ("🚀 Future Work", [
            "Implement Vector RAG for dynamic search inside uploaded PDF documents.",
            "Add voice query input and push notifications for urgent college announcements."
        ])
    ]

    coords8 = [
        (Inches(0.8), Inches(1.75)),
        (Inches(6.85), Inches(1.75)),
        (Inches(0.8), Inches(3.95)),
        (Inches(6.85), Inches(3.95))
    ]

    for i, (title, items) in enumerate(concl_grid):
        cx, cy = coords8[i]
        draw_card(s8, cx, cy, gw, Inches(1.95), CARD_BG, CARD_BORDER)
        tb = s8.shapes.add_textbox(cx + Inches(0.25), cy + Inches(0.15), gw - Inches(0.5), Inches(1.65))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Segoe UI"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = INDIGO_PRIMARY
        p.space_after = Pt(4)

        for item in items:
            p = tf.add_paragraph()
            p.text = f"•  {item}"
            p.font.name = "Segoe UI"
            p.font.size = Pt(10)
            p.font.color.rgb = TEXT_MAIN
            p.space_after = Pt(2)

    # Bottom Closing Statement
    draw_card(s8, Inches(0.8), Inches(6.05), Inches(11.733), Inches(0.7), NAVY_DARK, INDIGO_PRIMARY)
    tb8_b = s8.shapes.add_textbox(Inches(1.0), Inches(6.12), Inches(11.333), Inches(0.55))
    tf8_b = tb8_b.text_frame
    tf8_b.word_wrap = True
    p = tf8_b.paragraphs[0]
    p.text = '“The proposed system aims to provide an efficient, scalable, and user-friendly solution to institutional information access and administrative query management.”'
    p.alignment = PP_ALIGN.CENTER
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = WHITE

    # Save presentation
    output_filename = "KCT_AI_College_Assistant_0th_Review.pptx"
    prs.save(output_filename)
    print(f"Presentation successfully created and saved as: {output_filename}")

if __name__ == "__main__":
    create_deck()
