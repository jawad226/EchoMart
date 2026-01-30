const fs = require('fs');

try {
  const content = fs.readFileSync('lint_log.json', 'utf16le'); // Try utf16le as guessed before
  const results = JSON.parse(content);
  
  let errorCount = 0;
  results.forEach(result => {
    if (result.messages.length > 0) {
      console.log(`\nFile: ${result.filePath}`);
      result.messages.forEach(msg => {
        console.log(`  Line ${msg.line}:${msg.column} - ${msg.message} (${msg.ruleId})`);
        errorCount++;
      });
    }
  });
  
  console.log(`\nTotal errors: ${errorCount}`);
} catch (e) {
  // If utf16le fails, try utf8
  try {
     const content = fs.readFileSync('lint_log.json', 'utf8');
     const results = JSON.parse(content);
     // ... same logic ...
      let errorCount = 0;
      results.forEach(result => {
        if (result.messages.length > 0) {
          console.log(`\nFile: ${result.filePath}`);
          result.messages.forEach(msg => {
            console.log(`  Line ${msg.line}:${msg.column} - ${msg.message} (${msg.ruleId})`);
            errorCount++;
          });
        }
      });
      console.log(`\nTotal errors: ${errorCount}`);
  } catch(e2) {
      console.error("Error reading log:", e.message, e2.message);
  }
}
