import { ISystem } from "./ISystem";
import { EntityView } from "./EntityViewFactory";
import { ComponentGroupRegistry } from "./ComponentGroupRegistry";

function isEntityView(obj: any): obj is EntityView {
    return (<EntityView>obj)._isEntityView;
}

export class SystemRegistry {
    public systems: ISystem[] = [];

    public register(system: ISystem, groups: ComponentGroupRegistry): void {
        for (let key in system) {
            if (isEntityView((<any>system)[key])) {
                const view: EntityView = (<any>system)[key];
                const group = groups.get(view.components);
                view.entities = group.entities;
                if (view.onEntityAdded) {
                    group.onEntityAdded.push(view.onEntityAdded)
                }

                if (view.onEntityRemoved) {
                    group.onEntityRemoved.push(view.onEntityRemoved)
                }
            }
        }
        this.systems.push(system);
    }
}