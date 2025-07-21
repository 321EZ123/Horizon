document.addEventListener('DOMContentLoaded', function() {
    const newTabBtn = document.getElementById('new-tab-btn');
    const tabsContainer = document.querySelector('.tabs-container');
    const contentContainer = document.querySelector('.content-container');
    let tabCounter = 1;

    function createNewTab() {
        tabCounter++;
        const tabId = 'tab' + tabCounter;

        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.setAttribute('data-tab-id', tabId);

        tab.innerHTML = `
            <div class="tab-icon">H</div>
            <span class="tab-title">Horizon Search</span>
            <div class="tab-close">×</div>
        `;

        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'iframe-container';
        iframeContainer.id = tabId;

        const iframe = document.createElement('iframe');
        iframe.src = 'Horizon-Search.html';
        iframe.frameBorder = '0';

        iframeContainer.appendChild(iframe);

        tabsContainer.insertBefore(tab, document.querySelector('.tab'));
        contentContainer.appendChild(iframeContainer);

        tab.addEventListener('click', function(e) {
            if (!e.target.classList.contains('tab-close')) {
                activateTab(tabId);
            }
        });

        const closeBtn = tab.querySelector('.tab-close');
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeTab(tabId);
        });

        activateTab(tabId);
    }

    function activateTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.iframe-container').forEach(container => {
            container.classList.remove('active');
        });

        document.querySelector(`[data-tab-id="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }

    function closeTab(tabId) {
        const tab = document.querySelector(`[data-tab-id="${tabId}"]`);
        const container = document.getElementById(tabId);

        if (tab.classList.contains('active')) {
            const nextTab = tab.nextElementSibling;
            const prevTab = tab.previousElementSibling;

            if (nextTab && nextTab.classList.contains('tab')) {
                activateTab(nextTab.getAttribute('data-tab-id'));
            } else if (prevTab && prevTab.classList.contains('tab') && !prevTab.id.includes('new-tab-btn')) {
                activateTab(prevTab.getAttribute('data-tab-id'));
            }
        }

        tab.remove();
        container.remove();

        if (document.querySelectorAll('.tab').length === 0) {
            createNewTab();
        }
    }

    newTabBtn.addEventListener('click', createNewTab);

    const firstTab = document.querySelector('.tab');
    firstTab.addEventListener('click', function(e) {
        if (!e.target.classList.contains('tab-close')) {
            activateTab('tab1');
        }
    });

    const firstCloseBtn = firstTab.querySelector('.tab-close');
    firstCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeTab('tab1');
    });

    const backButton = document.querySelector('.browser-control-btn:nth-child(1)');
    const forwardButton = document.querySelector('.browser-control-btn:nth-child(2)');
    const refreshButton = document.querySelector('.browser-control-btn:nth-child(3)');
    const menuButton = document.querySelector('.browser-control-btn:nth-child(4)');

    backButton.addEventListener('click', function() {
        const activeIframe = document.querySelector('.iframe-container.active iframe');
        if (activeIframe) {
            try {
                activeIframe.contentWindow.history.back();
            } catch (e) {
                console.error('Could not go back:', e);
            }
        }
    });

    forwardButton.addEventListener('click', function() {
        const activeIframe = document.querySelector('.iframe-container.active iframe');
        if (activeIframe) {
            try {
                activeIframe.contentWindow.history.forward();
            } catch (e) {
                console.error('Could not go forward:', e);
            }
        }
    });

    refreshButton.addEventListener('click', function() {
        const activeIframe = document.querySelector('.iframe-container.active iframe');
        if (activeIframe) {
            activeIframe.src = activeIframe.src;
        }
    });
});
