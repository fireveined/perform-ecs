import { assert } from "chai"
import { ECS } from "../src/ECS";
import { TestPositionComponent, TestVelocityComponent } from "./TestComponents";
import { TestPositionSystem, TestVelocitySystem } from "./TestSystems";
import sinon from "sinon";

describe('Systems', function () {

    const ecs = new ECS();
    const positionSystem = new TestPositionSystem();
    const velocitySystem = new TestVelocitySystem();
    ecs.registerSystem(positionSystem);
    ecs.registerSystem(velocitySystem);

    it("has updated views after entity is added to ECS", () => {
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
        const onEntityAddedPosition = sinon.fake();
        positionSystem.onEntityAdded = onEntityAddedPosition;

        const onEntityAddedVelocity = sinon.fake();
        velocitySystem.onEntityAdded = onEntityAddedVelocity;

        const entity = ecs.createEntity([
            {component: TestPositionComponent},
            {component: TestVelocityComponent}]);

        assert(onEntityAddedPosition.calledOnce);
        assert(onEntityAddedPosition.withArgs(entity));
        assert(onEntityAddedVelocity.calledTwice);
        assert(onEntityAddedVelocity.alwaysCalledWith(entity));
    });

});
