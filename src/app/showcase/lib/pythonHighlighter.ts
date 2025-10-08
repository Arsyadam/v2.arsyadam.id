// Python syntax highlighting utility
export function highlightPythonCode(code: string): string {
  // Python keywords
  const keywords = [
    'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else',
    'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
    'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
    'True', 'False', 'None'
  ];

  // Built-in functions
  const builtins = [
    'abs', 'all', 'any', 'bin', 'bool', 'bytearray', 'bytes', 'callable', 'chr',
    'classmethod', 'compile', 'complex', 'delattr', 'dict', 'dir', 'divmod',
    'enumerate', 'eval', 'exec', 'filter', 'float', 'format', 'frozenset',
    'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'int',
    'isinstance', 'issubclass', 'iter', 'len', 'list', 'locals', 'map', 'max',
    'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print',
    'property', 'range', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice',
    'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip'
  ];

  let highlighted = code;

  // Highlight strings (both single and double quotes)
  highlighted = highlighted.replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, 
    '<span class="token string">$1$2$1</span>');

  // Highlight comments
  highlighted = highlighted.replace(/(#.*)/g, '<span class="token comment">$1</span>');

  // Highlight numbers
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>');

  // Highlight keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span class="token keyword">${keyword}</span>`);
  });

  // Highlight built-in functions
  builtins.forEach(builtin => {
    const regex = new RegExp(`\\b${builtin}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span class="token builtin">${builtin}</span>`);
  });

  // Highlight function definitions
  highlighted = highlighted.replace(/\bdef\s+(\w+)/g, 
    '<span class="token keyword">def</span> <span class="token function">$1</span>');

  // Highlight class definitions
  highlighted = highlighted.replace(/\bclass\s+(\w+)/g, 
    '<span class="token keyword">class</span> <span class="token function">$1</span>');

  return highlighted;
}