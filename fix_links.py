import os
import re

target_dir = r"C:\Users\santh\OneDrive\Desktop\VibeSync-AI\frontend\src"

link_pattern = re.compile(r'<Link\s+href=([\'"{][^>]+?[\'"}])\s+passHref\s+legacyBehavior>\s*<Button([^>]*)>', re.DOTALL)
close_pattern = re.compile(r'</Button>\s*</Link>', re.DOTALL)

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith(".tsx"):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            if "legacyBehavior" in content:
                new_content = link_pattern.sub(r'<Button asChild\2>\n<Link href=\1>', content)
                new_content = close_pattern.sub(r'</Link>\n</Button>', new_content)
                
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Fixed {filepath}")
