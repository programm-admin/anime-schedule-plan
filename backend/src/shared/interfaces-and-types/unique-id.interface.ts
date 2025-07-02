export interface IUniqueId {
    length?: number;
    useLetters?: boolean;
    useNumbers?: boolean;
    includeSymbols?: string[];
    excludeSymbols?: string[];
}
