import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
    public static async setItem(key: string, value: string): Promise<void> {
        if (!key || !value) return;
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            return;
        }
    }

    public static async getItem(key: string): Promise<string | null> {
        if (!key) return null;
        return await AsyncStorage.getItem(key) || null;
    }

    public static async removeItem(key: string): Promise<void> {
        if (!key) return;
        return await AsyncStorage.removeItem(key);
    }
}
