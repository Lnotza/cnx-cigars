import os
import re
import html

def extract_text_from_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    texts = set()
    # 1. Extract text between > and <
    for match in re.finditer(r'>([^<]+)<', content):
        inner = match.group(1).strip()
        if inner:
            inner = html.unescape(inner)
            texts.add(inner)
    # 2. Extract attribute values for known attrs
    for match in re.finditer(r'placeholder=["\']([^"\']*)["\']', content, re.IGNORECASE):
        val = match.group(1).strip()
        if val:
            texts.add(html.unescape(val))
    for match in re.finditer(r'aria-label=["\']([^"\']*)["\']', content, re.IGNORECASE):
        val = match.group(1).strip()
        if val:
            texts.add(html.unescape(val))
    for match in re.finditer(r'title=["\']([^"\']*)["\']', content, re.IGNORECASE):
        val = match.group(1).strip()
        if val:
            texts.add(html.unescape(val))
    for match in re.finditer(r'alt=["\']([^"\']*)["\']', content, re.IGNORECASE):
        val = match.group(1).strip()
        if val:
            texts.add(html.unescape(val))
    # label text
    for match in re.finditer(r'<label[^>]*>([^<]+)</label>', content, re.IGNORECASE):
        inner = match.group(1).strip()
        if inner:
            texts.add(html.unescape(inner))
    # button text
    for match in re.finditer(r'<button[^>]*>([^<]+)</button>', content, re.IGNORECASE):
        inner = match.group(1).strip()
        if inner:
            texts.add(html.unescape(inner))
    # Link and a tags
    for match in re.finditer(r'<(?:Link|a)[^>]*>([^<]+)</(?:Link|a)>', content, re.IGNORECASE):
        inner = match.group(1).strip()
        if inner:
            texts.add(html.unescape(inner))
    return texts

def main():
    root_dir = '/Users/pnwemd/Desktop/Websites/cnx-cigars'
    src_dir = os.path.join(root_dir, 'src')
    all_texts = set()
    for dirpath, dirnames, filenames in os.walk(src_dir):
        for fname in filenames:
            if fname.endswith('.tsx') or fname.endswith('.ts') or fname.endswith('.js') or fname.endswith('.jsx'):
                filepath = os.path.join(dirpath, fname)
                texts = extract_text_from_file(filepath)
                all_texts.update(texts)
    # Also include data JSON files for static strings like names, strength, notes
    data_dir = os.path.join(root_dir, 'src', 'data')
    for fname in os.listdir(data_dir):
        if fname.endswith('.json'):
            filepath = os.path.join(data_dir, fname)
            # For JSON, we can extract all string values
            try:
                import json
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                def extract_strings(obj):
                    if isinstance(obj, str):
                        all_texts.add(obj)
                    elif isinstance(obj, dict):
                        for v in obj.values():
                            extract_strings(v)
                    elif isinstance(obj, list):
                        for v in obj:
                            extract_strings(v)
                extract_strings(data)
            except Exception as e:
                print(f'Error reading {filepath}: {e}')
    # Output sorted
    sorted_texts = sorted(all_texts, key=lambda s: s.lower())
    out_path = os.path.join(root_dir, 'public', 'textfullwebsite.txt')
    with open(out_path, 'w', encoding='utf-8') as f:
        for txt in sorted_texts:
            f.write(txt + '\n')
    print(f'Extracted {len(sorted_texts)} unique strings to {out_path}')

if __name__ == '__main__':
    main()