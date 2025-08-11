// detect-bad-routes.js
import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'backend');

function walk(dir) {
  const results = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (full.includes('node_modules')) continue;
      results.push(...walk(full));
    } else if (name.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(root);

const routeCallRegex = /\b(?:app|router)\.(get|post|put|delete|patch|all|use|options)\s*\(\s*(['"`])([^'"`]+)\2/gi;

const problems = [];

for (const file of files) {
  const txt = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = routeCallRegex.exec(txt)) !== null) {
    const call = m[0];
    const method = m[1];
    const route = m[3];
    const idx = m.index;
    const upToIdx = txt.slice(0, idx);
    const lineNumber = upToIdx.split('\n').length;
    const issues = [];
    if (/^https?:\/\//.test(route)) issues.push('FULL_URL_USED');
    if (/^\*$/.test(route.trim())) issues.push('LONE_ASTERISK');
    if (/:{2,}/.test(route)) issues.push('DOUBLE_COLON');
    if (/:(?![A-Za-z0-9_$])/.test(route) || /\/:$/.test(route) || /:$/.test(route)) issues.push('MISSING_PARAM_NAME');
    if (issues.length > 0) {
      problems.push({ file, line: lineNumber, method, route, issues, snippet: txt.split('\n')[lineNumber-1].trim() });
    }
  }
}

// Also check server.js for app.options or app.use with '*' literal
const serverFile = path.join(root, 'server.js');
if (fs.existsSync(serverFile)) {
  const s = fs.readFileSync(serverFile, 'utf8');
  const regex = /\bapp\.(options|use|all)\s*\(\s*(['"`])([^'"`]+)\2/gi;
  let mm;
  while ((mm = regex.exec(s)) !== null) {
    const route = mm[3];
    const idx = mm.index;
    const lineNumber = s.slice(0, idx).split('\n').length;
    const issues = [];
    if (/^\*$/.test(route.trim())) issues.push('LONE_ASTERISK');
    if (/:{2,}/.test(route)) issues.push('DOUBLE_COLON');
    if (/:(?![A-Za-z0-9_$])/.test(route) || /\/:$/.test(route) || /:$/.test(route)) issues.push('MISSING_PARAM_NAME');
    if (/^https?:\/\//.test(route)) issues.push('FULL_URL_USED');
    if (issues.length) problems.push({ file: serverFile, line: lineNumber, method:mm[1], route, issues, snippet: s.split('\n')[lineNumber-1].trim()});
  }
}

if (problems.length === 0) {
  console.log('✅ No obvious bad route string patterns found by the checker.');
  console.log('If you still get path-to-regexp errors, paste the exact full runtime stack trace here (first ~30 lines).');
  process.exit(0);
}

console.log('Found potential problematic routes (file : line) -> issues');
for (const p of problems) {
  console.log(`\n${p.file} : ${p.line}`);
  console.log(`  method: ${p.method}`);
  console.log(`  route: "${p.route}"`);
  console.log(`  issues: ${p.issues.join(', ')}`);
  console.log(`  code: ${p.snippet}`);
}
process.exit(0);
