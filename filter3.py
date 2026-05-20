import re

def is_likely_visible_text(s: str) -> bool:
    s = s.strip()
    if not s:
        return False
    # Exclude code snippets
    code_patterns = [
        r'\{[^}]*\}',
        r'\[[^\]]*\]',
        r'=>',
        r'==',
        r'!=',
        r';\s*$',
        r'^\s*[+\-*/]',
        r'^\s*[&\|]{2}',
        r'^\s*[\w]+\s*:',
        r'"\s*:',
        r':\s*"',
        r'\'\s*:',
        r':\s*\'',
        r'function\s',
        r'const\s',
        r'let\s',
        r'var\s',
        r'import\s',
        r'export\s',
        r'return\s',
        r'if\s',
        r'for\s',
        r'while\s',
        r'async\s',
        r'await\s',
        r'new\s',
        r'\bthis\b',
        r'\.\s*\w+',
        r'->',
        r'\\\/\*',
        r'\*\/',
        r'\\\/\/',
        r'http://',
        r'https://',
        r'www\.',
        r'\.(png|jpg|jpeg|svg|gif|webp)\b',
        r'\/[\w\-]+\/',  # path with slashes
        r'\\\\[\w\-]+\\\\',  # backslashes
    ]
    for pat in code_patterns:
        if re.search(pat, s, re.IGNORECASE):
            return False
    # Exclude IDs: lowercase hyphenated strings without spaces, no uppercase
    if re.match(r'^[a-z0-9]+(?:-[a-z0-9]+)+$', s):
        # also exclude if it's just a number with hyphens? still ID
        return False
    # Exclude strings that are just numbers (but keep if they are like "80+" or have other chars)
    if re.match(r'^\d+$', s):
        # Could be a visible number like "2" placeholder; we keep it.
        # Actually we want to keep numbers that are placeholders.
        # We'll keep them for now.
        pass
    # Exclude strings that are only punctuation/symbols
    if re.match(r'^[\W_]+$', s):
        return False
    # Exclude very short strings that are not alphanumeric (like "-", "+", "*")
    if len(s) == 1 and not s.isalnum():
        return False
    # Exclude strings that are just a single letter? maybe keep (like "A" as in grade?). Not needed.
    return True

def main():
    input_path = '/Users/pnwemd/Desktop/Websites/cnx-cigars/public/textfullwebsite.txt'
    output_path = '/Users/pnwemd/Desktop/Websites/cnx-cigars/public/textfullwebsite.txt'
    with open(input_path, 'r', encoding='utf-8') as f:
        lines = [line.rstrip('\n') for line in f]
    filtered = []
    for line in lines:
        if is_likely_visible_text(line):
            filtered.append(line)
    # deduplicate preserving order
    seen = set()
    deduped = []
    for line in filtered:
        if line not in seen:
            seen.add(line)
            deduped.append(line)
    with open(output_path, 'w', encoding='utf-8') as f:
        for line in deduped:
            f.write(line + '\n')
    print(f'Original: {len(lines)} lines, Filtered: {len(deduped)} lines')

if __name__ == '__main__':
    main()