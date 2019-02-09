import { System } from "./System";
import { EntityView } from "./EntityViewFactory";
import { ComponentGroupRegistry } from "./ComponentGroupRegistry";

function isEntityView(obj: any): obj is EntityView {
    return (<EntityView>obj)._isEntityView;
}

export class SystemRegistry {
    public systems: System[] = [];

    public register(system: System, groups: ComponentGroupRegistry): void {
        for (let key in system) {
            if (isEntityView((<any>system)[key])) {
                const view: EntityView = (<any>system)[key];
                const group = groups.get(view.components);
                view.entities = group.entities;

                if (system.onEntityAdded) {
                    group.onEntityAdded.push(system.onEntityAdded.bind(system))
                }

                if (system.onEntityRemoved) {
                    group.onEntityRemoved.push(system.onEntityRemoved.bind(system))
                }
            }
        }
        this.systems.push(system);
    }
}