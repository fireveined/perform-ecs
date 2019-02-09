import { ECS } from "./ECS";
import { Entity } from "./Entity";
import { EntityView } from "./EntityViewFactory";

export class System {

    public ecs: ECS;


    public onEntityAdded(entity: any): void {

    }

    public onEntityRemoved(entity: any): void {

    }

    public update(dt: number): void {

    }
}
type ArrayElement<ArrayType> = ArrayType extends (infer ElementType)[] ? ElementType : never;
export type SystemEntityType<T extends System, View extends keyof T> = T[View] extends EntityView ? ArrayElement<T[View]['entities']> : never;