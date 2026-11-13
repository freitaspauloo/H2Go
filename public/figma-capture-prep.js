if (location.hash.includes('figmacapture=')) {
  (async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 70));
    }
    await new Promise(resolve => setTimeout(resolve, 2200));
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 800));
    const script = document.createElement('script');
    script.src = 'https://mcp.figma.com/mcp/html-to-design/capture.js';
    document.head.appendChild(script);
  })();
}
