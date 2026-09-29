const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Parses uploaded buffer (PDF or DOCX) into clean plain text
 * @param {Buffer} buffer 
 * @param {string} mimetype 
 * @returns {Promise<string>}
 */
async function parseDocument(buffer, mimetype) {
  if (!buffer || buffer.length === 0) {
    throw new Error('Uploaded file is empty.');
  }

  let extractedText = '';

  if (mimetype === 'application/pdf' || mimetype.includes('pdf')) {
    try {
      const parsed = await pdfParse(buffer);
      extractedText = parsed.text || '';
    } catch (err) {
      throw new Error(`Failed to parse PDF file: ${err.message}`);
    }
  } else if (
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype.includes('docx') || mimetype.includes('msword')
  ) {
    try {
      const parsed = await mammoth.extractRawText({ buffer });
      extractedText = parsed.value || '';
    } catch (err) {
      throw new Error(`Failed to parse DOCX file: ${err.message}`);
    }
  } else {
    // Try text fallback
    extractedText = buffer.toString('utf-8');
  }

  // Clean extracted text: remove non-printable control chars, trim
  extractedText = sanitizeText(extractedText);

  if (!extractedText || extractedText.trim().length < 30) {
    throw new Error('Extracted document text is too short or empty. Please ensure the file contains readable text.');
  }

  return extractedText;
}

/**
 * Basic sanitization to prevent control characters and prompt injection attacks
 */
function sanitizeText(text) {
  if (!text) return '';
  return text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '')
    // Guard against common prompt injection directives embedded inside resume text
    .replace(/Ignore previous instructions|System Prompt:|You are now a/gi, '[Sanitized Security Marker]')
    .trim();
}

module.exports = {
  parseDocument,
  sanitizeText
};
