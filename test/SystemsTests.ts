import { assert } from "chai"
import { ECS } from "../src/ECS";
import { TestPositionComponent, TestVelocityComponent } from "./TestComponents";
import { TestPositionSystem, TestVelocitySystem } from "./TestSystems";
import sinon from "sinon";

describe('Systems', function () {

    let ecs: ECS;
    let positionSystem: TestPositionSystem;
    let velocitySystem: TestVelocitySystem;

    it("has updated views after entity is added to ECS", () => {
        ecs = new ECS();
        positionSystem = new TestPositionSystem();
        velocitySystem = new TestVelocitySystem();
        ecs.registerSystem(positionSystem);
        ecs.registerSystem(velocitySystem);

        const entity = ecs.createEntity([
            {component: TestPositionComponent},
            {component: TestVelocityComponent}]);
        assert.deepEqual(positionSystem.view.entities, [entity]);
        assert.deepEqual(velocitySystem.view.entities, [entity]);
        assert.deepEqual(velocitySystem.viewOnlyVelocity.entities, [entity]);

        const entity2 = ecs.createEntity([{component: TestPositionComponent}]);
        assert.deepEqual(positionSystem.view.entities, [entity, entity2]);
        assert.deepEqual(velocitySystem.view.entities, [entity]);
        assert.deepEqual(velocitySystem.viewOnlyVelocity.entities, [entity]);
    });

    it("has triggered onEntityAdded when entity is added", () => {
        ecs = new ECS();
        positionSystem = new TestPositionSystem();
        velocitySystem = new TestVelocitySystem();

        const onEntityAddedPosition = sinon.spy(positionSystem.view, "onEntityAdded");
        const onEntityAddedVelocity = sinon.spy(velocitySystem.view, "onEntityAdded");

        ecs.registerSystem(positionSystem);
        ecs.registerSystem(velocitySystem);

        const entity = ecs.createEntity([
            {component: TestPositionComponent},
            {component: TestVelocityComponent}]);

        assert(onEntityAddedPosition.calledOnce);
        assert(onEntityAddedPosition.withArgs(entity));
        assert(onEntityAddedVelocity.calledOnce);
        assert(onEntityAddedVelocity.withArgs(entity));
    });



});
