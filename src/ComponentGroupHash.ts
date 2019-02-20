import { ComponentConstructor, ComponentInitializator } from './Component';

function bit_test(num: number, bit: number) {
    return ((num >> bit) % 2 != 0)
}

function bit_set(num: number, bit: number) {
    return num | 1 << bit;
}

function bit_clear(num: number, bit: number) {
    return num & ~(1 << bit);
}

function bit_toggle(num: number, bit: number) {
    return bit_test(num, bit) ? bit_clear(num, bit) : bit_set(num, bit);
}


export type ComponentsHash = number;

export function componentHashHasComponent(hash: ComponentsHash, component: ComponentConstructor): boolean {
    return bit_test(hash, component.id);
}

export function getComponentsHashFromInitializators(components: ComponentInitializator[]): ComponentsHash {
    let num = 0;
    for (const comp of components) {
        num = bit_set(num, comp.component.id);
    }
    return num;
}

export function getComponentsHash(components: ComponentConstructor[]): ComponentsHash {
    let num = 0;
    for (const comp of components) {
        num = bit_set(num, comp.id);
    }
    return num;
}

export function componentHashMatch(hash: ComponentsHash, hash2: ComponentsHash): boolean {
    return (hash2 & hash) === hash2;
}
