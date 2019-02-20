import { assert } from "chai"
import { ECS } from "../src/ECS";
import { TestPositionComponent, TestVelocityComponent } from "./TestComponents";
import { TestPositionSystem, TestVelocitySystem } from "./TestSystems";


describe('ECS', function () {

    const ecs = new ECS();
    const positionSystem = new TestPositionSystem();
    const velocitySystem = new TestVelocitySystem();
    ecs.registerSystem(positionSystem);
    ecs.registerSystem(velocitySystem);

    it("creates entity filled with components if created by createEntity", () => {
        const entity = ecs.createEntity([
            {component: TestPositionComponent},
            {component: TestVelocityComponent}]);

        assert.deepEqual(entity.x, 10);
        assert.deepEqual(entity.y, 20);
        assert.deepEqual(entity.dx, 10);
        assert.deepEqual(entity.dy, 20);
    });

    it("creates entity filled with components if created by createEntity using arguments", () => {
        let entity = ecs.createEntity([
            {component: TestPositionComponent},
            {component: TestVelocityComponent, args: [2]}]);
        assert.deepEqual(entity.x, 10);
        assert.deepEqual(entity.y, 20);
        assert.deepEqual(entity.dx, 20);
        assert.deepEqual(entity.dy, 40);
    });

    // it("creates entity filled with components if created from archetype", () => {
    //     const archetype = ecs.createArchetype([
    //         {component: TestPositionComponent},
    //         {component: TestVelocityComponent}]);
    //     const entity = ecs.createEntity(archetype);
    //
    //     assert.deepEqual(entity.x, 10);
    //     assert.deepEqual(entity.y, 20);
    //     assert.deepEqual(entity.dx, 10);
    //     assert.deepEqual(entity.dy, 20);
    // });

    it("removes entity from views after component removal", () => {
        const entity = ecs.createEntity([
            {component: TestPositionComponent},
            {component: TestVelocityComponent}]);

        assert.includeMembers(positionSystem.view.entities, [entity]);
        ecs.removeComponentsFromEntity(entity, TestPositionComponent);
        assert.notInclude(positionSystem.view.entities, [entity]);
    });
});
