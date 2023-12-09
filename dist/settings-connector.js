var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import browser from 'webextension-polyfill';
import { DEFAULT_SETTINGS } from './models';
class SettingsConnector {
    getAppSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = (yield browser.storage.sync.get(SettingsConnector.settingsKey))[SettingsConnector.settingsKey];
            if (!settings ||
                Object.keys(settings).length !== Object.keys(DEFAULT_SETTINGS).length) {
                console.log('no settings found, using default settings');
                yield browser.storage.sync.set({
                    [SettingsConnector.settingsKey]: DEFAULT_SETTINGS
                });
                settings = DEFAULT_SETTINGS;
            }
            return settings;
        });
    }
    updateSettings(newSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getAppSettings();
            const updatedSettings = Object.assign(Object.assign({}, settings), newSettings);
            yield browser.storage.sync.set({
                [SettingsConnector.settingsKey]: updatedSettings
            });
            return updatedSettings;
        });
    }
}
SettingsConnector.settingsKey = 'settings';
const singleton = new SettingsConnector();
export default singleton;
//# sourceMappingURL=settings-connector.js.map