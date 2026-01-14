import * as fs from 'fs';
import * as path from 'path';
import { XMLParser } from 'fast-xml-parser';

export interface AppConfig {
    browser: 'FIREFOX' | 'CHROME' | 'CHROME_HEADLESS' | 'IE' | 'EDGE' | 'FIREFOX_HEADLESS';
    width: number;
    height: number;
    appLink: string;
}

export class ConfigReader {
    private static configPath = path.resolve('test_config.xml');

    public static readConfig(): AppConfig {
        if (!fs.existsSync(this.configPath)) {
            throw new Error(`Plik konfiguracyjny nie został znaleziony w ścieżce: ${this.configPath}`);
        }

        const xmlData = fs.readFileSync(this.configPath, 'utf-8');
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: ""
        });
        const jsonObj = parser.parse(xmlData);

        const appSettings = jsonObj.configuration.appSettings.add;
        const configMap: { [key: string]: string } = {};

        // Obsługa zarówno pojedynczego wpisu (obiekt), jak i wielu wpisów (tablica)
        if (Array.isArray(appSettings)) {
            appSettings.forEach((setting: any) => {
                configMap[setting['key']] = setting['value'];
            });
        } else {
             configMap[appSettings['key']] = appSettings['value'];
        }

        return {
            browser: configMap['Browser'] as any,
            width: parseInt(configMap['BrowserSizeWidth']),
            height: parseInt(configMap['BrowserSizeHeight']),
            appLink: configMap['appLink']
        };
    }
}
