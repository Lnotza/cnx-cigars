import re

def is_likely_visible_text(s: str) -> bool:
    s = s.strip()
    if not s:
        return False
    # Exclude empty or just punctuation
    # Exclude strings that are likely code snippets
    # Patterns that indicate code:
    code_patterns = [
        r'\{[^}]*\}',  # {...}
        r'\[[^\]]*\}',  # not needed
        r'\[[^\]]*\]',  # [...]
        r'=>',
        r'==',
        r'!=',
        r';\s*$',  # ending with semicolon
        r'^\s*[+\-*/]',  # starts with operator
        r'^\s*[&\|]{2}',  # && or ||
        r'^\s*[\w]+\s*:',  # key: at start (object literal)
        r'"\s*:',  # quote colon (JSON)
        r':\s*"',  # colon quote
        r'\'\s*:',  # single quote colon
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
        r'\.\s*\w+',  # method call
        r'->',  # arrow or property access in some languages
        r'\\\/\*',  # comment start
        r'\*\/',  # comment end
        r'\\\/\/',  # single line comment
        r'http://',
        r'https://',
        r'www\.',
        r'\.png', r'\.jpg', r'\.jpeg', r'\.svg', r'\.gif', r'\.webp',  # file extensions
        r'\/\w',  # path slash
        r'\\\w',  # backslash path
    ]
    for pat in code_patterns:
        if re.search(pat, s, re.IGNORECASE):
            return False
    # Exclude strings that are just numbers or numbers with + (but we want to keep 80+ etc)
    # Actually we want to keep those, so we won't exclude.
    # Exclude strings that are only punctuation/symbols (like "---", "!!!")
    if re.match(r'^[\W_]+$', s):
        return False
    # Exclude very short strings that are not alphanumeric (like "-", "+", "*")
    if len(s) == 1 and not s.isalnum():
        return False
    # Exclude strings that are just a single digit? maybe keep.
    return True

def main():
    input_path = '/Users/pnwemd/Desktop/Websites/cnx-cigars/public/textfullwebsite.txt'
    output_path = '/Users/pnwemd/Desktop/Websites/cnx-cigars/public/textfullwebsite.txt'  # overwrite
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