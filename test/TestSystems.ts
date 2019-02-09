import { System } from "../src/System";
import { EntityViewFactory } from "../src/EntityViewFactory";
import { TestPositionComponent, TestVelocityComponent } from "./TestComponents";

export class TestPositionSystem extends System {

    public view = EntityViewFactory.createView([TestPositionComponent]);

}

export class TestVelocitySystem extends System {

    public view = EntityViewFactory.createView([TestPositionComponent, TestVelocityComponent]);
    public viewOnlyVelocity = EntityViewFactory.createView([TestVelocityComponent]);
}

