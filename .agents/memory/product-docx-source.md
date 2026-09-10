---
name: Product DOCX source truth
description: How to resolve conflicting or mislabeled product-copy sources.
---

Treat the paragraphs extracted directly from `word/document.xml` inside the attached DOCX as the source of truth when product-copy readings conflict.

**Why:** A converted document read once returned wording that differed from the actual DOCX package, causing multiple false content corrections and review failures.

**How to apply:** Before publishing or reviewing source-locked product copy, parse the DOCX as a ZIP, concatenate each paragraph's WordprocessingML text nodes, and compare the page against that output.

When an attachment's filename names one product but its actual content describes another, do not reuse or reinterpret the text. For STARK RS Profi, the user approved the official Fort Stark product pages and manufacturer catalog after both supplied files proved to contain KDL Profi copy.

**Why:** A plausible filename is not evidence that the enclosed specifications belong to that product, and copying them would publish false technical data.

**How to apply:** Prefer the verified manufacturer source approved for that product. Preserve icon-only or symbol-only manufacturer values literally until their labels are confirmed; never invent a label, price, availability, or delivery term.