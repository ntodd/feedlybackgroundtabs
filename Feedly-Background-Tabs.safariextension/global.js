function messageHandler(event) {
    if (event.name === 'openFeedlyBackgroundTab') {
        var tab = safari.application.activeBrowserWindow.openTab('background');
        tab.url = event.message;
            event.stopPropagation();
            event.preventDefault();
    }
    else if (event.name === 'getSettingValue') {
        sendSettingValueFor(event.message);
    }
}


function sendSettingValueFor(name) {
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage(
        'settingValueIs', safari.extension.settings[name]);
}


function settingsChanged(event) {
    if (event.key === 'key')
        sendSettingValueFor(event.key);
}


safari.application.addEventListener('message', messageHandler, false);
safari.extension.settings.addEventListener('change', settingsChanged, false);
