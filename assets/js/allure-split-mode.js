document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.getElementById('allure-frame');

    iframe.onload = function() {
        try {
        if (iframe.contentWindow.location.hash) {
            iframe.contentWindow.location.href = iframe.contentWindow.location.href.split('#')[0];
            return;
        }

        const iframeBody = iframe.contentWindow.document.body;
        const pageBody = document.body;
        let isWideMode = false;

        const resizeIframe = () => {
            if (isWideMode) return;

            const contentContainer = iframe.contentWindow.document.querySelector('[data-testid="base-layout"]');
            if (contentContainer) {
            const newHeight = contentContainer.scrollHeight + 96;
            if (newHeight > 0) {
                iframe.style.height = newHeight + 'px';
            }
            }
        };

        const toggleWideMode = () => {
            const shouldBeWide = !!iframe.contentWindow.document.querySelector('[data-testid="split-layout"]');
            if (shouldBeWide !== isWideMode) {
            isWideMode = shouldBeWide;
            pageBody.classList.toggle('wide-mode', isWideMode);
            if (!isWideMode) {
                requestAnimationFrame(resizeIframe);
            }
            }
        };

        const observer = new MutationObserver(() => {
            requestAnimationFrame(resizeIframe);
            requestAnimationFrame(toggleWideMode);
        });

        const config = { childList: true, subtree: true };
        observer.observe(iframeBody, config);

        resizeIframe();
        toggleWideMode();

        } catch (e) {
        console.error("Could not access iframe content for resizing. This might be a cross-origin security error.", e);
        iframe.style.height = '85vh';
        }
    };
});
