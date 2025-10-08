import { marked } from 'marked'

interface NotebookOutput {
  output_type: string
  text?: string | string[]
  data?: Record<string, unknown>
  execution_count?: number
  metadata?: Record<string, unknown>
  name?: string // for stream outputs
  ename?: string // for error outputs
  evalue?: string // for error outputs
  traceback?: string[] // for error outputs
}

interface NotebookCell {
  cell_type: string
  source: string | string[]
  metadata?: Record<string, unknown>
  execution_count?: number | null
  outputs?: NotebookOutput[]
}

interface NotebookFile {
  cells: NotebookCell[]
  metadata?: Record<string, unknown>
  nbformat?: number
  nbformat_minor?: number
}

// Configure marked for better HTML output
marked.setOptions({
  breaks: true,
  gfm: true
})

function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  
  return text.replace(/[&<>"']/g, (match) => htmlEscapes[match])
}

function highlightPythonCode(code: string): string {
  // Simple Python syntax highlighting
  let highlighted = escapeHtml(code)
  
  // Keywords
  const keywords = ['import', 'from', 'as', 'def', 'class', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'finally', 'with', 'return', 'yield', 'break', 'continue', 'pass', 'and', 'or', 'not', 'in', 'is', 'lambda', 'global', 'nonlocal']
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
  highlighted = highlighted.replace(keywordPattern, '<span class="token keyword">$1</span>')
  
  // Built-in functions
  const builtins = ['print', 'len', 'str', 'int', 'float', 'list', 'dict', 'tuple', 'set', 'range', 'enumerate', 'zip', 'open', 'max', 'min', 'sum', 'abs', 'round']
  const builtinPattern = new RegExp(`\\b(${builtins.join('|')})\\b`, 'g')
  highlighted = highlighted.replace(builtinPattern, '<span class="token builtin">$1</span>')
  
  // Strings (simple pattern)
  highlighted = highlighted.replace(/(["'])([^"']*)\1/g, '<span class="token string">$1$2$1</span>')
  
  // Comments
  highlighted = highlighted.replace(/(#.*$)/gm, '<span class="token comment">$1</span>')
  
  // Numbers
  highlighted = highlighted.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token number">$1</span>')
  
  return highlighted
}

function extractCellSource(source: string | string[]): string {
  if (Array.isArray(source)) {
    return source.join('')
  }
  return source
}

function renderMarkdownCell(source: string): string {
  try {
    return marked.parse(source) as string
  } catch (error) {
    console.warn('Error parsing markdown:', error)
    return `<div class="markdown-error"><pre>${escapeHtml(source)}</pre></div>`
  }
}

function renderCodeCell(
  source: string, 
  executionCount: number | null = null,
  outputs: NotebookCell['outputs'] = [],
  cellIndex: number
): string {
  const promptNumber = executionCount !== null ? executionCount : cellIndex + 1
  
  let cellHtml = `
    <div class="notebook-cell code-cell" id="cell-${cellIndex}">
      <!-- Input -->
      <div class="input-area">
        <div class="prompt input-prompt">
          <span class="prompt-text">In [${promptNumber}]:</span>
        </div>
        <div class="input-container">
          <div class="highlight">
            <pre><code class="language-python">${highlightPythonCode(source)}</code></pre>
          </div>
        </div>
      </div>
  `

  // Render outputs if any
  if (outputs && outputs.length > 0) {
    cellHtml += '<div class="output-area">'
    
    outputs.forEach((output, outputIndex) => {
      cellHtml += renderOutput(output, promptNumber, outputIndex)
    })
    
    cellHtml += '</div>'
  }

  cellHtml += '</div>'
  return cellHtml
}

function renderOutput(
  output: NotebookOutput, 
  promptNumber: number | string,
  outputIndex: number
): string {
  let outputHtml = ''

  switch (output.output_type) {
    case 'stream':
      outputHtml = `
        <div class="output-subarea output-stream output-${output.name || 'stdout'}">
          <pre>${escapeHtml(Array.isArray(output.text) ? output.text.join('') : (output.text || ''))}</pre>
        </div>
      `
      break

    case 'display_data':
    case 'execute_result':
      if (output.data) {
        // Handle different data types
        if (output.data['text/html']) {
          const htmlContent = Array.isArray(output.data['text/html']) 
            ? output.data['text/html'].join('') 
            : output.data['text/html']
          outputHtml = `
            <div class="output-subarea output-html">
              ${htmlContent}
            </div>
          `
        } else if (output.data['image/png']) {
          outputHtml = `
            <div class="output-subarea output-png">
              <img src="data:image/png;base64,${output.data['image/png']}" 
                   alt="Output ${outputIndex}" 
                   class="output-image" />
            </div>
          `
        } else if (output.data['image/jpeg']) {
          outputHtml = `
            <div class="output-subarea output-jpeg">
              <img src="data:image/jpeg;base64,${output.data['image/jpeg']}" 
                   alt="Output ${outputIndex}" 
                   class="output-image" />
            </div>
          `
        } else if (output.data['image/svg+xml']) {
          const svgContent = Array.isArray(output.data['image/svg+xml'])
            ? output.data['image/svg+xml'].join('')
            : output.data['image/svg+xml']
          outputHtml = `
            <div class="output-subarea output-svg">
              ${svgContent}
            </div>
          `
        } else if (output.data['text/plain']) {
          const textContent = Array.isArray(output.data['text/plain'])
            ? output.data['text/plain'].join('')
            : output.data['text/plain']
          outputHtml = `
            <div class="output-subarea output-text">
              <pre>${escapeHtml(String(textContent))}</pre>
            </div>
          `
        } else if (output.data['application/json']) {
          outputHtml = `
            <div class="output-subarea output-json">
              <pre><code class="language-json">${escapeHtml(JSON.stringify(output.data['application/json'], null, 2))}</code></pre>
            </div>
          `
        }
      }
      
      if (output.output_type === 'execute_result') {
        outputHtml = `
          <div class="output">
            <div class="prompt output-prompt">
              <span class="prompt-text">Out[${promptNumber}]:</span>
            </div>
            ${outputHtml}
          </div>
        `
      } else {
        outputHtml = `<div class="output">${outputHtml}</div>`
      }
      break

    case 'error':
      const errorOutput = output as NotebookOutput
      const errorName = errorOutput.ename || 'Error'
      const errorValue = errorOutput.evalue || 'Unknown error'
      const traceback = errorOutput.traceback || []
      
      outputHtml = `
        <div class="output">
          <div class="output-subarea output-error">
            <pre class="error">
              <span class="error-type">${escapeHtml(errorName)}</span>: ${escapeHtml(errorValue)}
              ${traceback.map((line: string) => escapeHtml(line)).join('\n')}
            </pre>
          </div>
        </div>
      `
      break

    default:
      outputHtml = `
        <div class="output">
          <div class="output-subarea output-unknown">
            <pre>${escapeHtml(JSON.stringify(output, null, 2))}</pre>
          </div>
        </div>
      `
  }

  return outputHtml
}

export function convertNotebookToHtml(
  notebook: NotebookFile, 
  options: {
    skipMetadataCell?: boolean
    includePrompts?: boolean
    executePreprocessor?: boolean
  } = {}
): string {
  const { skipMetadataCell = true } = options

  let cellsToProcess = notebook.cells
  
  // Skip first cell if it contains metadata
  if (skipMetadataCell && notebook.cells.length > 0) {
    const firstCellSource = extractCellSource(notebook.cells[0].source)
    if (firstCellSource.includes('---') || firstCellSource.includes('title:')) {
      cellsToProcess = notebook.cells.slice(1)
    }
  }

  let notebookHtml = '<div class="notebook-container">\n'

  cellsToProcess.forEach((cell, index) => {
    const cellSource = extractCellSource(cell.source)
    
    if (!cellSource.trim()) {
      return // Skip empty cells
    }

    switch (cell.cell_type) {
      case 'markdown':
        notebookHtml += `
          <div class="notebook-cell markdown-cell" id="cell-${index}">
            <div class="markdown-content">
              ${renderMarkdownCell(cellSource)}
            </div>
          </div>
        `
        break

      case 'code':
        notebookHtml += renderCodeCell(
          cellSource,
          cell.execution_count,
          cell.outputs,
          index
        )
        break

      case 'raw':
        notebookHtml += `
          <div class="notebook-cell raw-cell" id="cell-${index}">
            <div class="input-area">
              <pre class="raw-content">${escapeHtml(cellSource)}</pre>
            </div>
          </div>
        `
        break

      default:
        console.warn(`Unknown cell type: ${cell.cell_type}`)
    }
  })

  notebookHtml += '</div>\n'

  return notebookHtml
}

// CSS styles for notebook rendering (similar to mkdocs-jupyter)
export const notebookStyles = `
.notebook-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.notebook-cell {
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
}

.notebook-cell.code-cell {
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  overflow: hidden;
}

.input-area {
  display: flex;
  flex-direction: row;
}

.prompt {
  padding: 0.4em 0.4em;
  margin: 0;
  font-family: Monaco, 'Lucida Console', monospace;
  font-size: 11px;
  text-align: right;
  width: 80px;
  flex-shrink: 0;
}

.input-prompt {
  background-color: #f7f7f7;
  border-right: 1px solid #cfcfcf;
  color: #303f9f;
}

.output-prompt {
  background-color: #fff;
  border-right: 1px solid #cfcfcf;
  color: #d84315;
}

.input-container {
  flex: 1;
  overflow: auto;
}

.highlight pre {
  margin: 0;
  padding: 0.4em;
  background-color: #f8f8f8;
  overflow-x: auto;
}

.highlight code {
  background: none;
  border: none;
  padding: 0;
}

.output-area {
  border-top: 1px solid #cfcfcf;
}

.output {
  display: flex;
  flex-direction: row;
}

.output-subarea {
  flex: 1;
  padding: 1em;
  overflow-x: auto;
}

.output-text pre,
.output-stream pre {
  margin: 0;
  font-family: Monaco, 'Lucida Console', monospace;
  font-size: 12px;
  white-space: pre-wrap;
}

.output-error pre {
  color: #c62828;
  background-color: #ffebee;
  padding: 0.4em;
  border-radius: 4px;
}

.output-image {
  max-width: 100%;
  height: auto;
}

.markdown-cell {
  border: none;
  padding: 0.5em 0;
  line-height: 1.6;
}

.markdown-cell * {
  display: block;
  width: 100%;
}

.markdown-cell h1,
.markdown-cell h2,
.markdown-cell h3,
.markdown-cell h4,
.markdown-cell h5,
.markdown-cell h6 {
  display: block;
  width: 100%;
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #333;
  clear: both;
}

.markdown-cell h1 {
  font-size: 2.5em;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  border-bottom: 2px solid #e1e1e1;
  padding-bottom: 0.3em;
}

.markdown-cell h2 {
  font-size: 2em;
  margin-top: 1.25em;
  margin-bottom: 0.6em;
  border-bottom: 1px solid #e1e1e1;
  padding-bottom: 0.25em;
}

.markdown-cell h3 {
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.markdown-cell h4 {
  font-size: 1.25em;
  margin-top: 0.75em;
  margin-bottom: 0.5em;
}

.markdown-cell h5 {
  font-size: 1.1em;
  margin-top: 0.75em;
  margin-bottom: 0.5em;
}

.markdown-cell h6 {
  font-size: 1em;
  margin-top: 0.75em;
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #666;
}

.markdown-cell p {
  margin: 0.5em 0;
}

.markdown-cell ul,
.markdown-cell ol {
  margin: 0.5em 0;
  padding-left: 2em;
}

.markdown-cell blockquote {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 4px solid #ddd;
  color: #666;
}

.markdown-cell code {
  background-color: #f1f1f1;
  padding: 0.1em 0.3em;
  border-radius: 3px;
  font-family: Monaco, 'Lucida Console', monospace;
}

.markdown-cell pre {
  background-color: #f8f8f8;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

.raw-cell {
  background-color: #f9f9f9;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 0.5em;
}

.raw-content {
  margin: 0;
  font-family: Monaco, 'Lucida Console', monospace;
  font-size: 12px;
}

@media (max-width: 768px) {
  .input-area,
  .output {
    flex-direction: column;
  }
  
  .prompt {
    width: auto;
    text-align: left;
    border-right: none;
    border-bottom: 1px solid #cfcfcf;
  }
}
`