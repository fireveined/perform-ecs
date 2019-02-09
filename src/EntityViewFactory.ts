import { ComponentConstructor } from "./Component";

export interface EntityView<T = any> {
    entities: T[]
    components: ComponentConstructor[];
    _isEntityView: boolean;
};


export class EntityViewFactory {
    static createView: createEntityViewFunc = ((components: ComponentConstructor[]): EntityView<any> => {
        const view = <EntityView>{
            entities: [],
            components: components,
            _isEntityView: true
        }
        return view;
    }) as any;
}

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
type ComponentOf<T extends any> = NonFunctionProperties<T['prototype']>;

type createEntityViewFunc = <T extends ComponentConstructor,
    T2 extends ComponentConstructor,
    T3 extends ComponentConstructor,
    T4 extends ComponentConstructor,
    T5 extends ComponentConstructor,
    T6 extends ComponentConstructor,
    T7 extends ComponentConstructor,
    T8 extends ComponentConstructor,
    T9 extends ComponentConstructor,
    T10 extends ComponentConstructor>(comps: ComponentsInitList<T, T2, T3, T4, T5, T6, T7, T8, T9, T10>)
    =>  EntityView<(ComponentOf<T> & ComponentOf<T2> & ComponentOf<T3> & ComponentOf<T4> & ComponentOf<T5> & ComponentOf<T6>
    & ComponentOf<T7> & ComponentOf<T8> & ComponentOf<T9> & ComponentOf<T10>)> ;


type ComponentsInitList<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> =
    Partial<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]> | { length: any } & {
    '0'?: T1;
    '1'?: T2;
    '2'?: T3;
    '3'?: T4;
    '4'?: T5;
    '5'?: T6;
    '6'?: T7;
    '7'?: T8;
    '8'?: T9;
    '9'?: T10;
}