import re

def is_likely_visible_text(s: str) -> bool:
    s = s.strip()
    if not s:
        return False
    forbidden_patterns = [
        r'\{', r'\}', r'\(', r'\)', r';', r'=>', r'==', r'!=',
        r'import\s', r'export\s', r'function\s', r'const\s', r'let\s', r'var\s',
        r'return\s', r'if\s', r'for\s', r'while\s', r'async\s', r'await\s',
        r'new\s', r'\bthis\b', r'\.\s*\w', r'\[\s*\]', r'\\\.\\\"', r'\\\"',
        r'\\\/\*', r'\*\/', r'\\\/\/', r'http://', r'https://', r'www\.'
    ]
    for pat in forbidden_patterns:
        if re.search(pat, s, re.IGNORECASE):
            return False
    if len(s) == 1 and not s.isalnum():
        return False
    return True

def main():
    input_path = '/Users/pnwemd/Desktop/Websites/cnx-cigars/public/textfullwebsite.txt'
    output_path = '/Users/pnwemd/Desktop/Websites/cnx-cigars/public/textfullwebsite_filtered.txt'
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
    print(f'Saved to {output_path}')

if __name__ == '__main__':
    main()