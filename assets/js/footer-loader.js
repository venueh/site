document.addEventListener('DOMContentLoaded', function() {
    // Determine the base path based on current location
    const currentPath = window.location.pathname;
    const isNestedPage = currentPath.includes('/commercial/') || 
                        currentPath.includes('/industrial/');
    
    const footerPath = isNestedPage ? '../../footer.html' : './footer.html';
    
    // Fetch and inject the footer
    fetch(footerPath)
        .then(response => response.text())
        .then(html => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                // Adjust relative paths in footer based on page depth
                let adjustedHtml = html;
                
                if (isNestedPage) {
                    // For nested pages (commercial/industrial), update relative paths to point to root
                    adjustedHtml = html
                        .replace(/href="\.\/privacy-policy\.html"/g, 'href="../../privacy-policy.html"')
                        .replace(/href="\.\/terms-of-service\.html"/g, 'href="../../terms-of-service.html"')
                        .replace(/href="\.\/company\.html"/g, 'href="../company.html"')
                        .replace(/href="\.\/commercial\.html"/g, 'href="../commercial.html"')
                        .replace(/href="\.\/industrial\.html"/g, 'href="../industrial.html"')
                        .replace(/href="\.\/index\.html"/g, 'href="../index.html"')
                        .replace(/src="\.\/assets\/img\//g, 'src="../../assets/img/')
                        .replace(/src="\.\/VH_logo_w\.svg"/g, 'src="../VH_logo_w.svg"')
                        .replace(/href="\.\/commercial\//g, 'href="../commercial/')
                        .replace(/href="\.\/industrial\//g, 'href="../industrial/');
                }
                
                footerContainer.innerHTML = adjustedHtml;
            }
        })
        .catch(error => console.error('Error loading footer:', error));

    // Also fetch and inject the header if a container exists
    const headerPath = isNestedPage ? '../../header.html' : './header.html';
    fetch(headerPath)
        .then(response => response.text())
        .then(html => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                let adjustedHtml = html;
                if (isNestedPage) {
                    adjustedHtml = html
                        .replace(/href="\.\/commercial\.html"/g, 'href="../commercial.html"')
                        .replace(/href="\.\/gcc-advisory\.html"/g, 'href="../gcc-advisory.html"')
                        .replace(/href="\.\/nri-investors\.html"/g, 'href="../nri-investors.html"')
                        .replace(/href="\.\/plotted-development\.html"/g, 'href="../plotted-development.html"')
                        .replace(/href="\.\/partners\.html"/g, 'href="../partners.html"')
                        .replace(/href="\.\/industrial\.html"/g, 'href="../industrial.html"')
                        .replace(/href="\.\/company\.html"/g, 'href="../company.html"')
                        .replace(/href="\.\/index\.html"/g, 'href="../index.html"')
                        .replace(/src="\.\/assets\/img\//g, 'src="../../assets/img/')
                        .replace(/src="\.\/VH_logo\.svg"/g, 'src="../VH_logo.svg"');
                }
                headerContainer.innerHTML = adjustedHtml;
            }
        })
        .catch(error => console.error('Error loading header:', error));
});
