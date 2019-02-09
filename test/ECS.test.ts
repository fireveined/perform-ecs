import { assert } from "chai"
import { ECS } from "../src/ECS";
import { TestPositionComponent, TestVelocityComponent } from "./TestComponents";


describe('ECS', function () {

    const ecs = new ECS();
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

    it("creates entity filled with components if created from archetype", () => {
        const archetype = ecs.createArchetype([
            {component: TestPositionComponent},
            {component: TestVelocityComponent}]);
        const entity = ecs.createEntity(archetype);
        assert.deepEqual(entity.x, 10);
        assert.deepEqual(entity.y, 20);
        assert.deepEqual(entity.dx, 10);
        assert.deepEqual(entity.dy, 20);
    });
});
